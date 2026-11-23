# Product Requirements Document

## Udaan Vocational & Empowerment Academy

| Field | Value |
|---|---|
| Status | Draft; synthesized from the current repository |
| Version | 0.1 |
| Date | 23 November 2026 |
| Product | Udaan Vocational & Empowerment Academy |
| Primary application | `vocational-transition-academy/` |

> This document records the product direction evident in the application and distinguishes implemented functionality from incomplete or proposed functionality. Academy stakeholders must approve program content, eligibility rules, and operational policies before those items are treated as final requirements.

## 1. Product summary

Udaan is a vocational training and employment-transition service. Its intended audience includes trainees, their parents or guardians, employers and partner organizations, and academy staff. The product is intended to make academy programs understandable and accessible, support role-appropriate accounts, and ultimately connect training with employment opportunities.

The current application is an early foundation:

- A bilingual public website (English and Hindi) introduces the academy and its four proposed training tracks.
- Users can register or sign in through role-specific portals.
- Employer accounts require academy approval before sign-in.
- Authenticated users can reach a role-specific dashboard shell.
- The opportunity-search page is currently a non-submitting UI preview; no job search API or job data service is implemented.
- Most informational pages and all dashboard workflows beyond their empty states still need approved content and product implementation.

## 2. Problem and opportunity

People seeking vocational training and employment, their families, employers, and academy staff need a shared place to understand available programs and coordinate the transition from training to work. A single accessible product can provide a clearer entry point for each audience while preserving appropriate access boundaries between trainees, families, partners, and staff.

The project has not yet established quantified baseline data about user needs, service outcomes, or adoption. Those baselines should be collected before setting numerical success targets.

## 3. Product goals

1. Make academy information and entry points easy to find for trainees, families, employers, and staff.
2. Provide a usable English/Hindi experience across public and account flows.
3. Give each user an account and experience appropriate to their role.
4. Establish a secure foundation for academy-approved training and employment-transition workflows.
5. Make the eventual opportunity-discovery experience transparent about how sensitive search inputs are handled.

### Success measures to establish

The product currently has no analytics or agreed targets. Confirm baselines and targets with academy stakeholders for:

- Public-to-enquiry and public-to-registration completion.
- Registration approval and sign-in completion by portal.
- Trainee engagement with program information and opportunities.
- Employer/partner activation and opportunity participation.
- User-reported accessibility and language usability.
- Successful transitions from training into employment, if the academy can measure this consistently and with appropriate consent.

## 4. Users and roles

| User | Product need | Current account behavior |
|---|---|---|
| Trainee | Understand training options and, ultimately, find suitable opportunities and follow their training journey. | Public self-registration; account is active immediately. |
| Parent or guardian | Understand the academy and, subject to trainee consent and academy policy, stay informed about a trainee. | Public self-registration; account is active immediately. |
| Employer or partner | Learn how to work with the academy and access relevant partnership or opportunity workflows. | Public self-registration; account is pending academy approval. The partner sign-in portal maps to the `employer` role. |
| Trainer | Access academy tools for assigned training responsibilities. | Staff portal sign-in; account is created by academy staff. |
| Administrator | Manage academy operations and access administrative tools. | Staff portal sign-in; account is created by academy staff. |

Public registration must not allow a user to create an administrator or trainer account. A staff-account seed utility exists for initial admin/trainer setup.

## 5. Scope and release framing

### Current foundation (implemented or partially implemented)

- Public home page, navigation, responsive layout, and academy video.
- Public route placeholders for programs, about, parents, employers, enquiry, contact, privacy, and accessibility.
- English and Hindi translations, language switching, and saved language preference.
- Role chooser, login, supported self-registration, validation feedback, and password visibility control.
- Cookie-based access/refresh sessions, session refresh, logout, and authenticated-user restoration.
- Protected dashboard route with role-specific welcome and placeholder state.
- UI preview of opportunity search filters.
- Health endpoint and versioned API foundation.

### Next product capabilities (not currently implemented)

These are proposed requirements inferred from the current routes, labels, roles, and UI. They require stakeholder confirmation and are not represented as delivered features:

1. Replace informational placeholders with academy-approved program, audience, contact, enquiry, privacy, and accessibility content.
2. Define and implement training workflows, including which program information, enrollment steps, and trainee progress are supported.
3. Define job/opportunity records, search behavior, result presentation, and a real search service behind the current preview.
4. Define employer and academy staff workflows for partner review/approval and opportunity participation.
5. Define parent access and consent rules before showing any trainee-specific information.
6. Replace dashboard empty states with role-specific, permission-checked functionality.

### Not defined by the current product baseline

The repository does not establish requirements for payments, certifications, messaging, attendance, course authoring, mobile applications, or integrations with external employment systems. Do not commit to these without a separate product decision.

## 6. Functional requirements

Status values: **Implemented** means present in the current code; **Partial** means the UI or foundation exists but the full workflow does not; **Proposed** means a future requirement requiring confirmation.

### 6.1 Public experience

| ID | Requirement | Priority | Status |
|---|---|---:|---|
| PUB-01 | A visitor can access the home page and navigate to program, academy, parent, employer, contact, enquiry, privacy, and accessibility routes. | P0 | Partial: routes exist, most content is placeholder text. |
| PUB-02 | The home page introduces job-readiness training in data entry, packaging, animal care, and retail operations. | P0 | Partial: tracks are displayed, but details are pending academy approval. |
| PUB-03 | A visitor can select English or Hindi; the selection is retained for later visits. | P0 | Implemented. |
| PUB-04 | Public pages are responsive and support keyboard navigation, visible focus, and a skip-to-content link. | P0 | Partially implemented; verify every page and interaction before release. |
| PUB-05 | Academy-approved content is available for all public information routes, including verified contact and enquiry instructions. | P0 | Proposed; content is not yet present. |
| PUB-06 | The academy video provides a play/pause control and honors reduced-motion preferences for autoplay. Captions are supported when an approved caption file is supplied. | P1 | Partially implemented; captions are currently not configured. |

### 6.2 Accounts and authentication

| ID | Requirement | Priority | Status |
|---|---|---:|---|
| AUTH-01 | A visitor can choose a trainee, parent, partner, or staff sign-in portal. | P0 | Implemented. |
| AUTH-02 | A trainee or parent can register with name, email, password, and language. | P0 | Implemented. |
| AUTH-03 | An employer/partner can register with name, email, password, organization name, and language. | P0 | Implemented; account remains pending approval. |
| AUTH-04 | Public registration cannot create admin or trainer accounts. | P0 | Implemented. |
| AUTH-05 | A user can sign in only through a portal authorized for their account role. | P0 | Implemented. |
| AUTH-06 | Pending or disabled accounts cannot sign in. | P0 | Implemented. |
| AUTH-07 | Authenticated sessions can be restored, refreshed, and ended; authentication cookies are HTTP-only and secure in production. | P0 | Implemented. |
| AUTH-08 | Validation and authentication failures are presented accessibly and do not reveal whether an email address exists during login. | P0 | Implemented in the API/UI foundation; verify end-to-end before release. |
| AUTH-09 | Academy staff can review pending employer accounts and record approval or rejection. | P0 | Proposed; no approval endpoint or staff UI is currently present. |

### 6.3 Role-specific experiences

| ID | Requirement | Priority | Status |
|---|---|---:|---|
| ROLE-01 | Unauthenticated users cannot access protected dashboards. | P0 | Implemented. |
| ROLE-02 | An authenticated user is redirected to the dashboard for their own role. | P0 | Implemented. |
| ROLE-03 | Trainee and parent views respect academy policy and any required trainee consent. | P0 | Proposed; dashboards currently show only role-specific empty states. |
| ROLE-04 | Trainer and administrator workflows are defined and implemented with server-side authorization. | P1 | Proposed; dashboard tools are not implemented. |
| ROLE-05 | Employer/partner views expose only approved, role-appropriate information and actions. | P1 | Proposed; no partner dashboard workflow is implemented. |

### 6.4 Training and opportunities

| ID | Requirement | Priority | Status |
|---|---|---:|---|
| PROG-01 | Visitors can review academy-approved descriptions, eligibility, and enquiry steps for each active training track. | P0 | Proposed; only track names and pending copy exist. |
| PROG-02 | The academy approves all program descriptions and eligibility rules before publication. | P0 | Operational dependency. |
| JOB-01 | Trainees can search approved opportunities using academy-approved filters and see useful results or an empty state. | P1 | Partial: a UI-only filter preview exists; it does not submit or retrieve results. |
| JOB-02 | The opportunity service validates filters and returns only opportunities the user is permitted to see. | P1 | Proposed; no job API or job data model exists. |
| JOB-03 | The academy approves the disability, location, and qualification filter options before they are used for real search. | P0 | Operational dependency; current options are placeholders. |
| JOB-04 | The product explains whether search inputs are stored, shared, or used to personalize results before collecting them. | P0 | Proposed; the preview currently says its selections are not saved or shared. Preserve that statement unless the behavior changes and users receive updated notice. |

### 6.5 Enquiry and communications

| ID | Requirement | Priority | Status |
|---|---|---:|---|
| COM-01 | Visitors can find verified academy contact details and submit an enquiry through an academy-approved channel. | P0 | Proposed; no enquiry workflow or verified contact details are implemented. |
| COM-02 | The product provides a defined support route for account or access issues. | P1 | Proposed; support ownership and contact details are not defined. |

## 7. Core journeys

### Trainee or parent registration

1. Visitor opens the login chooser and selects the relevant portal.
2. Visitor follows the create-account link and enters the required fields.
3. API validates input, creates the user, and returns an authenticated session for trainee/parent accounts.
4. User lands on the dashboard for their role.

### Employer/partner registration

1. Visitor selects the partner portal and creates an account, including organization name.
2. API creates the account with pending status and does not issue a sign-in session.
3. User sees a pending-approval message.
4. Future: academy staff review the request; approval/rejection policy and notifications remain to be defined.

### Sign-in and protected access

1. User selects the correct portal and submits email/password.
2. API validates credentials, status, and portal-to-role mapping.
3. On success, the session is established and user reaches their own dashboard.
4. On expiry, the client attempts one shared refresh for concurrent requests; if refresh fails, protected actions require sign-in again.

### Opportunity search

1. Current: visitor can inspect disability, location, and qualification filter controls, but search is disabled and no results are returned.
2. Future: only after filter definitions, data policy, and search behavior are approved, implement the search service and result flow.

## 8. Product and technical constraints

### Current architecture

- **Client:** React, React Router, Vite, Tailwind CSS, i18next/react-i18next.
- **API:** Node.js, Express, Zod validation, JSON API under `/api/v1`.
- **Data:** MongoDB via Mongoose.
- **Authentication:** bcrypt password hashes; signed JWT access and refresh tokens in HTTP-only cookies; refresh token hash stored on the user record.
- **API endpoints currently present:** health, register, login, refresh, logout, and current-user lookup.
- **User roles:** `admin`, `trainer`, `trainee`, `parent`, `employer`.
- **User states:** `active`, `pending`, `disabled`.
- **Locales:** English (`en`) and Hindi (`hi`).

### Current data entities

The only application model currently implemented is `User`, containing name, unique normalized email, password hash, role, status, optional organization name, language, refresh-token hash, and timestamps. Program, enrollment, trainee progress, opportunity, application, consent, and partner-review models are not currently present.

### Repository and deployment note

The primary Udaan client/API code is under `vocational-transition-academy/`. The repository root also contains a separate Python/FastAPI Docker scaffold referencing `myapp.manage:app`, while the product API is Node/Express. The relationship between these root-level deployment files and the Udaan application is unclear and should be resolved before production deployment. Root and application README files and the existing design docs are empty.

## 9. Non-functional requirements

1. **Security:** Validate all API input; enforce authorization on the server; never store plaintext passwords or refresh tokens; use secure cookies in production; protect authentication endpoints with rate limits.
2. **Privacy:** Collect only data necessary for approved workflows. Disability-related inputs may be sensitive; define retention, access, consent, and disclosure before implementing real search or progress sharing.
3. **Accessibility:** Use semantic landmarks and headings, keyboard-operable controls, visible focus, associated form labels/errors, and reduced-motion behavior. Captions must be supplied for meaningful video content before the video is relied on for essential information.
4. **Localization:** Keep user-facing copy in English and Hindi resources; verify translated validation, status, and error messages as workflows expand.
5. **Reliability:** Provide clear error states for API/network failures; do not make a failed write appear successful.
6. **Performance and availability:** Define service-level, page-load, browser-support, and recovery targets with stakeholders before launch; the repository currently specifies none.
7. **Operations:** Document required environment variables, database setup, account seeding, deployment, backups, and monitoring in an app-specific setup guide.

## 10. Acceptance criteria for a public MVP

- A new visitor can understand the academy, find approved descriptions for each active track, and locate verified enquiry/contact information.
- All public navigation and primary account workflows are usable at mobile and desktop widths using keyboard and assistive technology.
- English and Hindi can be selected and persist across reloads; no primary action or error state falls back to unexplained untranslated text.
- Trainee and parent registrations result in the documented account state; employer registration shows pending status and cannot sign in until approved.
- Staff accounts cannot be self-registered; portal-role restrictions and protected routes are enforced by the API, not only the UI.
- Sign-in, session restoration, refresh, logout, validation errors, rate limits, and expired sessions are covered by automated tests.
- No placeholder opportunity filter or example data is presented as an operational search feature.
- Privacy text accurately describes the data collected, access, retention, and any sharing, especially for disability-related inputs and parent access.
- Deployment instructions start the actual Node/React/MongoDB application and do not depend on the unrelated root Python scaffold unless that scaffold is intentionally adopted.

## 11. Risks, dependencies, and open decisions

| Item | Why it matters | Decision/owner needed |
|---|---|---|
| Program details and eligibility are not approved or populated. | Users cannot make informed training decisions from placeholder content. | Academy program owners. |
| Employer approval has no staff workflow. | Pending partner accounts cannot be operationally approved through the application. | Academy operations and product/engineering. |
| Real opportunity data and filter values are not defined. | Search cannot be implemented reliably; disability data needs careful handling. | Academy/employer stakeholders and privacy owner. |
| Parent access rules are not defined. | Trainee-specific information may require consent and access limitations. | Academy policy owner. |
| Public enquiry/contact details are unverified. | The website cannot complete the visitor's next step. | Academy communications. |
| Root Python deployment scaffold does not match the Express API. | Builds and deployment may target the wrong application or entry point. | Repository owner/engineering. |
| No completed design docs, requirements baseline, or tests were found in the reviewed paths. | Acceptance and regression behavior are not fully documented. | Product and engineering. |
| Accessibility, browser support, analytics, and service targets lack numerical definitions. | Release quality and outcomes cannot be measured consistently. | Product, design, and operations. |

## 12. Suggested delivery sequence

1. **Confirm policy and content:** approve audiences, program descriptions, eligibility, employer approval, parent access, privacy text, and verified contacts.
2. **Complete public MVP:** populate public pages, accessible enquiry/contact route, approved video captions, and bilingual content review.
3. **Complete account operations:** implement and test the staff workflow for reviewing pending employers; define notifications and account lifecycle.
4. **Define training and opportunity products:** approve workflows/data requirements, implement APIs and data models, then replace UI previews and empty dashboards.
5. **Production readiness:** resolve deployment layout, add app-specific setup/operations documentation, automate API/client tests, and establish monitoring and success metrics.

## 13. Source notes

This draft reflects the application source, locale resources, API routes/controllers, user model, auth middleware, and current project configuration as reviewed on 23 November 2026. Existing files in `docs/` were empty at review time. Proposed requirements and measures above must be confirmed by product and academy stakeholders.
