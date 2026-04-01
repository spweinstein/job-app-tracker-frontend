# Job Application Tracker — Frontend

React SPA for tracking companies, job applications, resumes, and cover letters. It talks to the companion backend over HTTP with JWT auth stored in `localStorage`.

## Stack

- **React 19** + **Vite 7**
- **React Router 7** (`BrowserRouter`, nested routes)
- **Axios** (shared instance in `src/services/api.js` with auth header + 401 handling)

## Prerequisites

- Node.js (LTS recommended)
- Backend running and reachable at the URL you set in `.env` (see below)

## Setup

```bash
npm install
cp .env.example .env
# Edit .env: set VITE_BACK_END_SERVER_URL to your API origin (no trailing path segments required).
npm run dev
```

The dev server prints a local URL (typically `http://localhost:5173`).

## Environment variables

| Variable | Purpose |
|----------|---------|
| `VITE_BACK_END_SERVER_URL` | **Required.** API base URL (e.g. `http://localhost:3000`). All service calls use paths like `/companies`, `/auth/login`, `/ai/threads`. |
| `VITE_AI_ASSISTANT_ENABLED` | Set to `true` to show AI assistant UI (navbar toggle, right-hand chat drawer, document chat on resume/cover-letter detail pages). Any other value leaves it off. |

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
- **`/`** (authenticated shell) — `AppLayout`: left navigation sidebar, main content (`<Outlet />`), and optional right **AI Assistant** drawer when the feature flag is on. Without a valid user, `/` redirects to `/home`; other protected paths redirect to `/login` (with `state.from` for return navigation).
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
- **AI assistant** (when `VITE_AI_ASSISTANT_ENABLED=true`):
  - **Global** — `ChatPanel` in `AppLayout` wraps `AIChat` with no `docType` / `documentId` (general thread).
  - **Per document** — On resume and cover letter detail pages, `AIChat` is imported as `AIChatPanel` and receives `docType` (`resume` | `cover_letter`) and the document id so the backend can scope the thread.

## Auth and API client

- **Token** — Stored as `localStorage.token`; `UserContext` decodes the JWT payload for the current user. Shaped `payload` in the body is supported.
- **`src/services/api.js`** — Attaches `Authorization: Bearer <token>` when present; on `401` (except login/register), dispatches `app:session-expired` and `UserProvider` clears the session.
- Domain calls live in `src/services/*Service.js` and `src/services/authService.js`; AI helpers are in `src/services/ai.js` (`createThread`, `getThreadMessages`, `postThreadMessage`, `getThreads`).

## Source layout (where things live)

- `src/main.jsx` — `BrowserRouter`, `UserProvider`, root render.
- `src/App.jsx` — Routes, feature flag for AI, NavBar state (sidebar + chat drawer).
- `src/contexts/` — `UserContext` (user + sign-out).
- `src/components/` — Feature areas: `Dashboard`, `Companies`, `Applications`, `Resumes`, `CoverLetters`, `Landing`, auth forms, `NotFound`.
- `src/components/shared/` — Layout (`AppLayout`, `NavBar`, `AppSidebar`, `PageContainer`), lists/pagination/search, forms (`FormField`, inputs, `FormContainer`), tables (`DataTable`), document UI (`DocumentLineagePanel`), chat (`ChatPanel`, `AIChat.jsx`).
- `src/hooks/` — `useForm`, `useErrors`, `usePaginatedQuery`, `useMediaQuery`, etc.

## UI patterns

Many list/detail/form screens use **PageContainer** (header + content): **ListContainer** / **ListActions**, **DetailContainer** / **DetailActions**, and **FormContainer** with **FormField** variants (text, textarea, select, tags, repeatable groups, etc.). Styling is mostly component-level CSS files.

## AI integration (reference)

- **Client** — `src/services/ai.js` calls (relative to `VITE_BACK_END_SERVER_URL`): `POST /ai/threads`, `GET /ai/threads/:threadId/messages`, `POST /ai/threads/:threadId/messages`, optionally `GET /ai/threads`.
- **UI** — `src/components/shared/layout/ChatPanel/AIChat.jsx`: creates or resumes a thread, loads message history, send/retry, loading and error states. Styles: `AIChat.css`, `ChatPanel.css`. Document pages use the same component with `docType` and `documentId` for a scoped thread.

The backend must implement these routes and enforce auth; OpenAI (or similar) is configured on the server, not in this repo.
