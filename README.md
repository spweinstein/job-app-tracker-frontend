# Job Application Tracker — Frontend

React SPA for tracking companies, job applications, resumes, and cover letters. It talks to the companion backend over HTTP with JWT auth stored in `localStorage`.

## Stack

- **React 19** + **Vite 7**
- **React Router 7** (`BrowserRouter`, nested routes)
- **Axios** (shared instance in `src/services/api.js` with auth header + 401 handling)

## Prerequisites

- Node.js (LTS recommended)
- Backend running and reachable at the URLs you set in `.env` (see below)

## Setup

```bash
npm install
cp .env.example .env
# Edit .env: set VITE_BACK_END_SERVER_URL_DEV and VITE_BACK_END_SERVER_URL_PROD, and VITE_PRODUCTION.
npm run dev
```

The dev server prints a local URL (typically `http://localhost:5173`).

## Environment variables

| Variable | Purpose |
|----------|---------|
| `VITE_BACK_END_SERVER_URL_DEV` | **Required.** API base URL for development (e.g. `http://localhost:3000`). |
| `VITE_BACK_END_SERVER_URL_PROD` | **Required.** API base URL for production. |
| `VITE_PRODUCTION` | Set to `"true"` to use the production URL; any other value uses the dev URL. |

Copy from `.env.example` and adjust.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Routing and access

- **`/home`** — Public landing page with links to register/login.
- **`/login`**, **`/register`** — Auth forms; successful login stores a JWT and updates `UserContext`.
- **`/`** (authenticated shell) — `AppLayout`: left navigation sidebar and main content (`<Outlet />`). Without a valid user, `/` redirects to `/home`; other protected paths redirect to `/login` (with `state.from` for return navigation).
- **Nested app routes** (under `/`):
  - `/` — Dashboard (stats and quick views)
  - `/companies`, `/companies/new`, `/companies/:companyId`, `/companies/:companyId/edit`
  - `/applications`, `/applications/new`, `/applications/:applicationId`, `/applications/:applicationId/edit`
  - `/resumes`, …, `/resumes/:resumeId`, …
  - `/cover-letters`, …, `/cover-letters/:coverLetterId`, …
- **`/*`** — `NotFound` page.

The top **NavBar** is always visible; hamburger opens the left sidebar when logged in.

## Features (high level)

- **Dashboard** — Aggregates application stats and highlights (e.g. interviewing).
- **Companies** — CRUD-style list, detail, create, and edit.
- **Applications** — Same pattern, linked to companies and statuses.
- **Resumes & cover letters** — List, create, edit, detail; detail views can show **document lineage** (versions) via `DocumentLineagePanel`.

## Auth and API client

- **Token** — Stored as `localStorage.token`; `UserContext` decodes the JWT payload for the current user. Shaped `payload` in the body is supported.
- **`src/services/api.js`** — Selects the base URL from `VITE_BACK_END_SERVER_URL_DEV` or `VITE_BACK_END_SERVER_URL_PROD` based on `VITE_PRODUCTION`; attaches `Authorization: Bearer <token>` when present; on `401` (except login/register), dispatches `app:session-expired` and `UserProvider` clears the session.
- Domain calls live in `src/services/*Service.js` and `src/services/authService.js`.

## Source layout (where things live)

- `src/main.jsx` — `BrowserRouter`, `UserProvider`, root render.
- `src/App.jsx` — Routes, NavBar state (sidebar).
- `src/contexts/` — `UserContext` (user + sign-out).
- `src/components/` — Feature areas: `Dashboard`, `Companies`, `Applications`, `Resumes`, `CoverLetters`, `Landing`, auth forms, `NotFound`.
- `src/components/shared/` — Layout (`AppLayout`, `NavBar`, `AppSidebar`, `PageContainer`), lists/pagination/search, forms (`FormField`, inputs, `FormContainer`), tables (`DataTable`), document UI (`DocumentLineagePanel`).
- `src/hooks/` — `useForm`, `useErrors`, `usePaginatedQuery`, `useMediaQuery`, etc.

## UI patterns

Many list/detail/form screens use **PageContainer** (header + content): **ListContainer** / **ListActions**, **DetailContainer** / **DetailActions**, and **FormContainer** with **FormField** variants (text, textarea, select, tags, repeatable groups, etc.). Styling is mostly component-level CSS files.
