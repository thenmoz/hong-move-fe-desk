import { NextRequest, NextResponse } from 'next/server';
import { getBooking, updateBooking, cancelBooking, BookingResponse } from '@/lib/hongmove-api';
import { mapApiBookingToBooking } from '@/lib/utils/bookingTransformers';

// Helper to get admin token
const getAdminToken = () => process.env.ADMIN_API_KEY;

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const adminToken = getAdminToken();

        if (!adminToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Admin API key is required'
                },
                { status: 500 }
            );
        }

        // Backend uses bookingNumber (not UUID) for GET endpoint
        const result = await getBooking(id, adminToken);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error?.message || 'Booking not found'
                },
                { status: 404 }
            );
        }

        const booking = mapApiBookingToBooking(result.data as BookingResponse);

        return NextResponse.json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Error fetching booking:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error'
            },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const adminToken = getAdminToken();

        if (!adminToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Admin API key is required'
                },
                { status: 500 }
            );
        }

        // Transform frontend fields to API fields if necessary
        // For now, assuming body matches Partial<CreateBookingRequest> roughly
        // But we might need mapping if keys differ significantly.
        // The `updateBooking` in lib takes `Partial<CreateBookingRequest>`.
        // Let's assume the frontend sends snake_case or we map it here.
        // Ideally we should map camelCase to snake_case.

        const apiPayload: any = {};
        if (body.passengerName) apiPayload.passenger_name = body.passengerName;
        if (body.phone) apiPayload.passenger_phone = body.phone;
        if (body.email) apiPayload.passenger_email = body.email;
        if (body.pickupLocation) apiPayload.pickup_location = body.pickupLocation;
        if (body.dropoffLocation) apiPayload.dropoff_location = body.dropoffLocation;
        if (body.travelDateTime) apiPayload.pickup_time = body.travelDateTime;
        if (body.note) apiPayload.passenger_notes = body.note;

        const result = await updateBooking(id, apiPayload, adminToken);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error?.message || 'Failed to update booking'
                },
                { status: 400 }
            );
        }

        const booking = mapApiBookingToBooking(result.data as BookingResponse);

        return NextResponse.json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error'
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const adminToken = getAdminToken();

        if (!adminToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Admin API key is required'
                },
                { status: 500 }
            );
        }

        const reason = body.cancellation_reason || body.reason || 'Cancelled by admin';

        const result = await cancelBooking(id, reason, adminToken);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error?.message || 'Failed to cancel booking'
                },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Booking cancelled successfully'
        });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error'
            },
            { status: 500 }
        );
    }
}
