# Rule: Generating a Product Requirements Document (PRD)

## Goal

Guide AI in creating a detailed PRD in Markdown format based on a user's feature request. The PRD should be clear, actionable, and suitable for a developer to understand and implement.

## Process

1. **Receive Initial Prompt:** User provides a brief description of a new feature
2. **Ask Clarifying Questions:** Before writing the PRD, ask only 3-5 essential clarifying questions with A/B/C/D options
3. **Generate PRD:** Based on answers, generate a PRD using the structure below
4. **Save PRD:** Save as `.agents/features/[feature-name]/prd-[feature-name].md`

## Clarifying Questions Guidelines

Ask only critical questions where the initial prompt is ambiguous. Format:

```
1. What is the primary goal of this feature?
   A. [Option A]
   B. [Option B]
   C. [Option C]
   D. Other (please specify)

2. Who is the target user?
   A. All users
   B. Authenticated users only
   C. Admin users only
   D. Specific user segment
```

Make it simple for user to respond: "1A, 2B, 3C"

## PRD Structure

The generated PRD should include:

1. **Overview:** Brief description of the feature and problem it solves
2. **Goals:** Specific, measurable objectives
3. **User Stories:** User narratives describing feature usage
4. **Functional Requirements:** Numbered list of specific functionalities
5. **Non-Goals (Out of Scope):** What this feature will NOT include
6. **Design Considerations:** UI/UX requirements (if applicable)
7. **Technical Considerations:** Technical constraints, dependencies
8. **Success Metrics:** How success will be measured
9. **Open Questions:** Remaining questions needing clarification

## Output

- **Format:** Markdown (`.md`)
- **Location:** `.agents/features/[feature-name]/`
- **Filename:** `prd-[feature-name].md`

## Final Instructions

1. Do NOT start implementing the PRD
2. Make sure to ask clarifying questions
3. Take user's answers and improve the PRD
4. Get explicit approval before generating tasks
