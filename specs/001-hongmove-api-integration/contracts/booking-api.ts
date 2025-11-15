/**
 * TypeScript API Contracts: Hongmove Booking API
 *
 * This file contains type definitions for all API requests and responses
 * based on the Hongmove Postman collection (Booking endpoints).
 *
 * Generated: 2025-11-11
 * Feature: 001-hongmove-api-integration
 */

// ============================================================================
// Base Types
// ============================================================================

/**
 * Generic API response envelope
 * All endpoints return this structure with success/error discriminated union
 */
export type APIResponse<T> =
  | { success: true; data: T }
  | { success: false; error: APIError };

/**
 * API error structure
 */
export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Pagination metadata for list endpoints
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================================
// Enums
// ============================================================================

/**
 * Payment status enum
 */
export enum PaymentStatus {
  Paid = 'paid',
  Unpaid = 'unpaid',
}

/**
 * Job/Booking status enum
 */
export enum JobStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

// ============================================================================
// Core Entity: Booking
// ============================================================================

/**
 * Booking entity as returned by API (snake_case)
 * Represents a customer transportation booking
 */
export interface APIBooking {
  id: string;
  booking_number: string;

  // Passenger information
  passenger_name: string;
  passenger_phone: string;
  passenger_email: string;

  // Flight information
  flight_number: string;

  // Trip details
  pickup_location: string;
  dropoff_location: string;
  pickup_time: string; // ISO 8601 with timezone
  pickup_timezone: string; // IANA timezone (e.g., "Asia/Bangkok")

  // Status
  status: JobStatus;
  payment_status: PaymentStatus;

  // Payment details
  final_meter_price?: number;
  omise_charge_id?: string;

  // Additional information
  passenger_notes?: string;

  // Timestamps
  email_sent_at?: string; // ISO 8601 UTC
  created_at: string; // ISO 8601 UTC
  updated_at: string; // ISO 8601 UTC
}

// ============================================================================
// API Request Payloads
// ============================================================================

/**
 * Create Booking Request
 * POST /bookings
 */
export interface CreateBookingRequest {
  passenger_name: string;
  passenger_email: string;
  passenger_phone: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_time: string; // ISO 8601 with timezone
  pickup_timezone: string; // e.g., "Asia/Bangkok"
  flight_number?: string;
  passenger_notes?: string;
  source?: string; // Optional origin tag (e.g., webflow embed)
}

/**
 * Update Booking Request
 * PATCH /bookings/:id
 */
export interface UpdateBookingRequest {
  passenger_name?: string;
  passenger_phone?: string;
  pickup_location?: string;
  dropoff_location?: string;
  pickup_time?: string; // ISO 8601 with timezone
  passenger_notes?: string;
}

/**
 * Cancel Booking Request
 * DELETE /bookings/:id
 */
export interface CancelBookingRequest {
  cancellation_reason?: string;
}

/**
 * List Bookings Query Parameters
 * GET /bookings?...
 */
export interface ListBookingsParams {
  date?: string; // YYYY-MM-DD format
  status?: JobStatus;
  payment_status?: PaymentStatus;
  booking_number?: string;
  passenger_name?: string;
  flight_number?: string;
  page?: number; // Default: 1
  limit?: number; // Default: 20
}

// ============================================================================
// API Response Payloads
// ============================================================================

/**
 * Create Booking Response
 * POST /bookings
 */
export interface CreateBookingResponse {
  booking: APIBooking;
}

/**
 * Get Booking Response
 * GET /bookings/:id
 */
export interface GetBookingResponse {
  booking: APIBooking;
}

/**
 * List Bookings Response
 * GET /bookings
 */
export interface ListBookingsResponse {
  bookings: APIBooking[];
  pagination: PaginationMeta;
}

/**
 * Update Booking Response
 * PATCH /bookings/:id
 */
export interface UpdateBookingResponse {
  booking: APIBooking;
}

/**
 * Cancel Booking Response
 * DELETE /bookings/:id
 */
export interface CancelBookingResponse {
  booking: APIBooking;
  cancellation_reason?: string;
}

/**
 * Resend Email Response (Deferred to Phase 2)
 * POST /bookings/:id/resend-email
 */
export interface ResendEmailResponse {
  email_sent: boolean;
  sent_at: string; // ISO 8601 UTC
}

// ============================================================================
// Error Codes
// ============================================================================

/**
 * Common API error codes
 */
export enum APIErrorCode {
  // Client errors (4xx)
  ValidationError = 'VALIDATION_ERROR',
  Unauthorized = 'UNAUTHORIZED',
  BookingNotFound = 'BOOKING_NOT_FOUND',
  RateLimitExceeded = 'RATE_LIMIT_EXCEEDED',

  // Server errors (5xx)
  InternalError = 'INTERNAL_ERROR',
  ServiceUnavailable = 'SERVICE_UNAVAILABLE',
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard to check if API response is successful
 */
export function isSuccessResponse<T>(
  response: APIResponse<T>
): response is { success: true; data: T } {
  return response.success === true;
}

/**
 * Type guard to check if API response is an error
 */
export function isErrorResponse<T>(
  response: APIResponse<T>
): response is { success: false; error: APIError } {
  return response.success === false;
}

// ============================================================================
// Transformation Helpers (Type Definitions Only)
// ============================================================================

/**
 * Frontend booking type (camelCase)
 * This matches the existing types/booking.ts in the codebase
 */
export interface Booking {
  id: string;
  bookingNumber: string;
  passengerName: string;
  phone: string;
  email: string;
  flightNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  travelDateTime: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  paymentStatus: 'paid' | 'unpaid';
  jobStatus: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  finalMeterPrice?: number;
  omiseChargeId?: string;
  note?: string;
  emailSentAt?: Date | string;
}

/**
 * Transform API booking (snake_case) to frontend booking (camelCase)
 * Implementation should be in service layer
 */
export type TransformAPIBooking = (apiBooking: APIBooking) => Booking;

/**
 * Transform frontend booking data to API request format
 * Implementation should be in service layer
 */
export type TransformToAPIRequest = (
  formData: Partial<Booking>
) => CreateBookingRequest | UpdateBookingRequest;

// ============================================================================
// HTTP Client Interface
// ============================================================================

/**
 * Interface for the booking service
 * Defines all API operations for bookings
 */
export interface BookingServiceInterface {
  /**
   * Create a new booking
   * POST /bookings
   */
  createBooking(data: CreateBookingRequest): Promise<APIResponse<CreateBookingResponse>>;

  /**
   * Get a single booking by ID
   * GET /bookings/:id
   */
  getBooking(id: string): Promise<APIResponse<GetBookingResponse>>;

  /**
   * List bookings with optional filters
   * GET /bookings
   */
  listBookings(params?: ListBookingsParams): Promise<APIResponse<ListBookingsResponse>>;

  /**
   * Update an existing booking
   * PATCH /bookings/:id
   */
  updateBooking(
    id: string,
    data: UpdateBookingRequest
  ): Promise<APIResponse<UpdateBookingResponse>>;

  /**
   * Cancel a booking
   * DELETE /bookings/:id
   */
  cancelBooking(
    id: string,
    reason?: string
  ): Promise<APIResponse<CancelBookingResponse>>;

  /**
   * Resend booking confirmation email (Deferred to Phase 2)
   * POST /bookings/:id/resend-email
   */
  resendEmail?(id: string): Promise<APIResponse<ResendEmailResponse>>;
}

// ============================================================================
// Example Usage (Documentation)
// ============================================================================

/**
 * Example: Creating a booking
 *
 * ```typescript
 * const request: CreateBookingRequest = {
 *   passenger_name: "John Doe",
 *   passenger_email: "john@example.com",
 *   passenger_phone: "+66812345678",
 *   pickup_location: "Suvarnabhumi Airport Terminal 2",
 *   dropoff_location: "Sukhumvit Soi 11, Bangkok",
 *   pickup_time: "2025-11-06T14:30:00+07:00",
 *   pickup_timezone: "Asia/Bangkok",
 *   passenger_notes: "Gate 5"
 * };
 *
 * const response = await bookingService.createBooking(request);
 *
 * if (isSuccessResponse(response)) {
 *   const booking = response.data.booking;
 *   console.log('Created:', booking.booking_number);
 * } else {
 *   console.error('Error:', response.error.message);
 * }
 * ```
 */

/**
 * Example: Listing bookings with filters
 *
 * ```typescript
 * const params: ListBookingsParams = {
 *   date: "2025-11-06",
 *   status: JobStatus.Pending,
 *   page: 1,
 *   limit: 20
 * };
 *
 * const response = await bookingService.listBookings(params);
 *
 * if (isSuccessResponse(response)) {
 *   const { bookings, pagination } = response.data;
 *   console.log(`Found ${pagination.total} bookings`);
 *   console.log(`Showing page ${pagination.page} of ${pagination.totalPages}`);
 * }
 * ```
 */
