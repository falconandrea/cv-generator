# PRD: Editor Cyber Redesign

## 1. Overview & Objective
The goal is to deeply integrate the "CraftCV - Editor (Cyber Style)" aesthetic (from the Stitch design system) into the core CV Editor page (`/editor`). This involves removing generic light/dark toggle support and fully committing to the permanent dark "cyber" aesthetic established on the Homepage and Dashboard.

The layout will transition from a permanent side-by-side Desktop view to a unified, single-column workspace IDE togglable between `[Editor]` and `[Preview]` modes.

## 2. Core Requirements

### 2.1 The IDE Layout Toggle
- **Unified Mobile/Desktop:** The dual pane split view is removed. The main content area occupies the entire screen.
- A central segment toggle in the header switches the visible canvas between `Editor` (form mode) and `Preview` (PDF renderer).
- This ensures maximum horizontal space for editing and a unified interaction model across devices, removing the need for Bottom Sheet mobile overrides.

### 2.2 Cyber Aesthetic Form styling
- **Container:** `bg-[#050508] text-white` with the globally shared `retro-grid` background.
- **Form Wrappers:** Forms live inside a dark bounding container (e.g., `bg-[#0a0a12]`) with subtle neon borders.
- **Inputs:** Transition to a "Soft-Field" style. Transparent backgrounds and subtle bottom borders (`border-zinc-800`). On `:focus`, inputs glow with a `#00f0ff` accent and thicker border.
- **Typography:** Form titles (`<h2>`) use `text-[#00f0ff] font-mono uppercase text-sm`. Generic buttons use monospace text.

### 2.3 Horizontal Tabs Revamp (`EditorTopNav.tsx`)
- Keep horizontal scroll logic but upgrade visuals.
- Active tabs: Glowing cyber presence (e.g., `bg-[#ff00aa]/15 text-[#ff00aa] border border-[#ff00aa]/30`).
- Inactive tabs: Low contrast `text-zinc-500 font-mono text-xs`.

### 2.4 AI Chat Integration & Diff Check
- **Right Sidebar Overlay:** The AI "Co-pilot" will act as a sliding `Sheet` from the right side, resembling a floating terminal window (`> AI_COACH.EXE`).
- It can be opened regardless of whether the user is in Editor or Preview mode.
- **Diff Modal:** The comparison modal triggered by the AI (to accept/reject changes) will be restyled to match a terminal. Added text glows green (`text-[#b8ff00]`), removed text is struck through in red (`text-[#ff00aa]`).

## 3. Scope & Out of Scope
- **In Scope:** `app/editor/page.tsx`, `components/editor/editor-content.tsx`, `components/editor/EditorTopNav.tsx`, the Diff Modal, and all form field inputs within `components/editor/`.
- **Out of Scope:** The core PDF generation algorithm (`lib/pdf-generator.ts`) remains exactly the same. Only the surrounding frontend UI changes.
