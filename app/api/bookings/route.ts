import { NextRequest, NextResponse } from 'next/server';
import { createBooking, listBookings } from '@/lib/hongmove-api';

// POST - สร้าง booking ใหม่ผ่าน Hongmove API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['passengerName', 'phone', 'email', 'pickupLocation', 'dropoffLocation', 'travelDateTime'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Transform frontend data to API format
    const apiData = {
      passenger_name: body.passengerName,
      passenger_email: body.email,
      passenger_phone: body.phone,
      pickup_location: body.pickupLocation,
      dropoff_location: body.dropoffLocation,
      pickup_time: body.travelDateTime, // Should be ISO 8601 format
      pickup_timezone: body.timezone || 'Asia/Bangkok',
      passenger_notes: body.note || '',
    };

    // Get agent token from environment (optional for customer bookings)
    const agentToken = process.env.HONGMOVE_AGENT_TOKEN;

    // Call Hongmove API
    const result = await createBooking(apiData, agentToken);

    if (!result.success) {
      console.error('Hongmove API error:', result.error);
      return NextResponse.json(
        {
          success: false,
          error: result.error?.message || 'Failed to create booking'
        },
        { status: 400 }
      );
    }

    // Transform API response back to frontend format
    const booking = result.data;
    const responseData = {
      id: booking?.booking_id,
      bookingNumber: booking?.booking_number,
      passengerName: booking?.passenger_name,
      phone: booking?.passenger_phone,
      email: booking?.passenger_email,
      pickupLocation: booking?.pickup_location,
      dropoffLocation: booking?.dropoff_location,
      travelDateTime: booking?.pickup_time,
      note: booking?.passenger_notes,
      status: booking?.status,
      createdAt: booking?.created_at,
      updatedAt: booking?.updated_at,
    };

    return NextResponse.json(
      {
        success: true,
        booking: responseData,
        message: 'Booking created successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

// GET - ดึงรายการ bookings จาก Hongmove API
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || undefined;
    const status = searchParams.get('status') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Get agent token from environment
    const agentToken = process.env.HONGMOVE_AGENT_TOKEN;

    if (!agentToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent token not configured'
        },
        { status: 500 }
      );
    }

    // Call Hongmove API
    const result = await listBookings(
      { date, status, page, limit },
      agentToken
    );

    if (!result.success) {
      console.error('Hongmove API error:', result.error);
      return NextResponse.json(
        {
          success: false,
          error: result.error?.message || 'Failed to fetch bookings'
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
