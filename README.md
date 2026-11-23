# Udaan Vocational & Empowerment Academy

A bilingual (English & Hindi) MERN web platform built for **Udaan Vocational & Empowerment Academy**, an organization serving adults and young adults with disabilities. The platform combines an accessible public website with role-specific workflows for training administration, learning delivery, progress monitoring, and placement coordination.

> **Status:** Active Development — Initial Foundation Milestone (Draft v1.0)
>
> **Repository:** [github.com/shyamnagane15-maker/Ricoz_Project](https://github.com/shyamnagane15-maker/Ricoz_Project)
>
> **Project Owner / Initial Developer:** Shyam Nagane

---

## Table of Contents

1. [Overview & Scope](#overview--scope)
2. [Training Tracks](#training-tracks)
3. [User Roles & Permission Boundaries](#user-roles--permission-boundaries)
4. [Tech Stack & Architecture](#tech-stack--architecture)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Environment Variables](#environment-variables)
8. [Accessibility & Bilingual Standards](#accessibility--bilingual-standards)
9. [Security & Data Privacy Principles](#security--data-privacy-principles)
10. [Delivery Stages](#delivery-stages)
11. [Handover & Contribution Guidelines](#handover--contribution-guidelines)

---

## Overview & Scope

Udaan Vocational & Empowerment Academy prepares trainees for sustainable employment through structured vocational training and placement support. **This platform does not provide medical diagnosis, clinical records, or telehealth services.**

### Initial Delivery Scope (Foundation Milestone)
The initial milestone covers 12 core foundation areas required for stakeholder sign-off and team handover:
1. **Public Website:** Home, About, Programs, Admissions/Enquiry, Parent Information, Employer Partnership Information, Contact, Policy, and Accessibility pages.
2. **Authentication:** Login, logout, account invitation/registration flows, email verification, and single-use expiring password resets.
3. **Authorization:** Backend API permission enforcement and role-scoped frontend routes for all five roles.
4. **Admin Dashboard:** Operational counts and management workflows for users, trainees, trainers, programs, and batches.
5. **Trainee Onboarding:** General profile management, logically/physically separated restricted support fields, enrollment status, and verified guardian links.
6. **Training Tracks:** Records and relationships for the four vocational tracks, programs, batches, and enrollments.
7. **Learning Framework:** Ordered module, lesson, quiz, assignment, and submission structures with accessible empty states.
8. **Attendance & Progress:** Trainer session attendance logging, auditable corrections, and rule-based trainee progress tracking.
9. **Trainer Dashboard:** Assigned batches/trainees, attendance entry, assessment evaluation, and feedback tools.
10. **Trainee Dashboard:** Enrolled tracks, tasks, attendance summary, progress view, and announcements.
11. **Communication:** Audience-targeted announcements and in-app read/unread notifications.
12. **Technical Foundation:** MongoDB Atlas & Express API integration, deployment configuration, synthetic fixtures, automated tests, and handover documentation.

> **Content Guardrail:** Do not publish fabricated impact statistics, testimonials, partnerships, accreditation claims, or sample lessons/quizzes/assignments without explicit approval from the project owner and academy stakeholders.

---

## Training Tracks

The academy delivers vocational preparation across four core tracks:
1. **Data Entry**
2. **Packaging**
3. **Animal Care**
4. **Retail Operations**

---

## User Roles & Permission Boundaries

The platform supports **five distinct roles** (there is no `employee` role):

| Role | Primary Responsibilities | Access Boundaries |
| :--- | :--- | :--- |
| **Academy Admin** | Manage accounts, training structure, batches, enrollments, reports, and system settings. | Authorized operational access; restricted accommodation/support records governed by explicit permissions. |
| **Trainer** | View assigned batches, mark session attendance, assess tasks, and provide feedback. | Restricted strictly to assigned batches, trainees, and learning records. |
| **Trainee** | View own profile, enrolled learning content, tasks, attendance, and progress. | Own records only; cannot self-assign roles or approve enrollments. Adult trainees retain control over applicable consent/sharing decisions. |
| **Parent / Guardian** | Monitor a linked trainee’s permitted progress and announcements. | Requires a verified `GuardianLink` and explicit sharing authorization; disability status does not grant blanket access. |
| **Employer / Partner** | Maintain organization profile and manage job opportunities, applications, and placements (later milestone). | Restricted to own organization records and explicitly shared candidate profiles. Staff-only support/accommodation fields are never exposed to employers. |

---

## Tech Stack & Architecture

### Frontend (`client/`)
* **Framework:** React + Vite (JavaScript)
* **Routing:** React Router
* **Styling:** Tailwind CSS (Provisional palette: Deep Navy `#0B2E59`, Blue `#1D63B8`, Sky `#4DA3E0`, Sunrise Gold `#F4B23F`, Orange `#F97316`, Off-White `#F5F8FC`)
* **Data Fetching:** TanStack Query + Axios
* **Forms & Validation:** React Hook Form + Zod
* **Localization:** `react-i18next` (English & Hindi)

### Backend (`server/`)
* **Runtime & Framework:** Node.js + Express (REST API versioned under `/api/v1`)
* **Database:** MongoDB Atlas + Mongoose ODM
* **Architecture:** Modular routes, controllers, services, validation middleware, and centralized role-permission enforcement
* **Tooling:** ESLint + Prettier

---

## Project Structure

```text
Ricoz_Project/
├── client/                 # React + Vite frontend application
│   ├── public/             # Static assets (captions, favicon, temporary wordmark assets)
│   └── src/
│       ├── components/     # Reusable UI & accessible components (e.g., HeroVideo)
│       ├── constants/      # Site configuration and static constants
│       ├── features/       # Role-specific dashboards and domain views
│       ├── hooks/          # Custom React hooks
│       ├── i18n/           # English (en) and Hindi (hi) translation resources
│       ├── layouts/        # Public and role-scoped dashboard layouts
│       ├── pages/          # Public and authenticated route pages
│       └── services/       # Axios API client and TanStack Query hooks
├── server/                 # Node.js + Express backend API
│   └── src/
│       ├── config/         # Environment, DB connection, and timezone config
│       ├── controllers/    # Request handlers for /api/v1 endpoints
│       ├── middleware/     # Auth, RBAC/permission checks, validation, rate limiting, error handling
│       ├── models/         # Mongoose schemas (User, TraineeProfile, Batch, Attendance, AuditLog, etc.)
│       ├── routes/         # Versioned Express routers (/api/v1/*)
│       ├── services/       # Business logic (progress rules, consent checks, audit logging)
│       └── tests/          # API integration and negative permission tests
├── docs/                   # PRD, permission matrix, API specs, and handover notes
└── README.md
```

---

## Getting Started

### Prerequisites
* **Node.js** (v20+ LTS recommended)
* **npm** (v10+)
* **MongoDB Atlas** cluster (or local MongoDB instance for offline development) with network IP access configured

### 1. Clone the Repository
```bash
git clone https://github.com/shyamnagane15-maker/Ricoz_Project.git
cd Ricoz_Project
```

### 2. Install Dependencies
Install dependencies for both the backend server and frontend client:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure Environment Variables
Create `.env` files in both `server/` and `client/` using the templates in the [Environment Variables](#environment-variables) section below. Never commit real secrets to version control.

### 4. Run the Development Servers
Open two terminal windows:

```bash
# Terminal 1 — Start the Express API server
cd server
npm run dev
```

```bash
# Terminal 2 — Start the React + Vite frontend
cd client
npm run dev
```

### 5. Verify Health & Connectivity
* **API Liveness / Health Check:** `GET http://localhost:5000/api/v1/health`
* **Frontend Client:** `http://localhost:5173`

---

## Environment Variables

### `server/.env.example`
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/udaan_dev?retryWrites=true&w=majority
CLIENT_ORIGIN=http://localhost:5173
ACADEMY_TIMEZONE=Asia/Kolkata

# Authentication & Security
JWT_ACCESS_SECRET=replace_with_strong_random_secret
JWT_REFRESH_SECRET=replace_with_strong_random_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
COOKIE_SECURE=false

# Email (Account verification & password reset)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=replace_with_smtp_user
SMTP_PASS=replace_with_smtp_password
EMAIL_FROM=noreply@example.org
```

### `client/.env.example`
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_DEFAULT_LANGUAGE=en
```

---

## Accessibility & Bilingual Standards

Accessibility and bilingual usability are core architectural requirements, targeting **WCAG 2.2 Level AA** standards:
* **Keyboard & Screen Reader Support:** Semantic HTML landmarks, logical heading hierarchy, visible focus indicators, skip-to-content links, programmatic form labels, and ARIA live announcements for status/error updates.
* **Motion & Media:** Respect `prefers-reduced-motion` across animations and auto-playing media (`HeroVideo`), and provide captions/transcripts for learning media.
* **Visual Clarity:** Adult-respectful design language, predictable navigation, generous spacing, non-color status indicators, and verified contrast ratios.
* **English & Hindi Localization:** Persisted language switcher (`en` / `hi`), localized validation/error/empty states, proper `lang` attribute switching on `<html>`, and human-reviewed Hindi translations.

---

## Security & Data Privacy Principles

* **API-Level Authorization:** Every `/api/v1` endpoint enforces role and ownership checks on the server—never rely solely on hiding UI navigation. Return sanitized `403`/`404` responses without leaking sensitive data.
* **Token Handling:** Passwords are hashed using a strong one-way hashing algorithm. Refresh tokens must **never** be stored in `localStorage` (use `HttpOnly`, `SameSite` cookies with CSRF protection and token rotation/revocation).
* **Data Minimization & Separation:** Restricted trainee accommodation/support fields are separated from general profile data and excluded from employer responses.
* **Audit Logging:** Privileged actions, role assignments, attendance corrections, and consent grants/revocations are recorded in `AuditLog` without logging passwords, tokens, or sensitive payload contents.
* **Synthetic Fixtures Only:** Use only synthetic technical test data in development/staging until production data governance is formally approved.

---

## Delivery Stages

* **Stage A — Foundation:** Repository audit, design tokens, MongoDB Atlas health/readiness endpoints, `react-i18next` setup, and responsive layouts.
* **Stage B — Identity:** Authentication lifecycle, central permission matrix, role-scoped routes, `GuardianLink` foundation, and security tests.
* **Stage C — Operations:** User management, trainee onboarding, programs/tracks, batches, enrollments, and public enquiry handling.
* **Stage D — Training Framework:** Module/lesson/quiz/assignment structures (empty-state ready), attendance logging, rule-based progress, role dashboards, and announcements.
* **Stage E — Initial Milestone Acceptance:** Keyboard/screen-reader accessibility review, negative permission tests, integration tests, deployment smoke tests, and team handover.
* **Stage F — Team Expansion (Post-Initial Milestone):** Employer verification, job postings, candidate sharing/applications, interviews, placements, certificates, and advanced reporting.

---

## Handover & Contribution Guidelines

Because a broader engineering team will join after the initial milestone:
1. Keep `/docs` updated whenever schemas, API response envelopes, or permission rules change.
2. Ensure every new route includes request validation and negative access-control tests (verifying unauthorized roles and cross-user ID lookups are blocked).
3. Run linting and formatting (`npm run lint` / `npm run format`) before opening pull requests.
4. Flag any open stakeholder decisions (such as logo assets, approved public copy, or sample curriculum release) rather than hardcoding unapproved assumptions.
