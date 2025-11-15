import { Booking, BookingFormData, JobStatus, PaymentStatus } from '@/types/booking';
import type { BookingResponse, CreateBookingRequest } from '@/lib/hongmove-api';

const DEFAULT_TIMEZONE = 'Asia/Bangkok';

/**
 * Convert frontend booking form data to Hongmove API payload
 */
export const mapFormToCreateBookingPayload = (
  data: BookingFormData,
  timezone?: string
): CreateBookingRequest => ({
  passenger_name: data.passengerName,
  passenger_email: data.email,
  passenger_phone: data.phone,
  pickup_location: data.pickupLocation,
  dropoff_location: data.dropoffLocation,
  pickup_time: data.travelDateTime,
  pickup_timezone: timezone || DEFAULT_TIMEZONE,
  passenger_notes: data.note || '',
});

/**
 * Convert Hongmove API booking response to frontend Booking type
 */
export const mapApiBookingToBooking = (booking: BookingResponse): Booking => {
  const paymentStatus = (booking.payment_status ?? 'unpaid') as PaymentStatus;
  const jobStatus = (booking.status ?? 'pending') as JobStatus;

  return {
    id: booking.id || booking.booking_id || '',
    bookingNumber: booking.booking_number,
    passengerName: booking.passenger_name,
    phone: booking.passenger_phone,
    email: booking.passenger_email,
    pickupLocation: booking.pickup_location,
    dropoffLocation: booking.dropoff_location,
    travelDateTime: booking.pickup_time,
    createdAt: booking.created_at,
    updatedAt: booking.updated_at,
    paymentStatus,
    jobStatus,
    finalMeterPrice: booking.final_meter_price,
    omiseChargeId: booking.omise_charge_id,
    note: booking.passenger_notes,
    emailSentAt: booking.email_sent_at,
  };
};

export const mapApiBookingsToBookingList = (bookings: BookingResponse[] = []): Booking[] =>
  bookings.map(mapApiBookingToBooking);
