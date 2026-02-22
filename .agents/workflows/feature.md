---
description: New feature workflow - create a PRD from a feature request, get approval, then generate tasks
---

## Steps

1. Read `agents.md` using the `view_file` tool. Confirm you are in **PLANNING MODE** — no code will be written during this phase.

2. Read `.agents/context/TECH_STACK.md` and `.agents/context/PRD.md` (if they exist) to understand the current project constraints and existing scope.

3. Ask the user to briefly describe the new feature they want to add.

4. Based on the user's description, ask **3–5 essential clarifying questions** using A/B/C/D options to resolve any ambiguity. Format them so the user can answer concisely, e.g. "1A, 2B, 3C". Focus only on critical unknowns:
   - Primary goal / target user
   - Scope (what's in vs. out)
   - Technical constraints or preferences

   Wait for the user's answers before continuing.

5. Using the answers, generate a full PRD following this structure:
   1. **Overview** – What the feature does and what problem it solves
   2. **Goals** – Specific, measurable objectives
   3. **User Stories** – Narratives describing how users interact with the feature
   4. **Functional Requirements** – Numbered list of specific functionalities
   5. **Non-Goals (Out of Scope)** – What this feature will NOT include
   6. **Design Considerations** – UI/UX requirements (if applicable)
   7. **Technical Considerations** – Constraints, dependencies, stack requirements from TECH_STACK.md
   8. **Success Metrics** – How success will be measured
   9. **Open Questions** – Any remaining unknowns

6. Save the PRD to `.agents/features/[feature-name]/prd-[feature-name].md` and show it to the user.

7. Ask: **"Do you approve this PRD? Should I generate the implementation tasks?"**

   - If the user requests changes, update the PRD and ask again.
   - Do NOT proceed until you receive explicit approval.

8. Once approved, use `.agents/prompts/03_generate_tasks.md` to generate the task list and save it to `.agents/features/[feature-name]/tasks-[feature-name].md`.

9. Update `.agents/memory/progress.md` with the new feature and its status.

10. Confirm with:
    > ✅ PRD and task list created. Type **"Start implementing"** to switch to ACTING MODE and begin development.
