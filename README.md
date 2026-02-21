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
