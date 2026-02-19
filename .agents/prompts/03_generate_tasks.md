# Rule: Generate Task List from PRD

## Goal

Guide AI in creating a detailed, step-by-step task list in Markdown format based on a PRD. The task list guides the developer through implementation.

## Output

- **Format:** Markdown (`.md`)
- **Location:** `.agents/features/[feature-name]/`
- **Filename:** `tasks-[feature-name].md`

## Process

1. **Receive PRD:** User points to or provides the PRD file
2. **Phase 1 - Parent Tasks:** Generate 5-7 high-level tasks. Wait for user confirmation
3. **Phase 2 - Sub-Tasks:** Break down each parent into actionable sub-tasks
4. **Identify Files:** List files that will be created or modified
5. **Save Task List:** Save in `.agents/features/[feature-name]/tasks-[feature-name].md`

## Output Format

```markdown
# Tasks: [Feature Name]

Based on: prd-[feature-name].md

## Relevant Files

- `path/to/file.ts` - Description of why this file is relevant
- `path/to/file.test.ts` - Unit tests for the file

## Instructions

**IMPORTANT:** As you complete each task, mark it by changing `- [ ]` to `- [x]`.
Update after completing each sub-task, not just parent tasks.

## Tasks

- [ ] 1.0 Parent Task Title
  - [ ] 1.1 [Sub-task description]
  - [ ] 1.2 [Sub-task description]
- [ ] 2.0 Parent Task Title
  - [ ] 2.1 [Sub-task description]
  - [ ] 2.2 [Sub-task description]
- [ ] 3.0 Testing
  - [ ] 3.1 Write unit tests
  - [ ] 3.2 Manual testing
```

## Interaction Model

After generating parent tasks, pause and say:
> "I have generated the high-level tasks. Ready to generate sub-tasks? Reply 'Go' to proceed."

Wait for user confirmation before generating detailed sub-tasks.

## Task Numbering

- Parent tasks: `1.0`, `2.0`, `3.0`
- Sub-tasks: `1.1`, `1.2`, `2.1`, `2.2`

## Guidelines

- Each task should be completable in one session
- Include testing tasks
- Consider edge cases and error handling
- Reference relevant files from the codebase
- Tasks should be logical sequence: setup → core → tests → integration
