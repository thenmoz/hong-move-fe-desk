# Research: Hongmove Booking API Integration

**Feature**: 001-hongmove-api-integration
**Date**: 2025-11-11
**Status**: Complete

## Overview

This document consolidates research findings for integrating the Hongmove Booking API into the Frontdesk web application. Each research topic addresses technical decisions needed for implementation.

---

## 1. API Client Implementation Pattern

### Decision: Use Native Fetch API

**Rationale**:
- Native fetch is already available in modern browsers and Next.js runtime
- No additional dependencies = smaller bundle size
- Sufficient for RESTful API communication needs
- Next.js 13+ has enhanced fetch with caching capabilities
- TypeScript support built-in with proper typing

**Alternatives Considered**:
- **Axios**: Popular but adds ~14KB to bundle; provides interceptors and automatic JSON transformation
  - Rejected: Native fetch meets all requirements; bundle size matters for frontend performance
- **SWR / React Query**: Data fetching libraries with caching and revalidation
  - Rejected: Over-engineered for initial integration; can add later if caching needs grow

**Implementation Approach**:
- Create thin wrapper around fetch in `lib/services/apiClient.ts`
- Handle auth headers, base URL, and response parsing
- Return typed responses matching API contract

**Example Pattern**:
```typescript
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<APIResponse<T>>
```

---

## 2. Authentication Token Management

### Decision: Environment Variable for Token Storage

**Rationale**:
- Bearer token required for all API requests
- Development: Store in `.env.local` (not committed)
- Production: Store in environment variables (deployment platform)
- Simple, secure, and follows Next.js conventions
- No client-side token exposure (server components can use directly)

**Alternatives Considered**:
- **Session Storage**: Browser-based storage
  - Rejected: Less secure; token exposed in client; lost on tab close
- **HTTP-only Cookie**: More secure than session storage
  - Rejected: Adds complexity; requires backend cookie handling; overkill for this phase
- **Encrypted Local Storage**: Client-side with encryption
  - Rejected: Still exposes token to client-side; complexity not justified

**Implementation Approach**:
- Token stored in `NEXT_PUBLIC_HONGMOVE_API_TOKEN` (or `HONGMOVE_API_TOKEN` for server-only)
- API client reads from environment on initialization
- Token included in Authorization header: `Bearer ${token}`

**Configuration**:
```env
NEXT_PUBLIC_HONGMOVE_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_HONGMOVE_API_TOKEN=<agent-token-here>
```

**Security Notes**:
- `.env.local` must be in `.gitignore` (already is)
- Production tokens managed by deployment platform (Vercel, etc.)
- For future: Consider rotating tokens and refresh mechanism

---

## 3. Error Handling Strategy

### Decision: Structured Error Handling with Utility Function

**Rationale**:
- API returns consistent error envelope: `{ success: false, error: { code, message } }`
- Need to map API error codes to user-friendly Thai/English messages
- Centralized error handling ensures consistency
- Components remain simple - just display error messages

**Alternatives Considered**:
- **Global Error Boundary**: React Error Boundary component
  - Rejected: Catches render errors, not async API errors; different use case
- **Per-Request Try-Catch**: Handle errors at each API call site
  - Rejected: Duplicates error handling logic; inconsistent UX
- **Error Interceptor Pattern**: Centralized error interception (like Axios)
  - Selected (but with fetch): Implement in apiClient wrapper

**Implementation Approach**:
- `lib/services/errorHandler.ts` - Maps error codes to messages
- API client wrapper catches errors and formats them
- Components receive either success data or error object
- Display errors in UI with appropriate Thai/English message

**Error Types to Handle**:
1. Network errors (fetch failures)
2. HTTP status errors (4xx, 5xx)
3. API business logic errors (from response envelope)
4. Validation errors (from API response)
5. Timeout errors

**Error Message Strategy**:
```typescript
interface ErrorMessage {
  th: string;
  en: string;
}

const ERROR_MESSAGES: Record<string, ErrorMessage> = {
  'NETWORK_ERROR': {
    th: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
    en: 'Cannot connect to server'
  },
  // ... more error codes
}
```

---

## 4. State Management for API Data

### Decision: React State (useState + useEffect) with URL State for Filters

**Rationale**:
- Current application doesn't use external state library
- React state sufficient for component-level data (booking list, single booking)
- URL state (query parameters) for filters enables shareable links and browser back/forward
- Keeps bundle small and follows React conventions
- Next.js App Router provides `useSearchParams` hook for URL state

**Alternatives Considered**:
- **Redux / Zustand**: Global state management libraries
  - Rejected: Overkill for this feature; adds complexity and bundle size
- **React Context**: Shared state across components
  - Rejected: Not needed yet; components can pass data via props
- **Server State Libraries (SWR, React Query)**: Specialized for server data
  - Deferred: Good future enhancement for caching/revalidation, but not required for MVP

**Implementation Approach**:
- **Booking List**: `useState` in dashboard page component
- **Search Filters**: URL search params (`useSearchParams`)
- **Single Booking**: `useState` in modal or detail view
- **Loading States**: `useState` per component
- **Form Data**: `useState` in BookingForm component

**URL State Pattern for Filters**:
```typescript
// In dashboard page:
const searchParams = useSearchParams();
const filters = {
  date: searchParams.get('date'),
  status: searchParams.get('status'),
  // ...
};
```

**Benefits**:
- Shareable URLs: `/dashboard?date=2025-11-11&status=pending`
- Browser navigation works (back/forward)
- Simple to implement and understand

---

## 5. Loading State Patterns

### Decision: Per-Component Loading States with Optimistic UI Updates

**Rationale**:
- Different operations have different loading times (list vs create)
- Per-component loading allows fine-grained UX control
- User can see which specific operation is in progress
- Aligns with constitution requirement: "Actions respond within 100ms"

**Alternatives Considered**:
- **Global Loading Indicator**: Single spinner for entire app
  - Rejected: Too coarse; doesn't show which operation is loading
- **Skeleton Screens**: Placeholder content while loading
  - Selected for list views: Show skeleton rows while fetching
- **Progress Bars**: Linear progress indicators
  - Rejected: Not suitable for unknown duration operations

**Implementation Approach**:

1. **List Loading**: Skeleton rows in BookingTable
   ```tsx
   {isLoading ? <SkeletonRows count={5} /> : <ActualRows />}
   ```

2. **Form Submission**: Disable button + spinner
   ```tsx
   <Button disabled={isSubmitting}>
     {isSubmitting ? <Spinner /> : 'Create Booking'}
   </Button>
   ```

3. **Search/Filter**: Show loading state in filter bar
   ```tsx
   <SearchFilter isLoading={isLoadingResults} />
   ```

4. **Optimistic Updates**: For instant feedback
   ```tsx
   // Update UI immediately, revert if API fails
   setBookings(prev => [...prev, newBooking]);
   try {
     await createBooking(data);
   } catch (error) {
     setBookings(prev => prev.filter(b => b.id !== newBooking.id));
   }
   ```

**Loading State Types**:
- `isLoading`: Initial data fetch
- `isSubmitting`: Form submission
- `isRefreshing`: Refreshing existing data
- `isLoadingMore`: Pagination

---

## API Response Patterns

Based on Postman collection analysis, all endpoints follow consistent patterns:

### Success Response
```json
{
  "success": true,
  "data": { /* resource data */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "bookings": [ /* array of bookings */ ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 20,
      "totalPages": 5
    }
  }
}
```

---

## Best Practices Applied

1. **Type Safety**: All API responses typed with TypeScript interfaces
2. **Error Boundaries**: Handle errors gracefully at component level
3. **Loading States**: Immediate feedback for all user actions
4. **Separation of Concerns**: Service layer separate from UI components
5. **Environment Configuration**: API URL and token externalized
6. **Timezone Handling**: All dates sent with Asia/Bangkok timezone
7. **Validation**: Client-side validation before API calls
8. **Accessibility**: Loading states announced to screen readers

---

## Technology Choices Summary

| Aspect | Technology | Justification |
|--------|------------|---------------|
| HTTP Client | Native Fetch | Built-in, zero dependencies, sufficient features |
| Auth Storage | Environment Variables | Secure, simple, Next.js standard |
| Error Handling | Centralized Utility | Consistent UX, maintainable |
| State Management | React State + URL State | Simple, appropriate scale, shareable URLs |
| Loading UX | Per-Component States | Fine-grained control, better UX |
| Type Safety | TypeScript Interfaces | Compile-time safety, documentation |

---

## Next Steps

All research decisions are complete. Proceed to Phase 1 (Data Model & Contracts).
