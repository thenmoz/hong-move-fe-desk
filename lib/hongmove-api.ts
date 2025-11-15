import { JobStatus, PaymentStatus } from '@/types/booking';

/**
 * Hongmove API Client
 *
 * API Base URL: https://hongmove-api-staging.up.railway.app
 * Documentation: Based on hongmove.postman_collection.json
 */

const HONGMOVE_API_BASE_URL =
  process.env.NEXT_PUBLIC_HONGMOVE_API_URL || 'https://hongmove-api-staging.up.railway.app';

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

// Response envelope type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// Booking types (matching API contract)
interface CreateBookingRequest {
  passenger_name: string;
  passenger_email: string;
  passenger_phone: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_time: string; // ISO 8601 format
  pickup_timezone?: string;
  flight_number?: string;
  passenger_notes?: string;
}

interface BookingResponse {
  id?: string;
  booking_id?: string;
  booking_number: string;
  passenger_name: string;
  passenger_email: string;
  passenger_phone: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_time: string;
  pickup_timezone: string;
  passenger_notes?: string;
  status?: JobStatus | string;
  payment_status?: PaymentStatus | string;
  final_meter_price?: number;
  omise_charge_id?: string;
  email_sent_at?: string;
  created_at: string;
  updated_at: string;
}

interface ListBookingsResponse {
  bookings: BookingResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Create a new booking
 */
export async function createBooking(
  data: CreateBookingRequest,
  agentToken?: string
): Promise<ApiResponse<BookingResponse>> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token is provided
    if (agentToken) {
      headers['Authorization'] = `Bearer ${agentToken}`;
    }

    const response = await fetch(`${HONGMOVE_API_BASE_URL}/bookings`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || {
          code: 'API_ERROR',
          message: `API returned ${response.status}`,
        },
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: getErrorMessage(error, 'Failed to connect to Hongmove API'),
      },
    };
  }
}

/**
 * Get a single booking by ID
 */
export async function getBooking(
  bookingId: string,
  agentToken: string
): Promise<ApiResponse<BookingResponse>> {
  try {
    const response = await fetch(`${HONGMOVE_API_BASE_URL}/bookings/${bookingId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${agentToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error,
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: getErrorMessage(error, 'Failed to fetch booking'),
      },
    };
  }
}

/**
 * List bookings with optional filters
 */
export async function listBookings(
  params: {
    date?: string;
    status?: string;
    page?: number;
    limit?: number;
  },
  agentToken: string
): Promise<ApiResponse<ListBookingsResponse>> {
  try {
    const queryParams = new URLSearchParams();
    if (params.date) queryParams.append('date', params.date);
    if (params.status) queryParams.append('status', params.status);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const url = `${HONGMOVE_API_BASE_URL}/bookings?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${agentToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error,
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: getErrorMessage(error, 'Failed to fetch bookings'),
      },
    };
  }
}

/**
 * Update a booking
 */
export async function updateBooking(
  bookingId: string,
  data: Partial<CreateBookingRequest>,
  agentToken: string
): Promise<ApiResponse<BookingResponse>> {
  try {
    const response = await fetch(`${HONGMOVE_API_BASE_URL}/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${agentToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error,
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: getErrorMessage(error, 'Failed to update booking'),
      },
    };
  }
}

/**
 * Cancel a booking
 */
export async function cancelBooking(
  bookingId: string,
  cancellationReason: string,
  agentToken: string
): Promise<ApiResponse<BookingResponse>> {
  try {
    const response = await fetch(`${HONGMOVE_API_BASE_URL}/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${agentToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cancellation_reason: cancellationReason }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error,
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: getErrorMessage(error, 'Failed to cancel booking'),
      },
    };
  }
}

/**
 * Resend booking confirmation email
 */
export async function resendBookingEmail(
  bookingId: string,
  agentToken: string
): Promise<ApiResponse<{ sent: boolean }>> {
  try {
    const response = await fetch(`${HONGMOVE_API_BASE_URL}/bookings/${bookingId}/resend-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${agentToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error,
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: getErrorMessage(error, 'Failed to resend email'),
      },
    };
  }
}

// Export types
export type {
  CreateBookingRequest,
  BookingResponse,
  ListBookingsResponse,
  ApiResponse,
};
