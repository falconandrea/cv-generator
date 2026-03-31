# Tasks: Editor Cyber Redesign

Based on: `prd-editor-redesign.md`

## Relevant Files
- `app/editor/page.tsx`
- `components/editor/editor-content.tsx`
- `components/editor/EditorTopNav.tsx`
- `components/editor/*-form.tsx` (All form components)
- `components/ai/AiOptimizePanel.tsx`
- `components/ai/ChatMessage.tsx`
- `components/ai/PrivacyNotice.tsx`
- `components/ai/AiDiffModal.tsx`
- `app/globals.css`

## Tasks

- [x] 1.0 General Structure & Theme Updates
  - [x] 1.1 Remove standard Tailwind `dark:` variants across editor UI components.
  - [x] 1.2 Update `app/editor/page.tsx` background to `bg-[#050508]` and insert `retro-grid`.
  - [x] 1.3 Add IDE toggle switch (Editor vs Preview) to sticky top navigation.
  - [x] 1.4 Refactor `app/editor/page.tsx` layout to conditionally render `EditorContent` or `PreviewContent` based on toggle, taking full width.

- [x] 2.0 Editor Forms & Components Redesign
  - [x] 2.1 Update `components/editor/editor-content.tsx` headers (`<h2>`) to cyber style (monospace, `#00f0ff` text).
  - [x] 2.2 Re-style input fields (TextFields, TextAreas) across all form components to "Soft-Field" (transparent bg, bottom-border glowing on focus).
  - [x] 2.3 Re-style "Reset Data", "Save JSON", "Import" buttons with retro borders and dark backgrounds.

- [x] 3.0 Tab Navigation (`EditorTopNav.tsx`)
  - [x] 3.1 Update scroll container & arrow visual style.
  - [x] 3.2 Update "active" tab to glowing state (`border-[#ff00aa]/30`, `bg-[#ff00aa]/15`).
  - [x] 3.3 Update "inactive" tabs to muted monospace text.

- [x] 4.0 AI Integration Refactoring
  - [x] 4.1 Update AI Chat `Sheet` component to render with terminal styling (`bg-[#0a0a12]`, green/pink accents).
  - [x] 4.2 Restyle structural chat bubbles (AI vs User) with cyber aesthetics.
  - [x] 4.3 Redesign the Diff presentation (Show Diff/Apply logic) to use terminal additions/deletions coloring styling (`#b8ff00` and `#ff00aa`).

- [x] 5.0 Mobile Unification & Cleanup
  - [x] 5.1 Remove any duplicate Mobile-only toggle components logic (e.g., Bottom Sheet for Preview) if replaced by the top TopNav IDE toggle.
  - [x] 5.2 Verify layout behaves smoothly on `md`, `sm`, and `xs` viewports.
