# ARCHITECTURE.md

## High-Level Architecture

The application is fully client-driven with optional server-side PDF rendering.

```
/app
  /editor
    /sections
  /preview
  /pdf
/state
/lib
```

---

## State Management

- Single global CV store
- Schema-driven data model
- Local persistence

---

## Rendering Flow

1. User edits form sections
2. State updates live
3. Preview updates instantly
4. PDF is generated from state
