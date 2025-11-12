# Implementation Plan: Hongmove Booking API Integration

**Branch**: `001-hongmove-api-integration` | **Date**: 2025-11-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-hongmove-api-integration/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature integrates the Frontdesk web application with the Hongmove Booking API, replacing mock data with real backend operations. The integration covers all booking lifecycle operations: create, retrieve, list with filtering, update, and cancel bookings. Email confirmation functionality is deferred to Phase 2. The implementation will use a service layer pattern to maintain separation between UI components and API communication, ensuring type safety throughout the data flow and maintaining the existing design theme from Figma specifications.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16.0.1 (App Router)
**Primary Dependencies**:
- React 19.2.0 for UI components
- date-fns 4.1.0 for date/time handling
- Tailwind CSS 4 for styling
- Native fetch API for HTTP requests
**Storage**: N/A (frontend only - data managed by backend API)
**Testing**: Manual testing required per constitution; integration testing recommended for API flows
**Target Platform**: Web browsers (modern Chrome, Safari, Firefox, Edge)
**Project Type**: Web frontend application
**Performance Goals**:
- API response rendering < 2 seconds (95th percentile)
- List operations display within 2 seconds for 20+ items
- Form submissions complete within 3 seconds
- UI actions respond within 100ms
**Constraints**:
- Must work on mobile, tablet, and desktop viewports
- Support Thai and English language content
- Maintain existing design theme and color scheme
- All API requests must include Bearer token authentication
- Timezone handling for Asia/Bangkok
**Scale/Scope**:
- Support 100+ bookings in list view without performance degradation
- Handle concurrent booking operations
- Graceful degradation when API unavailable

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Component-First Architecture ✅
- **Status**: PASS
- **Check**: API integration will be implemented via service layer functions, keeping UI components decoupled
- **Evidence**: Existing component structure (`components/booking/`, `components/dashboard/`) will be preserved; only service functions added

### II. Type Safety (NON-NEGOTIABLE) ✅
- **Status**: PASS
- **Check**: All API requests/responses will have TypeScript interfaces; no `any` types
- **Evidence**: Existing `types/booking.ts` provides foundation; API response types will be added to match Postman contract

### III. Responsive Design & User Experience ✅
- **Status**: PASS
- **Check**: No UI changes required initially; existing responsive components maintained
- **Evidence**: Integration uses existing BookingForm, BookingTable, SearchFilter components which already implement responsive design

### IV. API-Ready Architecture ✅
- **Status**: PASS
- **Check**: This feature directly implements the API-ready principle by replacing mock data
- **Evidence**: Service layer will separate data fetching from components, include error handling, support loading states

### V. Data Integrity & Validation ✅
- **Status**: PASS
- **Check**: Existing form validation remains; API errors will be displayed in Thai/English
- **Evidence**: API response validation added; error handling preserves validation principle

### Quality Standards ✅

**Testing**:
- Manual testing required for all booking operations
- Integration testing recommended for critical flows (create, update, list)

**Accessibility**:
- No new UI components introduced; existing accessible components preserved

**Performance**:
- API calls include loading states to maintain 100ms response feedback
- List virtualization not needed until >100 items (deferred)

### Gate Decision: ✅ PROCEED TO PHASE 0

No constitution violations. All principles satisfied by service layer pattern.

## Project Structure

### Documentation (this feature)

```text
specs/001-hongmove-api-integration/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── booking-api.ts   # TypeScript API contract types
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx           # Root layout (no changes)
├── page.tsx             # Login page (no changes)
└── dashboard/
    └── page.tsx         # Dashboard (updated to use API service)

components/
├── ui/                  # Base UI components (no changes)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   └── Badge.tsx
├── booking/
│   └── BookingForm.tsx  # Updated to call API service
├── dashboard/
│   ├── SearchFilter.tsx # Updated to pass filters to API service
│   └── BookingTable.tsx # Updated to display API data
├── email/
│   └── EmailConfirmation.tsx  # Deferred to Phase 2
└── payment/
    └── PaymentView.tsx  # No changes (display only)

types/
├── booking.ts           # Existing types (kept)
└── api.ts               # NEW: API request/response types

lib/
└── services/            # NEW: Service layer
    ├── apiClient.ts     # NEW: Base API client with auth
    ├── bookingService.ts # NEW: Booking CRUD operations
    └── errorHandler.ts  # NEW: API error handling utility

.env.local               # NEW: API configuration (not committed)
```

**Structure Decision**: This is a web frontend application (Next.js App Router). We'll use the existing Next.js structure and add a service layer in `lib/services/` to handle API communication. This maintains separation of concerns (Principle IV) and keeps components focused on presentation.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. This section is empty.

---

## Phase 0: Research & Design Decisions

See [research.md](./research.md) for complete research findings.

### Research Topics

1. **API Client Implementation Pattern**
   - Decision needed: Native fetch vs. external HTTP library
   - Context: Native fetch is already available; external library adds bundle size

2. **Authentication Token Management**
   - Decision needed: Token storage strategy (env variable, session, cookie)
   - Context: Bearer token required for all API requests

3. **Error Handling Strategy**
   - Decision needed: Global error handler vs. per-request error handling
   - Context: API returns structured error envelope with codes

4. **State Management for API Data**
   - Decision needed: React state, URL state, or external state library
   - Context: Booking list, filters, and individual booking views need state

5. **Loading State Patterns**
   - Decision needed: Per-component loading vs. global loading indicator
   - Context: Multiple concurrent API requests possible

---

## Phase 1: Data Model & Contracts

See [data-model.md](./data-model.md) for entity details.
See [contracts/](./contracts/) for API type definitions.
See [quickstart.md](./quickstart.md) for development setup.

### Key Entities

1. **Booking** - Core entity (already exists in `types/booking.ts`)
2. **APIResponse<T>** - Generic API envelope with success/error structure
3. **APIError** - Structured error with code and message
4. **PaginationMeta** - Pagination metadata for list operations
5. **BookingFilters** - Query parameters for list/search operations

### API Endpoints Covered

Based on Postman collection (Booking endpoints only):

1. `POST /bookings` - Create booking
2. `GET /bookings/:id` - Get single booking
3. `GET /bookings` - List bookings with filters
4. `PATCH /bookings/:id` - Update booking
5. `DELETE /bookings/:id` - Cancel booking
6. `POST /bookings/:id/resend-email` - Resend confirmation (deferred to Phase 2)

---

## Implementation Phases

### Phase 0: Research (Complete)
- ✅ API client pattern research
- ✅ Authentication strategy
- ✅ Error handling approach
- ✅ State management decision
- ✅ Loading state patterns

### Phase 1: Design & Contracts (Complete)
- ✅ Data model definitions
- ✅ TypeScript API contracts
- ✅ Service layer interfaces
- ✅ Quickstart guide

### Phase 2: Implementation (See tasks.md)
- To be generated by `/speckit.tasks` command
- Will include task breakdown for all user stories
- Email confirmation (User Story 4) deferred to future phase

---

## Notes

- **Email Confirmation**: User Story 4 (Resend Email) is explicitly deferred to next phase per user input
- **Design Consistency**: Existing Tailwind theme colors from Figma designs will be maintained
- **API Base URL**: Will be configured via environment variable (`.env.local`)
- **API Token**: Will be stored in environment variable for development; production strategy TBD
