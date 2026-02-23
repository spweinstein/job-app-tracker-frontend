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

Plan of Action:
1. Create a shared <LoadingSpinner> component and replace all <p>Loading…</p> / bare loading states across every list and detail page.
2. Build a Landing page (public-facing entry point for unauthenticated users — branding, call-to-action to register/login).
3. Build a User Dashboard (post-login home — application status counts, recent activity, quick-add actions).
4. Polish all detail pages (consistent card layout, better typography hierarchy, spacing, linked related records).
    - Grid layout
    - Loading state
    - Remove br tags
    - Fix status column class name on related applications table
5. Polish form styles (consistent label/input alignment, spacing between fields, error states per-field, better submit button placement).
    - Tiny gap on .field so label has regulated spacing from input
    - Cancel button on forms to go back to previous page
    - .actions is not styled in a form context; need consistent spacing
    - Form actions are unstyled buttons
6. Improve auth forms (centered card layout for Login and Register, visually distinct from the main app shell).
7. Debounce search queries (investigate useDebounce hook; wire into usePaginatedQuery to prevent per-keystroke API calls).
8. Add a toast/notification system (success feedback after create, edit, and delete operations).
9. Clean up remaining console.log statements across the codebase.
10. Optional modal and/or side drawer for quick add, certain edits and record details


flowchart TD
    ApplicationPage["ApplicationPage\n(owns PageContainer + setHeader state)"]
    ApplicationList["ApplicationList\n(setHeader, filterParams, hiddenColumns)"]
    ApplicationForm["ApplicationForm\n(setHeader)"]
    ApplicationEdit["ApplicationEdit\n(setHeader)"]
    ApplicationDetails["ApplicationDetails\n(setHeader)"]
    CompanyDetails["CompanyDetails\n(embeds ApplicationList)"]
    usePaginatedQuery["usePaginatedQuery\n(+ staticParams option)"]

    ApplicationPage -->|"setHeader prop"| ApplicationList
    ApplicationPage -->|"setHeader prop"| ApplicationForm
    ApplicationPage -->|"setHeader prop"| ApplicationEdit
    ApplicationPage -->|"setHeader prop"| ApplicationDetails
    ApplicationList -->|"staticParams=filterParams"| usePaginatedQuery
    CompanyDetails -->|"filterParams + hiddenColumns"| ApplicationList