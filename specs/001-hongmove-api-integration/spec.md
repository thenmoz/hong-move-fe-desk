# Feature Specification: Hongmove Booking API Integration

**Feature Branch**: `001-hongmove-api-integration`
**Created**: 2025-11-11
**Status**: Draft
**Input**: User description: "Implement an integration between frontdesk and hongmove api. for frontdesk we usually using only booking api integrate."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and Retrieve Bookings (Priority: P1)

Frontdesk staff need to create new bookings through the Hongmove API and immediately see the booking appear in the system with all details correctly stored and displayed.

**Why this priority**: This is the core functionality that replaces mock data with real API integration. Without this, staff cannot manage real bookings.

**Independent Test**: Can be fully tested by creating a booking through the form, verifying it appears in the API response, and confirming all entered data is accurately displayed in the booking list.

**Acceptance Scenarios**:

1. **Given** frontdesk staff are on the booking form, **When** they fill in passenger details (name, email, phone), flight information, pickup/dropoff locations, and submit, **Then** the booking is created via API and appears in the booking list with a unique booking number
2. **Given** a booking was just created, **When** staff navigate to the booking list, **Then** the new booking appears with correct passenger name, flight details, pickup time, and status
3. **Given** staff click on a booking from the list, **When** the booking detail view loads, **Then** all booking information retrieved from the API is displayed including passenger contact, locations, times, and notes

---

### User Story 2 - Search and Filter Bookings (Priority: P2)

Frontdesk staff need to search and filter bookings from the API by date range, booking number, passenger name, flight number, and payment status to quickly find specific bookings.

**Why this priority**: With real API data, staff need robust search capabilities to handle growing booking volumes efficiently.

**Independent Test**: Can be tested by creating multiple bookings with different attributes, then using various filter combinations to verify correct results are returned from the API.

**Acceptance Scenarios**:

1. **Given** staff are viewing the booking list, **When** they select a specific date range, **Then** only bookings with pickup times within that range are fetched from the API and displayed
2. **Given** staff enter a booking number in the search field, **When** they submit the search, **Then** the API returns and displays only the matching booking
3. **Given** staff select a payment status filter (Paid/Unpaid), **When** the filter is applied, **Then** the API query includes the payment status filter and displays only matching bookings
4. **Given** multiple filters are active (date + status), **When** staff view results, **Then** the API receives all filter parameters and returns bookings matching all criteria

---

### User Story 3 - Update Booking Details (Priority: P3)

Frontdesk staff need to update booking information (passenger details, pickup time, locations, notes) through the API when customers request changes.

**Why this priority**: Changes to bookings are common and staff need the ability to modify existing records without manual workarounds.

**Independent Test**: Can be tested by creating a booking, modifying various fields through the edit interface, and verifying the API update succeeds and new data persists.

**Acceptance Scenarios**:

1. **Given** staff are viewing a booking detail, **When** they click edit and change the passenger name, **Then** the API update request succeeds and the new name is displayed
2. **Given** staff are editing a booking, **When** they update the pickup time, **Then** the API accepts the new time and the booking displays the updated schedule
3. **Given** staff modify multiple fields (name, phone, notes), **When** they save changes, **Then** all updates are sent to the API and reflected in the booking detail view
4. **Given** an API update fails due to validation error, **When** staff attempt to save, **Then** the error message from the API is displayed in Thai/English

---

### User Story 4 - Resend Confirmation Emails (Priority: P4)

Frontdesk staff need to resend booking confirmation emails to customers who didn't receive the original or requested another copy.

**Why this priority**: Email issues are common, and staff need a self-service solution to resend confirmations without IT support.

**Independent Test**: Can be tested by creating a booking and using the resend email function, verifying the API call succeeds and appropriate feedback is shown.

**Acceptance Scenarios**:

1. **Given** staff are viewing a booking detail, **When** they click the "Resend Email" button, **Then** the API request is sent and a success message appears
2. **Given** staff resend an email, **When** the API returns success, **Then** the email sent status is updated in the UI
3. **Given** staff attempt to resend too frequently, **When** the API returns a rate limit error (429), **Then** a message displays showing the retry-after time
4. **Given** the API email send fails, **When** staff view the result, **Then** an error message in Thai/English explains the failure

---

### User Story 5 - Cancel Bookings (Priority: P5)

Frontdesk staff need to cancel bookings through the API when customers request cancellation, with an optional cancellation reason.

**Why this priority**: Cancellations are less frequent than creates/updates but still necessary for complete booking lifecycle management.

**Independent Test**: Can be tested by creating a booking, canceling it with a reason, and verifying the booking status changes to "canceled" via the API.

**Acceptance Scenarios**:

1. **Given** staff are viewing a booking, **When** they click cancel and provide a reason, **Then** the API cancel request succeeds and the booking status updates to "canceled"
2. **Given** staff cancel a booking, **When** the cancellation is confirmed, **Then** the booking disappears from active booking lists (or displays with canceled status)
3. **Given** staff attempt to cancel an already canceled booking, **When** they try, **Then** the API returns an appropriate error and staff see a clear message

---

### Edge Cases

- What happens when the API is unreachable (network error)?
- How does the system handle API timeouts (slow responses)?
- What happens when the API returns validation errors for booking data?
- How does the system handle authentication failures (invalid or expired tokens)?
- What happens when pagination returns more results than expected?
- How does the system handle API rate limiting (429 responses)?
- What happens when booking data contains special characters or Thai language text?
- How does the system handle timezone differences between client and API?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST authenticate all API requests using Bearer token authentication
- **FR-002**: System MUST create new bookings via POST request to the bookings endpoint with passenger details, locations, pickup time, and timezone
- **FR-003**: System MUST retrieve individual booking details via GET request using the booking ID
- **FR-004**: System MUST list bookings with support for pagination (page, limit) and filtering (date, status, booking number, passenger name, flight number)
- **FR-005**: System MUST update existing bookings via PATCH request with changed fields
- **FR-006**: System MUST cancel bookings via DELETE request with optional cancellation reason
- **FR-007**: System MUST resend booking confirmation emails via POST request to the resend-email endpoint
- **FR-008**: System MUST display loading states while API requests are in progress
- **FR-009**: System MUST handle API errors gracefully and display user-friendly error messages in Thai and English
- **FR-010**: System MUST validate API responses match expected envelope format (success: true/false)
- **FR-011**: System MUST parse and display booking data from API responses including booking number, passenger info, locations, times, and status
- **FR-012**: System MUST handle API rate limiting (429 responses) by displaying retry-after information
- **FR-013**: System MUST send pickup times with timezone information (Asia/Bangkok) to ensure correct scheduling
- **FR-014**: System MUST update UI state when API operations complete successfully
- **FR-015**: System MUST maintain consistent booking data model between mock data structure and API response structure

### Key Entities

- **Booking**: Represents a customer transportation booking with passenger information (name, email, phone), trip details (pickup/dropoff locations, pickup time, timezone), flight number, notes, booking number, payment status, and job status
- **API Response Envelope**: Standard API response format with success flag, data payload for successful requests, or error object with code and message for failures
- **API Authentication Token**: Bearer token used to authenticate all requests to the Hongmove API
- **API Error**: Error response from API containing error code, message, and optional details for troubleshooting
- **Pagination Metadata**: Information about total records, current page, limit per page, and total pages for list operations

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Frontdesk staff can create a new booking and see it appear in the list within 3 seconds of submission
- **SC-002**: 95% of booking list loads complete within 2 seconds when fetching up to 20 bookings
- **SC-003**: Staff can successfully search and filter bookings with results appearing within 2 seconds
- **SC-004**: Booking updates save and reflect in the UI within 2 seconds of clicking save
- **SC-005**: Email resend requests complete within 5 seconds with clear success/failure feedback
- **SC-006**: API error messages display in the user's language (Thai or English) within 1 second of error occurrence
- **SC-007**: System remains functional and provides clear error messages even when API is unavailable
- **SC-008**: 100% of booking data fields correctly map between frontend and API (no data loss or corruption)
- **SC-009**: Staff can complete all booking operations (create, view, update, resend, cancel) without encountering technical errors during normal operation
- **SC-010**: System handles at least 100 bookings displayed in the list without performance degradation

## Assumptions

- The Hongmove API base URL and authentication token will be provided via environment configuration
- The API follows the contract defined in the Postman collection
- The API is available during frontdesk operating hours with 99%+ uptime
- The API uses Thai local time (Asia/Bangkok timezone) for all datetime operations
- Booking numbers generated by the API follow the format shown in the Postman examples (e.g., BK20251106001)
- The current mock data structure in the frontend is similar enough to the API response structure to allow gradual migration
- Staff have stable internet connectivity for API requests
- API authentication tokens are long-lived and do not require frequent refresh during a work session
