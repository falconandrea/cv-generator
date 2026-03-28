# PRD: Custom Section

> **Feature**: Custom Section (free-text with editable title)
> **Status**: Draft
> **Date**: 2026-03-23

## 1. Overview

Add a new "Custom" section to the CV editor that allows users to enter a custom section title (default: "Interests") and free-text content. The section appears at the bottom of the CV (after Skills). If the content is empty, the section is completely hidden from the PDF output.

**Problem**: Users cannot add ad-hoc sections like Interests, Hobbies, Volunteering, etc. The CV structure is rigid.
**Solution**: A single custom free-text section with an editable title that renders in the PDF only when populated.

## 2. Goals

- Allow users to add a flexible text section to their CV with a customizable title
- Default title is "Interests" but can be changed to anything (e.g., "Hobbies", "Volunteering", "Awards")
- Section is invisible in the PDF when the description is empty
- Fully integrated across the entire pipeline: editor, store, PDF, JSON save/load, AI optimize, AI import

## 3. User Stories

1. **As a user**, I want to add an "Interests" section to my CV so recruiters can see my personality.
2. **As a user**, I want to rename the section title (e.g. "Volunteering") to fit my needs.
3. **As a user**, I want the section to not appear in the PDF if I leave the text empty.
4. **As a user**, I want the custom section to be saved/loaded with JSON export/import.
5. **As a user**, I want the AI optimize feature to be aware of my custom section.

## 4. Functional Requirements

1. New `CustomSection` type with `title: string` (default "Interests") and `content: string`
2. New `customSection` field in `CVState` (default: `{ title: "Interests", content: "" }`)
3. New editor tab "Custom" after Skills, with a text input for title and a textarea for content
4. PDF renders the custom section after Skills (before Certifications) — only if `content` is non-empty
5. JSON export/import includes the `customSection` field
6. AI optimize route schema includes `customSection` in the prompt
7. AI import-pdf route schema includes `customSection` for extraction
8. AI ChatMessage, AiDiffModal correctly display `customSection` changes
9. Navigation tabs (EditorTopNav, EditorSidebar) include the new "Custom" tab

## 5. Non-Goals (Out of Scope)

- Multiple custom sections (only one for now)
- Rich text formatting in the custom section
- Drag-and-drop reordering of sections

## 6. Design Considerations

- The form should have an `Input` for the title and a `Textarea` for the content
- The tab icon should use `TextCursorInput` from Lucide (or similar)
- Placement in the tab bar: after Skills, before Projects
- PDF placement: after Skills, before Certifications (at the very bottom area)

## 7. Technical Considerations

- **Stack**: Next.js 16, TypeScript, Zustand, @react-pdf/renderer, Tailwind CSS v4
- **Backward compatibility**: Existing JSON exports without `customSection` must still load correctly (use default fallback)
- **localStorage migration**: Existing stored state without `customSection` should gracefully fallback to defaults

## 8. Success Metrics

- Custom section renders correctly in PDF when content is non-empty
- Custom section is hidden in PDF when content is empty
- Custom section persists across JSON export/import
- AI optimize can read and propose changes to the custom section

## 9. Open Questions

None — requirements are clear from the user's description.
