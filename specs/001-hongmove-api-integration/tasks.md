# Tasks: Hongmove Booking API Integration

**Input**: Design documents from `/specs/001-hongmove-api-integration/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Tests are NOT explicitly requested in the specification. Test tasks are excluded per template guidelines.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is a Next.js 16 App Router web application with the following structure:
- `app/` - Next.js App Router pages
- `components/` - React components
- `lib/` - Utilities and services
- `types/` - TypeScript type definitions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create environment configuration file `.env.local` with NEXT_PUBLIC_HONGMOVE_API_BASE_URL and NEXT_PUBLIC_HONGMOVE_API_TOKEN
- [ ] T002 [P] Create API types file `types/api.ts` by copying contracts from `specs/001-hongmove-api-integration/contracts/booking-api.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 [P] Create base API client in `lib/services/apiClient.ts` with fetch wrapper, auth headers, and error handling
- [ ] T004 [P] Create error handler utility in `lib/services/errorHandler.ts` with Thai/English error message mapping
- [ ] T005 [P] Create data transformation utilities in `lib/services/transformers.ts` for snake_case ↔ camelCase conversion

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create and Retrieve Bookings (Priority: P1) 🎯 MVP

**Goal**: Frontdesk staff can create new bookings through the Hongmove API and immediately see the booking appear in the system with all details correctly stored and displayed.

**Independent Test**: Create a booking through the form, verify it appears in the API response, and confirm all entered data is accurately displayed in the booking list.

### Implementation for User Story 1

- [ ] T006 [US1] Implement booking service CRUD functions in `lib/services/bookingService.ts` (createBooking, getBooking functions only)
- [ ] T007 [US1] Update BookingForm component in `components/booking/BookingForm.tsx` to call API service on submit with loading states and error handling
- [ ] T008 [US1] Add success/error feedback UI to BookingForm in `components/booking/BookingForm.tsx` with Thai/English messages
- [ ] T009 [US1] Update BookingTable component in `components/dashboard/BookingTable.tsx` to display API data with loading skeleton
- [ ] T010 [US1] Update Dashboard page in `app/dashboard/page.tsx` to fetch bookings from API service and manage state

**Checkpoint**: At this point, User Story 1 should be fully functional - staff can create bookings and see them in the list

---

## Phase 4: User Story 2 - Search and Filter Bookings (Priority: P2)

**Goal**: Frontdesk staff can search and filter bookings from the API by date range, booking number, passenger name, flight number, and payment status to quickly find specific bookings.

**Independent Test**: Create multiple bookings with different attributes, then use various filter combinations to verify correct results are returned from the API.

### Implementation for User Story 2

- [ ] T011 [US2] Add listBookings function to booking service in `lib/services/bookingService.ts` with filter parameter support
- [ ] T012 [US2] Update SearchFilter component in `components/dashboard/SearchFilter.tsx` to sync with URL search params using useSearchParams hook
- [ ] T013 [US2] Update Dashboard page in `app/dashboard/page.tsx` to read URL params and pass filters to listBookings API call
- [ ] T014 [US2] Add filter state management in `app/dashboard/page.tsx` to trigger API refetch when filters change
- [ ] T015 [US2] Add pagination support in `components/dashboard/BookingTable.tsx` to display pagination metadata from API

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - staff can create bookings AND filter/search them

---

## Phase 5: User Story 3 - Update Booking Details (Priority: P3)

**Goal**: Frontdesk staff can update booking information (passenger details, pickup time, locations, notes) through the API when customers request changes.

**Independent Test**: Create a booking, modify various fields through the edit interface, and verify the API update succeeds and new data persists.

### Implementation for User Story 3

- [ ] T016 [P] [US3] Add updateBooking function to booking service in `lib/services/bookingService.ts`
- [ ] T017 [P] [US3] Create BookingEditModal component in `components/booking/BookingEditModal.tsx` with form pre-populated from booking data
- [ ] T018 [US3] Add edit button and modal trigger to BookingTable in `components/dashboard/BookingTable.tsx`
- [ ] T019 [US3] Implement edit form submission in BookingEditModal with API call, loading states, and error handling
- [ ] T020 [US3] Update Dashboard page to refetch bookings after successful update in `app/dashboard/page.tsx`

**Checkpoint**: User Stories 1, 2, AND 3 should all work independently - create, filter, and update bookings

---

## Phase 6: User Story 5 - Cancel Bookings (Priority: P5)

**Goal**: Frontdesk staff can cancel bookings through the API when customers request cancellation, with an optional cancellation reason.

**Independent Test**: Create a booking, cancel it with a reason, and verify the booking status changes to "canceled" via the API.

**Note**: User Story 4 (Resend Email) is explicitly deferred to a future phase per plan.md

### Implementation for User Story 5

- [ ] T021 [P] [US5] Add cancelBooking function to booking service in `lib/services/bookingService.ts`
- [ ] T022 [P] [US5] Create CancelBookingModal component in `components/booking/CancelBookingModal.tsx` with optional reason input
- [ ] T023 [US5] Add cancel button and modal trigger to BookingTable in `components/dashboard/BookingTable.tsx`
- [ ] T024 [US5] Implement cancel confirmation and API call in CancelBookingModal with loading states and error handling
- [ ] T025 [US5] Update Dashboard page to refetch bookings after successful cancellation in `app/dashboard/page.tsx`

**Checkpoint**: All implemented user stories (US1, US2, US3, US5) should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T026 [P] Add timezone handling utilities in `lib/utils/timezone.ts` for Asia/Bangkok timezone formatting
- [ ] T027 [P] Add loading states for all API operations with consistent UI feedback in all components
- [ ] T028 [P] Implement optimistic UI updates for create/update operations in Dashboard page
- [ ] T029 Add error boundary handling for network failures across all API calls
- [ ] T030 [P] Add accessibility improvements to loading states and error messages (ARIA labels, screen reader announcements)
- [ ] T031 Verify responsive design on mobile, tablet, and desktop viewports per constitution requirements
- [ ] T032 [P] Add rate limiting error handling (429 responses) with retry-after display in error handler
- [ ] T033 Performance validation: verify API response rendering < 2 seconds, list operations < 2 seconds, form submissions < 3 seconds
- [ ] T034 Run quickstart.md validation steps to ensure all setup instructions are accurate

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (US1 → US2 → US3 → US5)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1 but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Uses US1's list view but independently testable
- **User Story 5 (P5)**: Can start after Foundational (Phase 2) - Uses US1's list view but independently testable

**Deferred**: User Story 4 (Resend Email - P4) is explicitly excluded from this implementation phase

### Within Each User Story

- Service functions before component integration
- Form/modal components before table integration
- Core implementation before error handling polish
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: Both tasks (T001, T002) can run in parallel
- **Phase 2**: All three foundational tasks (T003, T004, T005) can run in parallel
- **Once Foundational completes**: All user stories can start in parallel (if team capacity allows)
- **Phase 3 (US1)**: Tasks are sequential (service → form → table → page)
- **Phase 4 (US2)**: Tasks are sequential (service → filter → page → table)
- **Phase 5 (US3)**: T016 and T017 can run in parallel (service + modal component)
- **Phase 6 (US5)**: T021 and T022 can run in parallel (service + modal component)
- **Phase 7**: Most polish tasks can run in parallel

---

## Parallel Example: Foundational Phase

```bash
# Launch all foundational infrastructure tasks together:
Task: "Create base API client in lib/services/apiClient.ts"
Task: "Create error handler utility in lib/services/errorHandler.ts"
Task: "Create data transformation utilities in lib/services/transformers.ts"
```

## Parallel Example: User Story 3

```bash
# Launch service and modal component together:
Task: "Add updateBooking function to booking service"
Task: "Create BookingEditModal component"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T005) - CRITICAL
3. Complete Phase 3: User Story 1 (T006-T010)
4. **STOP and VALIDATE**: Test booking creation and display independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (T001-T005)
2. Add User Story 1 → Test independently → Deploy/Demo (T006-T010) **MVP!**
3. Add User Story 2 → Test independently → Deploy/Demo (T011-T015)
4. Add User Story 3 → Test independently → Deploy/Demo (T016-T020)
5. Add User Story 5 → Test independently → Deploy/Demo (T021-T025)
6. Add Polish → Final release (T026-T034)
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T005)
2. Once Foundational is done:
   - Developer A: User Story 1 (T006-T010)
   - Developer B: User Story 2 (T011-T015)
   - Developer C: User Story 3 (T016-T020)
3. Stories complete and integrate independently
4. User Story 5 can be done by any available developer (T021-T025)

---

## Task Count Summary

- **Phase 1 (Setup)**: 2 tasks
- **Phase 2 (Foundational)**: 3 tasks (BLOCKS all user stories)
- **Phase 3 (US1 - Create/Retrieve)**: 5 tasks → MVP
- **Phase 4 (US2 - Search/Filter)**: 5 tasks
- **Phase 5 (US3 - Update)**: 5 tasks
- **Phase 6 (US5 - Cancel)**: 5 tasks
- **Phase 7 (Polish)**: 9 tasks

**Total**: 34 tasks

**Parallel Opportunities**: 13 tasks marked [P] can run in parallel with other tasks

**Critical Path**: Setup → Foundational → US1 (MVP) = 10 tasks minimum for first deployable version

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- User Story 4 (P4 - Resend Email) explicitly deferred to future phase
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All datetime handling must include Asia/Bangkok timezone per data-model.md
- All API requests require Bearer token authentication per research.md
- Field name transformation (camelCase ↔ snake_case) handled in service layer per plan.md
