# Quickstart Guide: Hongmove Booking API Integration

**Feature**: 001-hongmove-api-integration
**Date**: 2025-11-11
**Branch**: `001-hongmove-api-integration`

## Overview

This guide helps developers set up and implement the Hongmove Booking API integration for the Frontdesk web application. Follow these steps to get started quickly.

---

## Prerequisites

Before starting, ensure you have:

- [x] Node.js 20+ installed
- [x] Access to the Hongmove API endpoint
- [x] Valid Hongmove API authentication token
- [x] Familiarity with TypeScript and React
- [x] Next.js 16 App Router knowledge

---

## Setup Steps

### 1. Environment Configuration

Create `.env.local` file in the project root (if it doesn't exist):

```bash
# Create .env.local file
touch .env.local
```

Add the following environment variables:

```env
# Hongmove API Configuration
NEXT_PUBLIC_HONGMOVE_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_HONGMOVE_API_TOKEN=your-agent-token-here

# Optional: API timeout in milliseconds
NEXT_PUBLIC_API_TIMEOUT=30000
```

**Important**:
- `.env.local` is already in `.gitignore` - do NOT commit it
- For production, set these variables in your deployment platform (Vercel, etc.)
- Use the agent token from the Postman collection variables

### 2. Verify Branch

Ensure you're on the correct feature branch:

```bash
git branch
# Should show: * 001-hongmove-api-integration
```

If not, switch to it:

```bash
git checkout 001-hongmove-api-integration
```

### 3. Install Dependencies

Dependencies are already installed (`package.json` hasn't changed), but if needed:

```bash
npm install
```

### 4. Review Documentation

Familiarize yourself with key documents:

- [spec.md](./spec.md) - Feature requirements and user stories
- [data-model.md](./data-model.md) - Entity definitions and validation rules
- [research.md](./research.md) - Technical decisions and patterns
- [contracts/booking-api.ts](./contracts/booking-api.ts) - TypeScript API types

---

## Implementation Checklist

### Phase 1: Service Layer Foundation

- [ ] **Create API client** (`lib/services/apiClient.ts`)
  - Base fetch wrapper with auth headers
  - Request/response type safety
  - Error handling middleware

- [ ] **Create error handler** (`lib/services/errorHandler.ts`)
  - Map API error codes to Thai/English messages
  - Provide user-friendly error display

- [ ] **Create booking service** (`lib/services/bookingService.ts`)
  - Implement all CRUD operations
  - Transform snake_case ↔ camelCase
  - Handle timezone conversions

- [ ] **Create API types** (`types/api.ts`)
  - Copy/adapt from `contracts/booking-api.ts`
  - Add any frontend-specific types

### Phase 2: Component Integration

- [ ] **Update BookingForm** (`components/booking/BookingForm.tsx`)
  - Call `bookingService.createBooking()` on submit
  - Show loading state during submission
  - Display success/error messages

- [ ] **Update BookingTable** (`components/dashboard/BookingTable.tsx`)
  - Accept bookings from API instead of mock data
  - Show loading skeleton while fetching
  - Handle empty state (no bookings)

- [ ] **Update SearchFilter** (`components/dashboard/SearchFilter.tsx`)
  - Pass filter changes to parent via callback
  - Sync filters with URL search params

- [ ] **Update Dashboard Page** (`app/dashboard/page.tsx`)
  - Fetch bookings using `bookingService.listBookings()`
  - Manage loading, error, and data states
  - Handle filter changes and refetch

### Phase 3: Testing & Refinement

- [ ] **Manual testing**
  - Create new booking
  - View booking list
  - Filter bookings by date, status
  - Update booking details
  - Cancel booking

- [ ] **Error scenarios**
  - Test with invalid API token
  - Test with network disconnected
  - Test API rate limiting (429 responses)
  - Test validation errors

- [ ] **Performance**
  - Verify list loads < 2 seconds
  - Check form submission < 3 seconds
  - Ensure UI responds within 100ms

- [ ] **Responsiveness**
  - Test on mobile viewport
  - Test on tablet viewport
  - Test on desktop viewport

---

## Code Examples

### Example 1: API Client Setup

```typescript
// lib/services/apiClient.ts
const BASE_URL = process.env.NEXT_PUBLIC_HONGMOVE_API_BASE_URL;
const AUTH_TOKEN = process.env.NEXT_PUBLIC_HONGMOVE_API_TOKEN;

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<APIResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_TOKEN}`,
      ...options?.headers,
    },
  });

  const data = await response.json();
  return data as APIResponse<T>;
}
```

### Example 2: Booking Service

```typescript
// lib/services/bookingService.ts
import { apiFetch } from './apiClient';
import type {
  CreateBookingRequest,
  CreateBookingResponse,
  APIResponse,
} from '@/types/api';

export async function createBooking(
  formData: BookingFormData
): Promise<APIResponse<CreateBookingResponse>> {
  // Transform camelCase to snake_case
  const request: CreateBookingRequest = {
    passenger_name: formData.passengerName,
    passenger_email: formData.email,
    passenger_phone: formData.phone,
    pickup_location: formData.pickupLocation,
    dropoff_location: formData.dropoffLocation,
    pickup_time: `${formData.travelDateTime}+07:00`, // Add timezone
    pickup_timezone: 'Asia/Bangkok',
    passenger_notes: formData.note,
  };

  return apiFetch<CreateBookingResponse>('/bookings', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}
```

### Example 3: Using Service in Component

```typescript
// components/booking/BookingForm.tsx
import { createBooking } from '@/lib/services/bookingService';
import { isSuccessResponse } from '@/types/api';

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: BookingFormData) {
    setIsSubmitting(true);
    setError(null);

    const response = await createBooking(formData);

    if (isSuccessResponse(response)) {
      // Success! Show confirmation
      const booking = response.data.booking;
      alert(`Booking created: ${booking.booking_number}`);
    } else {
      // Error - show message
      setError(response.error.message);
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      {error && <div className="error">{error}</div>}
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Booking'}
      </button>
    </form>
  );
}
```

---

## Development Workflow

### Starting Development Server

```bash
npm run dev
```

Navigate to: http://localhost:3000

### Testing API Connection

1. Open browser DevTools → Network tab
2. Navigate to dashboard
3. Check for API requests to Hongmove API
4. Verify Authorization header is present
5. Check response status and data

### Common Issues & Solutions

#### Issue: "Cannot connect to server"
- **Solution**: Verify `NEXT_PUBLIC_HONGMOVE_API_BASE_URL` is correct
- Check if Hongmove API is running
- Check for CORS issues (if applicable)

#### Issue: "Unauthorized" error
- **Solution**: Verify `NEXT_PUBLIC_HONGMOVE_API_TOKEN` is valid
- Ensure token matches the one in Postman collection
- Check Authorization header format: `Bearer <token>`

#### Issue: TypeScript errors in types
- **Solution**: Ensure `types/api.ts` matches `contracts/booking-api.ts`
- Run `npm run build` to check for type errors
- Fix any type mismatches

#### Issue: Date/time timezone issues
- **Solution**: Always append `+07:00` to pickup_time
- Use `date-fns` for date formatting
- Set `pickup_timezone: "Asia/Bangkok"` in API requests

---

## File Structure

After implementation, your structure should look like:

```
frontdesk-app/
├── .env.local                    # NEW: Environment config
├── app/
│   └── dashboard/
│       └── page.tsx              # UPDATED: Use API
├── components/
│   ├── booking/
│   │   └── BookingForm.tsx       # UPDATED: API integration
│   └── dashboard/
│       ├── BookingTable.tsx      # UPDATED: API data
│       └── SearchFilter.tsx      # UPDATED: URL state
├── lib/
│   └── services/                 # NEW: Service layer
│       ├── apiClient.ts          # NEW: Base API client
│       ├── bookingService.ts     # NEW: Booking operations
│       └── errorHandler.ts       # NEW: Error mapping
├── types/
│   ├── booking.ts                # EXISTING: Keep as-is
│   └── api.ts                    # NEW: API types
└── specs/
    └── 001-hongmove-api-integration/
        ├── spec.md
        ├── plan.md
        ├── research.md
        ├── data-model.md
        ├── quickstart.md         # This file
        └── contracts/
            └── booking-api.ts
```

---

## Next Steps

1. **Start with Phase 1**: Implement service layer first
2. **Test services independently**: Use browser console or test file
3. **Move to Phase 2**: Integrate with components one at a time
4. **Manual testing**: Test each user story from spec.md
5. **Generate tasks**: Run `/speckit.tasks` to get detailed task breakdown

---

## Reference Links

- **Spec**: [spec.md](./spec.md)
- **Plan**: [plan.md](./plan.md)
- **Data Model**: [data-model.md](./data-model.md)
- **Contracts**: [contracts/booking-api.ts](./contracts/booking-api.ts)
- **Constitution**: [.specify/memory/constitution.md](../../.specify/memory/constitution.md)

---

## API Endpoint Reference

Based on Postman collection:

| Method | Endpoint | Purpose | User Story |
|--------|----------|---------|------------|
| POST | `/bookings` | Create booking | US1 |
| GET | `/bookings/:id` | Get single booking | US1 |
| GET | `/bookings` | List with filters | US2 |
| PATCH | `/bookings/:id` | Update booking | US3 |
| DELETE | `/bookings/:id` | Cancel booking | US5 |
| POST | `/bookings/:id/resend-email` | Resend email | US4 (Deferred) |

---

## Getting Help

If you encounter issues:

1. Check this quickstart guide
2. Review [research.md](./research.md) for technical decisions
3. Check [data-model.md](./data-model.md) for entity definitions
4. Refer to Postman collection for API contract details
5. Review constitution for compliance requirements

---

**Happy Coding!** 🚀
