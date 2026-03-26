# Job App Tracker (Frontend)

```
App
├── NavBar
└── Routes
    └── PageContainer
        ├── PageHeader
        │   └── [actions slot]
        │       ├── ListActions
        │       ├── DetailActions
        │       │   └── ConfirmDeleteButton
        │       └── (none)
        └── PageContent
            ├── FormContainer
            │   ├── FormField
            │   │   └── TextInput | TextAreaInput | SelectInput | TagInput
            │   ├── RepeatableFieldGroup
            │   │   └── FormField (no label, placeholder only)
            │   └── FormActions
            ├── DetailContainer
            │   └── SectionCard
            │       └── DetailField
            └── ListContainer
```

## AI Ask-Only Chat Panel

- **Where it lives**
  - **Resumes**: On the Resume Details view (`/resumes/:resumeId`), the right-hand sidebar shows an **Assistant** chat panel alongside the Versions (`DocumentLineagePanel`). The panel is mounted via `AIChatPanel` inside `ResumeDetails`.
  - **Cover Letters**: On the Cover Letter Details view (`/cover-letters/:coverLetterId`), the same **Assistant** chat panel appears in the right-hand sidebar next to the Versions panel, mounted from `CoverLetterDetails`.
  - Layout for these views uses a simple two-column flex wrapper defined in `DocumentPageLayout.css` (`.document-page-layout`, `.document-main`, `.document-sidebar`), stacking vertically on smaller screens.

- **Frontend wiring**
  - `src/api/ai.js`
    - **createDocumentThread({ docType, documentId })**: `POST /api/ai/threads` → returns `{ threadId, thread }`. `docType` is `"resume"` or `"cover_letter"`, and `documentId` is the resume/cover letter `_id`.
    - **getThreadMessages(threadId, { cursor, limit })**: `GET /api/ai/threads/:threadId/messages` → returns `{ messages, nextCursor }` (the component currently just loads the first page).
    - **postThreadMessage(threadId, text)**: `POST /api/ai/threads/:threadId/messages` → returns `{ userMessage, assistantMessage }`.
  - `src/components/AIChatPanel.jsx`
    - Props: **docType**, **documentId**.
    - On mount:
      - Calls `createDocumentThread({ docType, documentId })` and stores `threadId`.
      - Loads existing history via `getThreadMessages(threadId)` and renders messages in a scrollable list.
    - Sending:
      - Textarea + **Send** button (Ask-only chat).
      - Calls `postThreadMessage(threadId, text)` and appends the returned `userMessage` and `assistantMessage`.
      - Shows a small loading state ("Assistant is thinking…") while the assistant response is pending.
    - Error handling:
      - Renders an inline error bar when thread/message calls fail.
      - Exposes a **Retry** button that resends the last user message.
    - UX:
      - Auto-scrolls to the bottom whenever new messages arrive.
      - Uses lightweight styles in `AIChatPanel.css` to match existing card/panel visuals.

- **Backend endpoints used**
  - **POST `/api/ai/threads`**
    - Body: `{ docType, documentId }`
    - Creates (or reuses) an AI thread scoped to a specific resume or cover letter document for the authenticated user.
  - **GET `/api/ai/threads/:threadId/messages`**
    - Query params: `cursor` (optional), `limit` (optional).
    - Returns messages for that document-scoped thread in ascending `createdAt` order plus an optional `nextCursor`.
  - **POST `/api/ai/threads/:threadId/messages`**
    - Body: `{ text }` (server forces `mode: "ASK"`).
    - Persists the user message, calls OpenAI Ask-mode under the hood, stores the assistant reply, and returns both messages.
