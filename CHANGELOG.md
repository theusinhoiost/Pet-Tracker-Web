# Changelog

All notable changes to the **PetTracker Web** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Appointment and veterinary visit scheduling.
- Push notifications and automated reminder alerts.
- Advanced pet analytics and exportable medical history reports.

---

## [0.1.0] - 2026-10-27

### Added
- **Legal Documents Page**: Dedicated `/legal` route featuring comprehensive Privacy Policy, Terms of Service, and Cookie Policy.
- **Documentation Showcase**: High-resolution screenshots added to `docs/` covering landing, dashboard, pet profile, add/edit pet forms, notifications, settings, and legal pages.
- **User Avatar Support**: Added user avatar display and upload capabilities with fallback initials in the settings and header navigation.
- **Notification Center**:
  - Interactive slide-out sheet (`NotificationsSheet`) powered by Radix UI.
  - Notification management actions and API integration.
  - Notification cards with read/unread statuses and direct item dismissal.
- **Google OAuth 2.0 Integration**:
  - One-click Google login support on the authentication forms.
  - Dedicated `/auth/google/callback` route for token exchange and profile sync.
  - Cookie management updates for seamless session persistence.
- **Vaccine Management**:
  - Complete vaccination tracking per pet.
  - Server actions for creating, fetching, and deleting pet vaccine records.
  - Interactive `VaccinesTable` component displaying vaccine name, application date, and next dose.
  - Modal dialog (`AddVaccineDialog`) with Zod schema validation.
- **Weight Tracking & Health Charts**:
  - Weight history logging with `AddWeightDialog`.
  - Responsive line chart visualization (`ChartLineDots`) built with Recharts.
- **Pet Management CRUD**:
  - Create pet form with dropzone image upload, breed, species, gender, and birth date picker.
  - Edit pet view with pre-filled inputs and validation.
  - Delete pet functionality with confirmation.
  - Detailed pet overview page (`/dashboard/pet/[id]`).
- **Internationalization (i18n)**:
  - Multi-language support powered by `next-intl`.
  - Locale translation catalogs for English (`en`) and Portuguese (`pt`).
  - Interactive `LanguageSwitcher` component in settings and header.
- **Theming**:
  - Dark and Light mode theme support powered by `next-themes`.
  - `ThemeToggle` button and customizable appearance settings.
- **Security & Route Guarding**:
  - Centralized authentication proxy (`proxy.ts`) safeguarding `/dashboard`, `/pets`, and `/settings`.
  - Environment variable switch (`DISABLE_AUTH_MIDDLEWARE`) for development and testing flexibility.
  - Secure HTTP-only cookie storage for access and refresh tokens.

### Changed
- Standardized access token and refresh token cookie identifiers across the client and server actions.
- Refactored authentication context (`AuthContext`) to include `checkAuth`, user state persistence, and streamlined `logout`.
- Reorganized pet and user server actions into dedicated modular folders (`src/actions/pets`, `src/actions/user`, `src/actions/vaccines`, `src/actions/weight`, `src/actions/notifications`).
- Upgraded project dependencies to Next.js 16, React 19, and Tailwind CSS v4.
- Modernized UI layout with collapsible sidebar, sticky header, and responsive mobile drawers.
- Enhanced form validation and error handling using Zod v4 and React Hook Form.

### Fixed
- Fixed layout alignment and input formatting in `create-pet-form.tsx`.
- Resolved import path and rendering inconsistencies in `PetInfosPage`.
- Enhanced API error handling to provide type-safe error messages in toast notifications.
- Corrected dropzone file constraint validations and translation labels for image uploads.

---

## [0.0.1] - 2026-04-08

### Added
- Initial project scaffolding using Next.js App Router and TypeScript.
- Core design system setup with Tailwind CSS and shadcn/ui component primitives.
- Basic authentication views (`/login` and `/signup`).
- Dashboard shell and pet card component.

