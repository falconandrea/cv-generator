# DEVELOPMENT_GUIDELINES.md

## Coding Style

- Prefer clarity over abstraction
- Avoid premature optimization
- Keep components small and focused
- Write code for humans first, agents second

---

## UI Guidelines

- Minimalist
- Form-first
- No decorative elements
- UI exists to support data entry, not to impress visually

---

## Agent-Friendly Rules

- Every component must be deterministic
- Avoid magic behavior or implicit conventions
- Prefer explicit data flow
- Document assumptions and non-obvious decisions in code comments

---

## React / Next.js Guidelines

### Component Design

- Prefer **Server Components by default**
- Use Client Components only when strictly necessary (forms, interactivity, local state)
- One responsibility per component
- Avoid deeply nested component trees
- Avoid prop drilling when global state is more appropriate

---

### State Management

- Global state lives **only** in Zustand
- No duplicated or mirrored state
- Do not sync local state with global state unless strictly required
- Prefer derived data over stored data

---

### Forms

- Controlled inputs only
- Validation handled at the component level
- No form libraries unless a clear limitation is reached
- Keep form logic simple and explicit

---

### Effects & Lifecycle

- Avoid `useEffect` unless required
- No side effects during render
- Prefer event-driven updates
- Effects must be easy to reason about and trace

---

## Next.js App Router Rules

- Use the App Router exclusively
- Avoid Pages Router entirely
- Keep routing flat and predictable
- Avoid dynamic routes unless explicitly required
- Avoid custom server logic unless needed for PDF generation

---

## Styling Rules

- Tailwind utility classes preferred
- Avoid custom CSS files
- No inline styles unless unavoidable
- Keep class lists readable and consistently ordered

---

## Error Handling & Validation

- Fail loudly and clearly during development
- Validate external input (e.g. imported JSON)
- Prefer simple, user-readable error messages
- Do not silently ignore invalid data
