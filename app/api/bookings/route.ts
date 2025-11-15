import { NextRequest, NextResponse } from 'next/server';
import { createBooking, listBookings, BookingResponse } from '@/lib/hongmove-api';
import {
  mapApiBookingToBooking,
  mapApiBookingsToBookingList,
  mapFormToCreateBookingPayload,
} from '@/lib/utils/bookingTransformers';
import type { BookingFormData } from '@/types/booking';

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
    const apiData = mapFormToCreateBookingPayload(body as BookingFormData, body.timezone);

    // Call Hongmove API
    const sourceFromRequest = typeof body.source === 'string' ? body.source.trim() : '';
    const result = await createBooking(apiData, undefined, sourceFromRequest || undefined);

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
    const bookingPayload = (result.data?.booking ?? result.data) as BookingResponse;
    const responseData = mapApiBookingToBooking(bookingPayload);

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

    // Call Hongmove API
    const result = await listBookings(
      { date, status, page, limit },
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

    const apiData = result.data;
    const bookings = mapApiBookingsToBookingList(apiData?.bookings || []);

    return NextResponse.json({
      success: true,
      data: {
        bookings,
        pagination: apiData?.pagination,
      }
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
