<!--
Sync Impact Report:
- Version: Initial (None → 1.0.0)
- Ratification: 2025-11-11
- Modified Principles: None (initial version)
- Added Sections:
  * Core Principles (5 principles)
  * Quality Standards
  * Development Workflow
  * Governance
- Templates Status:
  ✅ plan-template.md - reviewed, constitution check section aligns
  ✅ spec-template.md - reviewed, requirements structure aligns
  ✅ tasks-template.md - reviewed, task categorization aligns
- Follow-up TODOs: None
-->

# Frontdesk Web App Constitution

## Core Principles

### I. Component-First Architecture

Every feature MUST be built using reusable, composable UI components. Components MUST:

- Be self-contained with clear props interfaces
- Live in the appropriate directory (`components/ui/`, `components/booking/`, etc.)
- Include TypeScript type definitions
- Follow single responsibility principle
- Be independently testable

**Rationale**: Modular components enable faster development, easier maintenance, and consistent user experience across the application.

### II. Type Safety (NON-NEGOTIABLE)

TypeScript strict mode MUST be enabled and enforced. All code MUST:

- Define explicit types for all function parameters and return values
- Use proper interfaces for data structures (Booking, Payment, etc.)
- Avoid `any` type except in justified cases (documented in code comments)
- Leverage type inference only when types are unambiguous

**Rationale**: Type safety catches bugs at compile-time, improves IDE support, and serves as living documentation. This is critical for booking systems where data accuracy directly impacts business operations.

### III. Responsive Design & User Experience

All UI MUST follow mobile-first design principles. Every feature MUST:

- Work correctly on mobile, tablet, and desktop viewports
- Use Tailwind responsive utilities consistently
- Provide clear user feedback for all actions (loading states, success/error messages)
- Handle edge cases gracefully (empty states, error states, loading states)
- Support Thai and English language content

**Rationale**: Front desk staff may access the system from various devices. Clear UX reduces errors in time-sensitive booking operations.

### IV. API-Ready Architecture

Code MUST be structured to accommodate future backend integration. All data operations MUST:

- Use service layer abstractions (prepare for REST/GraphQL clients)
- Separate data fetching logic from UI components
- Include error handling for network operations
- Support loading and error states in UI
- Use consistent data models matching planned backend schemas

**Rationale**: The application currently uses mock data but will integrate with ThaiStar API, Omise payment gateway, and email services. Early architectural decisions prevent costly refactoring.

### V. Data Integrity & Validation

All user inputs and data transformations MUST be validated. Validation MUST:

- Happen at form submission (client-side)
- Include clear error messages in appropriate language (Thai/English)
- Cover edge cases (date/time formats, phone numbers, email addresses, flight numbers)
- Prevent invalid states (e.g., pickup time before current time)

**Rationale**: Booking data errors cascade into operational failures. Validation is the first line of defense against data quality issues.

## Quality Standards

### Testing

- **Unit Tests**: Optional for pure utility functions and complex business logic
- **Integration Tests**: Recommended for critical user flows (create booking, payment confirmation)
- **Manual Testing**: REQUIRED before merging any UI changes - test all viewports and states

### Accessibility

- Semantic HTML MUST be used (proper heading hierarchy, buttons vs links)
- Forms MUST have proper labels and ARIA attributes where needed
- Color contrast MUST meet WCAG AA standards
- Keyboard navigation MUST work for all interactive elements

### Performance

- Bundle size MUST be monitored (avoid unnecessary dependencies)
- Images MUST be optimized (use Next.js Image component)
- Long lists MUST use virtualization if displaying >100 items
- Actions MUST respond within 100ms (provide immediate feedback)

## Development Workflow

### Code Review Requirements

All pull requests MUST:

1. Include clear description of changes and rationale
2. Reference related issues or specifications
3. Pass linting (`npm run lint`)
4. Build successfully (`npm run build`)
5. Be reviewed by at least one team member before merge

### Branch Strategy

- `main` branch contains production-ready code
- `develop` branch for integration and testing
- Feature branches follow pattern: `###-feature-name` (where ### is feature number)
- Hotfix branches follow pattern: `hotfix-description`

### Commit Messages

Commits SHOULD follow conventional commit format:

- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for code refactoring
- `docs:` for documentation changes
- `style:` for formatting changes
- `test:` for adding tests
- `chore:` for maintenance tasks

## Governance

This constitution governs all development activities for the Frontdesk Web App. All team members MUST adhere to these principles.

### Amendment Process

Constitution amendments MUST:

1. Be proposed with clear rationale
2. Be reviewed by the development team
3. Include migration plan if affecting existing code
4. Update version according to semantic versioning

### Versioning Policy

- **MAJOR** version: Backward incompatible principle changes (e.g., removing a core principle)
- **MINOR** version: New principles added or significant expansions
- **PATCH** version: Clarifications, wording improvements, non-semantic changes

### Compliance

- All code reviews MUST verify compliance with constitution principles
- Feature specifications MUST reference relevant principles
- Implementation plans MUST include constitution check gates
- Violations MUST be justified in writing (Complexity Tracking table)

**Version**: 1.0.0 | **Ratified**: 2025-11-11 | **Last Amended**: 2025-11-11
