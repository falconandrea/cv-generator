---
description: Session start protocol - read project memory and context, then summarize status to the user
---

## Steps

1. Read the project's main directives file at `agents.md` using the `view_file` tool. Keep all directives in mind for the entire session.

2. Read `.agents/memory/progress.md` to understand the current project state and what has been completed so far.

3. Read `.agents/memory/lessons.md` to recall past mistakes and patterns to avoid.

4. Read `.agents/memory/blockers.md` to check for any open issues or known blockers.

5. Read `.agents/context/TECH_STACK.md` to have a clear picture of the technology stack and versions in use.

6. After reading all the files above, present the user with a concise summary **in Italian** covering:
   - The current project status (from `progress.md`)
   - Any open blockers (from `blockers.md`)
   - The key operational directives you will follow (from `agents.md`)

7. Ask the user: **"Ready! What are we working on today?"**