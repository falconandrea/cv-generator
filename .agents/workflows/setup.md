---
description: New project setup protocol - interrogate requirements and generate all context documentation
---

## Steps

1. Read `agents.md` using the `view_file` tool. Internalize all directives, especially the PLANNING MODE rules and the File Reference Map.

2. Inform the user that you are entering **PLANNING MODE** and that no code will be written during this phase.

3. Follow the full interrogation framework defined in `.agents/prompts/01_project_setup.md`, executing each phase in order:

   - **Phase 1** – Project Vision & Scope
   - **Phase 2** – Technical Stack Choice
   - **Phase 3** – Core User Flows
   - **Phase 4** – Data Architecture
   - **Phase 5** – Frontend / Design
   - **Phase 6** – Third-Party Services
   - **Phase 7** – Edge Cases & Error Handling
   - **Phase 8** – Deployment & DevOps

   After each phase: summarise what you understood and wait for the user's confirmation before moving to the next phase.

4. After completing all phases, present a preview of the files that will be generated:
   - `.agents/context/TECH_STACK.md`
   - `.agents/context/PRD.md`
   - `.agents/context/APP_FLOW.md`
   - `.agents/context/FRONTEND_GUIDELINES.md`
   - `.agents/context/BACKEND_STRUCTURE.md`
   - `.agents/context/IMPLEMENTATION_PLAN.md`
   - `.agents/context/API_CONTRACTS.md`
   - `.agents/memory/progress.md`

   Show a brief summary of what each file will contain and ask: **"Do you approve these documents? Should I create them?"**

5. Wait for explicit user approval. Once approved, create all files in `.agents/context/` and update `.agents/memory/progress.md` with the initial project status.

6. Confirm completion with:
   > ✅ All documentation created. Type **"Start implementing"** to switch to ACTING MODE and begin development.
