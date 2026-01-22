# ATS-Friendly CV Generator

A minimal web application to generate **ATS-optimized CVs** using a structured, spec-driven approach and modern frontend tooling.

This project is intentionally built using **vibe coding** principles combined with a **spec-driven development workflow**, leveraging AI agents as implementation partners.

---

## What This Project Is

- A browser-based CV editor
- Focused on **ATS compatibility first**, visuals second
- No authentication
- No database
- No backend business logic

Users fill structured sections and generate a clean, professional PDF CV.

---

## What This Project Is NOT

- Not a job board
- Not a CV marketplace
- Not a marketing-heavy product
- Not a design showcase

This is a **tool**, not a brand.

---

## Core Features

- Structured CV editor
- One-column ATS-safe layout
- Automatic single-page / multi-page PDF generation
- Clickable links in PDF
- Local-only state (no persistence server-side)
- Import / Export CV data as JSON

---

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **shadcn/ui**
- **Zustand** for state management
- **@react-pdf/renderer** for PDF generation

---

## Development Philosophy

### Vibe Coding

This project is developed incrementally, prioritizing:

- Fast feedback loops
- Small, verifiable steps
- Working software at every stage

### Spec-Driven Development

All development is guided by explicit specifications written **before** implementation.

The specs live in the `/docs` directory and define:

- Scope
- Constraints
- Architecture
- UI rules
- ATS requirements

AI agents are instructed to **follow the specs strictly** and execute one phase at a time.

### Tooling & AI Setup

The project is developed using:

- **Visual Studio Code** as the primary editor
- **Roo Code** for agent-based development
- **GLM-4.7** as the primary Large Language Model

The AI is treated as an execution partner, not a source of product decisions. All decisions originate from written specifications.

---

## Documentation-First Workflow

The `/docs` folder contains the source of truth for the project:

- `PROJECT.md` – project goals and constraints
- `ROADMAP.md` – step-by-step execution plan
- `UI_GUIDELINES.md` – website UI rules
- `ATS_RULES.md` – PDF and layout constraints
- `DATA_SCHEMA.md` – CV data model
- `DEVELOPMENT_GUIDELINES.md` – development rules and guidelines
- `EDITOR_LAYOUT.md` – editor layout architecture with integrated preview

Implementation must always align with these documents.

---

## Project Status

This project is actively developed as an experiment in:

- AI-assisted development
- Spec-driven workflows
- Building useful tools with minimal scope

---

## License

MIT
