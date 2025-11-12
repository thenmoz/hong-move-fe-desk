# Data Model: Hongmove Booking API Integration

**Feature**: 001-hongmove-api-integration
**Date**: 2025-11-11
**Status**: Complete

## Overview

This document defines all data entities, their relationships, validation rules, and state transitions for the Hongmove Booking API integration. The data model aligns with existing frontend types while adding API-specific structures.

---

## Core Entities

### 1. Booking

**Description**: Represents a customer transportation booking with complete trip and passenger information.

**Fields**:

| Field | Type | Required | Description | Validation |
|-------|------|----------|-------------|------------|
| `id` | string (UUID) | Yes | Unique booking identifier | UUID format |
| `bookingNumber` | string | Yes | Human-readable booking reference | Format: BK{YYYYMMDD}{###} |
| `passengerName` | string | Yes | Full name of passenger | Min 2 chars, max 100 chars |
| `phone` | string | Yes | Contact phone number | Thai phone format (+66...) |
| `email` | string | Yes | Contact email address | Valid email format |
| `flightNumber` | string | Yes | Flight number for pickup/dropoff | Alphanumeric, max 20 chars |
| `pickupLocation` | string | Yes | Pickup address or location name | Min 5 chars, max 200 chars |
| `dropoffLocation` | string | Yes | Dropoff address or location name | Min 5 chars, max 200 chars |
| `travelDateTime` | ISO 8601 string | Yes | Scheduled pickup date and time | ISO 8601 with timezone |
| `pickupTimezone` | string | Yes | Timezone for pickup | IANA timezone (Asia/Bangkok) |
| `createdAt` | ISO 8601 string | Yes | Booking creation timestamp | ISO 8601 UTC |
| `updatedAt` | ISO 8601 string | Yes | Last update timestamp | ISO 8601 UTC |
| `paymentStatus` | PaymentStatus enum | Yes | Payment completion status | 'paid' or 'unpaid' |
| `jobStatus` | JobStatus enum | Yes | Booking lifecycle status | See JobStatus enum |
| `finalMeterPrice` | number | No | Final fare from meter (THB) | Positive number, 2 decimals |
| `omiseChargeId` | string | No | Omise payment charge identifier | Omise charge ID format |
| `note` | string | No | Additional notes or instructions | Max 500 chars |
| `emailSentAt` | ISO 8601 string | No | Timestamp of confirmation email | ISO 8601 UTC |

**Relationships**:
- One booking may have one payment (via `omiseChargeId`)
- Bookings filtered by date range, status, or passenger info

**State Transitions**: See JobStatus section below

---

### 2. PaymentStatus (Enum)

**Description**: Indicates whether booking payment has been completed.

**Values**:

| Value | Thai Label | English Label | Description |
|-------|-----------|---------------|-------------|
| `paid` | ชำระแล้ว | Paid | Payment completed successfully |
| `unpaid` | ยังไม่ชำระ | Unpaid | Payment not yet received |

**Validation**:
- Must be one of the two defined values
- Cannot be empty or null

---

### 3. JobStatus (Enum)

**Description**: Tracks the booking through its lifecycle from creation to completion or cancellation.

**Values**:

| Value | Thai Label | English Label | Description |
|-------|-----------|---------------|-------------|
| `pending` | รอยืนยัน | Pending | Booking created, awaiting confirmation |
| `confirmed` | ยืนยันแล้ว | Confirmed | Booking confirmed by staff |
| `in_progress` | กำลังเดินทาง | In Progress | Trip is currently active |
| `completed` | เสร็จสิ้น | Completed | Trip finished successfully |
| `cancelled` | ยกเลิก | Cancelled | Booking cancelled |

**State Transitions**:

```
pending → confirmed → in_progress → completed
   ↓
cancelled (from any state except completed)
```

**Validation Rules**:
- Cannot transition from `completed` to any other state
- Cannot transition from `cancelled` to any other state
- `in_progress` can only come from `confirmed`
- `completed` can only come from `in_progress`

---

### 4. BookingFormData

**Description**: Data structure for creating or updating a booking (user input).

**Fields**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `passengerName` | string | Yes | Passenger full name |
| `phone` | string | Yes | Contact phone |
| `email` | string | Yes | Contact email |
| `flightNumber` | string | Yes | Flight number |
| `pickupLocation` | string | Yes | Pickup address |
| `dropoffLocation` | string | Yes | Dropoff address |
| `travelDateTime` | string | Yes | Pickup date/time (ISO 8601) |
| `note` | string | No | Additional notes |

**Validation** (Client-Side):
- All required fields must be non-empty
- Email must be valid format
- Phone must match Thai format
- Travel date/time must be in future
- Locations must be different

**Transformation to API**:
```typescript
// Frontend form data
{ travelDateTime: "2025-11-11T14:30" }

// Transformed to API request
{
  pickup_time: "2025-11-11T14:30:00+07:00",
  pickup_timezone: "Asia/Bangkok"
}
```

---

### 5. SearchFilters

**Description**: Query parameters for searching and filtering bookings.

**Fields**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `dateFrom` | string (YYYY-MM-DD) | No | Filter bookings from this date |
| `dateTo` | string (YYYY-MM-DD) | No | Filter bookings until this date |
| `bookingNumber` | string | No | Exact booking number match |
| `passengerName` | string | No | Partial passenger name search |
| `flightNumber` | string | No | Partial flight number search |
| `paymentStatus` | PaymentStatus or 'all' | No | Filter by payment status |
| `jobStatus` | JobStatus or 'all' | No | Filter by job status |

**Transformation to API Query**:
```typescript
// Frontend filters
{
  dateFrom: '2025-11-01',
  dateTo: '2025-11-30',
  paymentStatus: 'unpaid',
  jobStatus: 'pending'
}

// API query params
?date=2025-11-01&status=pending&payment_status=unpaid
```

**Notes**:
- Empty/null filters are omitted from query
- 'all' value means no filter applied

---

## API-Specific Entities

### 6. APIResponse<T>

**Description**: Generic wrapper for all API responses following success/error envelope pattern.

**Type Definition**:
```typescript
type APIResponse<T> =
  | { success: true; data: T }
  | { success: false; error: APIError };
```

**Usage**:
- All API endpoints return this structure
- Type parameter `T` represents the success data shape
- Enables type-safe error handling

**Examples**:
```typescript
APIResponse<Booking>              // Single booking
APIResponse<BookingListResponse>  // List with pagination
APIResponse<{ booking_id: string }> // Creation response
```

---

### 7. APIError

**Description**: Structured error information from API failures.

**Fields**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | string | Yes | Machine-readable error code |
| `message` | string | Yes | Human-readable error description |
| `details` | object | No | Additional error context |

**Common Error Codes**:

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `UNAUTHORIZED` | 401 | Invalid or missing auth token |
| `BOOKING_NOT_FOUND` | 404 | Booking ID does not exist |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server-side error |

**Error Mapping to UI**:
- Errors mapped to Thai/English messages
- Displayed in appropriate UI component (toast, inline, modal)

---

### 8. PaginationMeta

**Description**: Metadata for paginated list responses.

**Fields**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `total` | number | Yes | Total number of items across all pages |
| `page` | number | Yes | Current page number (1-indexed) |
| `limit` | number | Yes | Items per page |
| `totalPages` | number | Yes | Total number of pages |

**Calculation**:
```
totalPages = Math.ceil(total / limit)
```

**Usage**:
```typescript
{
  total: 47,
  page: 2,
  limit: 20,
  totalPages: 3
}
// Shows items 21-40 out of 47 total
```

---

### 9. BookingListResponse

**Description**: Response structure for listing bookings with pagination.

**Fields**:

| Field | Type | Description |
|-------|------|-------------|
| `bookings` | Booking[] | Array of booking objects |
| `pagination` | PaginationMeta | Pagination metadata |

**Example**:
```typescript
{
  success: true,
  data: {
    bookings: [ /* booking objects */ ],
    pagination: {
      total: 47,
      page: 1,
      limit: 20,
      totalPages: 3
    }
  }
}
```

---

## Field Name Mapping (Frontend ↔ API)

The API uses snake_case while frontend uses camelCase. Mapping required:

| Frontend Field | API Field |
|----------------|-----------|
| `bookingNumber` | `booking_number` |
| `passengerName` | `passenger_name` |
| `passengerEmail` | `passenger_email` |
| `passengerPhone` | `passenger_phone` |
| `pickupLocation` | `pickup_location` |
| `dropoffLocation` | `dropoff_location` |
| `travelDateTime` | `pickup_time` |
| `pickupTimezone` | `pickup_timezone` |
| `flightNumber` | `flight_number` |
| `paymentStatus` | `payment_status` |
| `jobStatus` | `status` |
| `finalMeterPrice` | `final_meter_price` |
| `omiseChargeId` | `omise_charge_id` |
| `emailSentAt` | `email_sent_at` |
| `createdAt` | `created_at` |
| `updatedAt` | `updated_at` |

**Implementation**:
- Service layer handles transformation
- Components work with camelCase
- API requests/responses use snake_case

---

## Validation Rules Summary

### Booking Creation
1. All required fields must be present
2. Email format validation
3. Phone number format (Thai: +66...)
4. Travel date/time in future
5. Pickup and dropoff locations different
6. Flight number alphanumeric

### Booking Update
1. At least one field must change
2. Same validation as creation for changed fields
3. Cannot change booking number or ID
4. Cannot change completed/cancelled bookings

### Search Filters
1. dateFrom ≤ dateTo
2. Valid enum values for status filters
3. Date format: YYYY-MM-DD

---

## Data Flow Diagram

```
User Input (Form)
       ↓
BookingFormData (camelCase)
       ↓
Service Layer (transform)
       ↓
API Request Payload (snake_case)
       ↓
Hongmove API
       ↓
API Response Envelope (snake_case)
       ↓
Service Layer (transform)
       ↓
Booking (camelCase)
       ↓
React Component (display)
```

---

## Timezone Handling

All datetime fields follow these rules:

1. **Storage**: UTC in ISO 8601 format
2. **Transmission**: ISO 8601 with timezone offset
3. **Display**: Formatted for Asia/Bangkok timezone
4. **User Input**: Local time interpreted as Asia/Bangkok

**Example**:
```typescript
// User inputs: "2025-11-11 14:30"
// Stored as: "2025-11-11T14:30:00+07:00"
// API receives: "2025-11-11T07:30:00Z" (UTC)
// Displayed as: "11 พ.ย. 2568, 14:30 น."
```

---

## Next Steps

Data model complete. Proceed to:
1. Generate TypeScript contracts (`contracts/booking-api.ts`)
2. Create quickstart guide (`quickstart.md`)
