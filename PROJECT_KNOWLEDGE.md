# Hongmove Frontdesk Application - Project Knowledge

**Version**: 0.1.0
**Status**: Active Development
**Last Updated**: 2025-11-12

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Features](#core-features)
5. [Data Models](#data-models)
6. [API Integration](#api-integration)
7. [Setup & Development](#setup--development)
8. [Configuration](#configuration)
9. [Key Components](#key-components)
10. [Development Workflow](#development-workflow)
11. [Performance Targets](#performance-targets)

---

## Project Overview

### Purpose
Hongmove Frontdesk is a web-based booking management system for transportation services. It provides frontdesk staff with tools to manage customer bookings, track vehicle assignments, and coordinate with drivers.

### Target Users
- Frontdesk staff managing transportation bookings
- Administrative staff monitoring operations
- Customer service team handling confirmations

### Primary Goals
- Streamline booking creation and management
- Provide real-time visibility into job status
- Integrate payment tracking via Omise
- Automate email confirmations
- Support filtering and search for historical data

---

## Technology Stack

### Frontend Framework
- **Next.js 16.0.1** with App Router
- **React 19.2.0** with TypeScript 5.x
- Server and client components architecture

### Styling
- **Tailwind CSS 4.x** - Utility-first CSS framework
- Custom theme: Primary color `#5c0000` (Hongmove red)
- Responsive design (mobile, tablet, desktop)

### UI Libraries
- **Lucide React 0.552.0** - Icon library
- Custom component library in `components/ui/`

### Utilities
- **date-fns 4.1.0** - Date formatting and manipulation
- TypeScript for type safety

### Development Tools
- ESLint 9 for code quality
- Node.js 20+ required

---

## Project Structure

```
hong-move-fe-desk/
├── app/                              # Next.js App Router
│   ├── page.tsx                      # Login page (root)
│   ├── layout.tsx                    # Root layout with metadata
│   └── dashboard/
│       └── page.tsx                  # Dashboard with KPIs
│
├── components/                       # React components
│   ├── ui/                          # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Modal.tsx
│   ├── booking/
│   │   └── BookingForm.tsx          # Create/edit bookings
│   ├── dashboard/
│   │   ├── SearchFilter.tsx         # Advanced filtering
│   │   └── BookingTable.tsx         # Booking list display
│   ├── email/
│   │   └── EmailConfirmation.tsx    # Resend emails
│   └── payment/
│       └── PaymentView.tsx          # Payment details
│
├── types/
│   └── booking.ts                   # TypeScript interfaces
│
├── data/
│   └── mockBookings.ts              # Mock data (6 samples)
│
├── specs/                           # Feature specifications
│   └── 001-hongmove-api-integration/
│       ├── spec.md                  # Requirements
│       ├── plan.md                  # Implementation plan
│       ├── quickstart.md            # Dev setup guide
│       ├── data-model.md            # Entity definitions
│       ├── research.md              # Technical decisions
│       ├── tasks.md                 # Task breakdown
│       ├── contracts/
│       │   └── booking-api.ts       # API contracts
│       └── checklists/
│           └── requirements.md      # Feature checklist
│
├── public/
│   └── hongmove-logo.png           # Brand assets
│
├── CLAUDE.md                        # Development guidelines
├── README.md                        # Thai language docs
└── package.json                     # Dependencies
```

---

## Core Features

### 1. Authentication & Login
**Location**: `app/page.tsx`
- Thai language interface
- Username/password authentication
- Hongmove branding with logo
- Responsive layout

### 2. Dashboard Overview
**Location**: `app/dashboard/page.tsx`

**Key Performance Indicators**:
- Total system users: 120
- Available vehicles: 199
- Round revenue: 5,000 THB
- Completed jobs: 9
- Pending jobs: 20
- In-progress trips: 1

**Quick Actions**:
- Add vehicle
- Add driver
- Create new booking

**Timeline View**:
- Today's schedule with time-stamped tasks
- Color-coded status indicators
- Real-time job tracking

**System Monitoring**:
- Email confirmation system status
- Trip backup status
- LINE OA notification status

### 3. Booking Management

**Create/Edit Bookings** (`components/booking/BookingForm.tsx`):
- Passenger information (name, phone, email)
- Flight details (flight number)
- Pickup and dropoff locations
- Travel date and time selection
- Optional notes field
- Form validation

**Search & Filter** (`components/dashboard/SearchFilter.tsx`):
- Date range filtering (from/to)
- Booking number search
- Passenger name search
- Flight number search
- Payment status filter (Paid/Unpaid)
- Job status filter (Pending, Confirmed, In Progress, Completed, Cancelled)

**Booking List** (`components/dashboard/BookingTable.tsx`):
- Tabular display of bookings
- Sortable columns
- Status badges
- Action buttons (view, edit, cancel)

### 4. Additional Features
- **Email Confirmations**: Resend confirmation emails to passengers
- **Payment Tracking**: View Omise charge IDs and payment status
- **Responsive Design**: Works on mobile, tablet, and desktop

---

## Data Models

### Booking Interface
**Location**: `types/booking.ts`

```typescript
interface Booking {
  // Identifiers
  id: string;                      // UUID
  bookingNumber: string;           // e.g., BK20241101001

  // Passenger Details
  passengerName: string;
  phone: string;
  email: string;

  // Trip Details
  flightNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  travelDateTime: Date | string;   // ISO 8601 with timezone

  // Timestamps
  createdAt: Date | string;
  updatedAt: Date | string;

  // Status & Payment
  paymentStatus: 'paid' | 'unpaid';
  jobStatus: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

  // Optional Fields
  finalMeterPrice?: number;        // ThaiStar meter reading
  omiseChargeId?: string;          // Payment reference
  note?: string;
  emailSentAt?: Date | string;
}
```

### Status Enums

**Payment Status**:
- `paid` - Payment confirmed
- `unpaid` - Payment pending

**Job Status**:
- `pending` - Awaiting confirmation
- `confirmed` - Booking confirmed
- `in_progress` - Trip in progress
- `completed` - Trip completed
- `cancelled` - Booking cancelled

---

## API Integration

### Current Status
**Active Feature Branch**: `001-hongmove-api-integration`

Currently using **mock data** (`data/mockBookings.ts`). API integration is in development.

### API Contract Types
**Location**: `specs/001-hongmove-api-integration/contracts/booking-api.ts`

### Planned Endpoints

| Method | Endpoint | Purpose | Priority |
|--------|----------|---------|----------|
| POST | `/bookings` | Create new booking | P1 |
| GET | `/bookings/:id` | Retrieve single booking | P1 |
| GET | `/bookings` | List with filters & pagination | P2 |
| PATCH | `/bookings/:id` | Update booking | P3 |
| POST | `/bookings/:id/resend-email` | Resend confirmation | P4 |
| DELETE | `/bookings/:id` | Cancel booking | P5 |

### API Response Format
```typescript
// Success
{
  success: true;
  data: T;
}

// Error
{
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

### Error Codes
- `VALIDATION_ERROR` - Invalid request data
- `UNAUTHORIZED` - Authentication failed
- `BOOKING_NOT_FOUND` - Booking ID not found
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error
- `SERVICE_UNAVAILABLE` - Service down

### Authentication
- Token-based authentication via headers
- Environment variable: `NEXT_PUBLIC_HONGMOVE_API_TOKEN`

---

## Setup & Development

### Prerequisites
- **Node.js**: 20+ required
- **npm**: Package manager
- **Git**: Version control

### Installation

```bash
# Clone repository
git clone <repository-url>
cd hong-move-fe-desk

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### Development Server
- Access at: `http://localhost:3000`
- Hot reload enabled
- Default port: 3000

### Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm test             # Run tests (if configured)
npm test && npm run lint  # Run tests and linting
```

---

## Configuration

### Environment Variables
**File**: `.env.local` (not committed to git)

```env
# API Configuration
NEXT_PUBLIC_HONGMOVE_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_HONGMOVE_API_TOKEN=your-agent-token-here
NEXT_PUBLIC_API_TIMEOUT=30000
```

### TypeScript Configuration
**File**: `tsconfig.json`

- **Target**: ES2017
- **Module Resolution**: bundler
- **Strict Mode**: Enabled
- **Path Alias**: `@/*` maps to project root
- **JSX**: react-jsx

### Next.js Metadata
**Location**: `app/layout.tsx`

- **Title**: "Hongmove Booking Dashboard"
- **Description**: "Frontdesk interface for managing Hongmove transportation bookings"
- **Viewport**: Responsive width configuration

### Tailwind Configuration
- **Content Paths**: `app/**/*.tsx`, `components/**/*.tsx`
- **Custom Colors**: Hongmove red (#5c0000)
- **Responsive Breakpoints**: sm, md, lg, xl

---

## Key Components

### UI Components (`components/ui/`)

#### Button
**Props**: `variant`, `size`, `disabled`, `onClick`, `children`
- Variants: primary, secondary, outline
- Sizes: sm, md, lg
- Hover and focus states

#### Input
**Props**: `type`, `placeholder`, `value`, `onChange`, `error`
- Text, email, tel, date, datetime-local types
- Error state styling
- Accessible labels

#### Card
**Props**: `title`, `children`, `footer`
- Consistent spacing
- Shadow and border
- Optional header and footer sections

#### Badge
**Props**: `variant`, `children`
- Status indicators (success, warning, danger, info)
- Color-coded by variant

#### Modal
**Props**: `isOpen`, `onClose`, `title`, `children`
- Backdrop overlay
- Close button and ESC key support
- Focus trap

### Feature Components

#### BookingForm (`components/booking/BookingForm.tsx`)
- Form state management
- Validation logic
- Date/time pickers
- Submit and cancel actions

#### SearchFilter (`components/dashboard/SearchFilter.tsx`)
- Multiple filter inputs
- Date range selection
- Status dropdown selects
- Clear filters action

#### BookingTable (`components/dashboard/BookingTable.tsx`)
- Responsive table layout
- Status badges
- Action buttons (view, edit, cancel)
- Empty state handling

#### EmailConfirmation (`components/email/EmailConfirmation.tsx`)
- Resend email button
- Confirmation status display
- Error handling

#### PaymentView (`components/payment/PaymentView.tsx`)
- Payment status display
- Omise charge ID
- Final meter price
- Payment date/time

---

## Development Workflow

### Git Workflow

**Main Branch**: `main` (or `master`)
**Feature Branches**: Prefix with descriptive name (e.g., `001-hongmove-api-integration`)

**Process**:
1. Create feature branch from main
2. Develop and test locally
3. Commit with clear messages
4. Push to remote: `git push -u origin <branch-name>`
5. Create pull request for review
6. Merge after approval

### Code Style

**TypeScript**:
- Use TypeScript for all `.tsx` and `.ts` files
- Define interfaces for all data structures
- Use type annotations for function parameters
- Enable strict mode

**React**:
- Use functional components with hooks
- Follow Next.js App Router conventions
- Separate server and client components
- Use `"use client"` directive when needed

**Formatting**:
- Follow standard TypeScript/React conventions
- Use ESLint for code quality
- Consistent naming: camelCase for variables, PascalCase for components

### Testing Strategy

**Manual Testing**:
- Test all user flows in development
- Verify responsive design across devices
- Check error handling scenarios

**Automated Testing** (planned):
- Unit tests for components
- Integration tests for API calls
- E2E tests for critical flows

---

## Performance Targets

### Response Time Goals
- **Booking creation**: < 3 seconds
- **Booking list load**: < 2 seconds
- **Search/filter results**: < 2 seconds
- **Booking updates**: < 2 seconds
- **Email resend**: < 5 seconds
- **Error messages**: < 1 second

### Scalability
- Support 100+ bookings without performance degradation
- Handle concurrent users efficiently
- Optimize bundle size for fast page loads

### Data Integrity
- 100% field mapping between frontend and API
- Validation on client and server side
- Consistent date/time handling (ISO 8601 with timezone)

---

## Mock Data Reference

**Location**: `data/mockBookings.ts`

Contains 6 sample bookings with:
- Mix of Thai and English names
- Various job statuses (completed, in_progress, confirmed, pending)
- Different payment statuses (paid, unpaid)
- Real Bangkok locations:
  - Suvarnabhumi Airport (BKK)
  - Don Muang Airport (DMK)
  - Hotels (Mandarin Oriental, Shangri-La)
  - Shopping centers (Siam Paragon, Central World)
- Realistic timestamps and pricing

**Usage**: Temporary data for UI development. Will be replaced with API calls.

---

## Documentation Reference

### Specification Files
**Location**: `specs/001-hongmove-api-integration/`

1. **spec.md** (156 lines): Feature requirements with 5 user stories
2. **data-model.md** (386 lines): Complete entity definitions and validation
3. **quickstart.md** (387 lines): Developer setup guide with examples
4. **research.md** (297 lines): Technical decisions and patterns
5. **plan.md** (232 lines): Implementation plan by phase
6. **tasks.md** (260 lines): Detailed task breakdown

### README Files
- **README.md**: Thai language documentation with overview and setup
- **CLAUDE.md**: Development guidelines and code style

---

## Language Support

### User Interface
- **Primary Language**: Thai
- Login page welcome message in Thai
- Dashboard labels and buttons in Thai
- Error messages in Thai/English

### Code & Documentation
- **Code**: English (variables, functions, comments)
- **README**: Thai
- **Technical Docs**: English
- **Specifications**: English

---

## Implementation Phases

### Phase 1: Service Layer Foundation (In Progress)
- API client setup with authentication
- Error handling middleware
- Booking service CRUD operations
- Type safety for API contracts

### Phase 2: Component Integration (Planned)
- Connect BookingForm to API
- Load BookingTable from API
- Implement SearchFilter with API parameters
- Update Dashboard with real-time data

### Phase 3: Testing & Refinement (Planned)
- Manual testing scenarios
- Error handling edge cases
- Performance optimization
- Cross-browser testing
- Responsiveness verification

---

## Known Dependencies

### Runtime Dependencies
```json
{
  "next": "16.0.1",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "date-fns": "^4.1.0",
  "lucide-react": "^0.552.0",
  "@tailwindcss/postcss": "^4"
}
```

### Development Dependencies
```json
{
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.0.1"
}
```

---

## Success Criteria

### Functional Requirements
✅ Frontdesk can create bookings via form
✅ View booking list with search/filter
✅ Display booking details and status
✅ Resend email confirmations
✅ View payment information
🔄 API integration (in progress)
⏳ Real-time updates (planned)
⏳ Automated testing (planned)

### Non-Functional Requirements
- Performance meets targets (see Performance Targets)
- Mobile-responsive design
- Accessible UI components
- Secure authentication
- Error handling with user-friendly messages

---

## Contact & Resources

### Repository
- **URL**: [Repository URL]
- **Branch**: `claude/create-project-knowledge-doc-011CV3NsqzKDB3et2PMDTKwV`

### External Services
- **Payment**: Omise payment gateway
- **Notifications**: LINE OA integration (planned)
- **Email**: Confirmation email system

---

## Changelog

### 2025-11-12
- Created comprehensive project knowledge document

### 2025-11-11
- Updated CLAUDE.md with active technologies
- Added feature plan for 001-hongmove-api-integration

### Recent Commits
- `732bbcc` - Merge pull request #2 for API integration
- `4a543a2` - Add Hongmove Booking API documentation and tasks
- `847b5d7` - Merge pull request #1 for develop
- `75414de` - Add dashboard page and logo image
- `1f56ff7` - Create login page from Figma design

---

**Document End**

*For detailed technical specifications, refer to the `specs/` directory.*
*For setup instructions, see `README.md` and `specs/001-hongmove-api-integration/quickstart.md`.*
