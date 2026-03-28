# PRD: Dashboard Page & Editor Redesign

> **Feature**: Dashboard Redesign
> **Status**: Draft
> **Date**: 2026-03-28

## 1. Overview

Currently, the homepage links directly to `/editor`, where a `WelcomeDialog` modal greets first-time users. This PRD introduces a new **`/dashboard`** page as an intermediate step between the homepage and the editor. The dashboard provides a premium onboarding experience inspired by the Stitch "CraftCV - Welcome (Cyber Style)" screen design, using the homepage's established cyber/retro-futuristic aesthetic as the source of truth for colors, typography, and button styles.

Additionally, a **shared Header component** will replace the current homepage-inline header and the editor's `Header` component, providing consistent navigation across all pages with conditional link visibility.

## 2. Goals

- Create a visually stunning `/dashboard` page that matches the homepage's cyber aesthetic
- Introduce a shared `AppHeader` component usable across all pages with configurable nav links
- Redirect all homepage CTAs from `/editor` to `/dashboard`
- Support 3 dashboard actions: Start from Scratch, Import PDF, Import JSON
- Show a disabled "ATS Score" link with a "Soon" badge
- Remove the `WelcomeDialog` from the editor entirely

## 3. User Stories

1. **As a new visitor**, I click "Start Building" on the homepage and land on a premium-feeling dashboard that gives me 3 clear options to begin.
2. **As a returning user**, I click "Import from JSON" on the dashboard, my file picker opens directly, and once I select a file I'm redirected to `/editor` with my data loaded.
3. **As a user on any page**, I see a consistent header with the CRAFT_CV logo and contextual navigation links.

## 4. Functional Requirements

### FR-1: Shared AppHeader Component
- **FR-1.1**: Create `components/layout/AppHeader.tsx` — a client component accepting props for conditional rendering:
  - `showStartBuilding?: boolean` — shows "Start Building" CTA button (only on homepage)
  - `navLinks?: Array<{ label, href, disabled?, badge? }>` — navigation links to show
- **FR-1.2**: Match homepage header design exactly:
  - Dark background with `border-b border-[#00f0ff]/20`
  - Logo: `Terminal` icon (cyan) + "CRAFT" (white) + "_CV" (cyan)
  - Font: `text-xl font-bold tracking-tight`
  - "Start Building" button: `bg-[#00f0ff] text-black hover:bg-[#00f0ff]/80 font-semibold` with rounded corners
- **FR-1.3**: Navigation links appear between logo and CTA area, styled as `text-sm text-zinc-400 hover:text-[#00f0ff]` with transition
- **FR-1.4**: Disabled links appear with `opacity-50 cursor-not-allowed` and optional badge ("Soon")
- **FR-1.5**: Replace the inline `<header>` in `app/page.tsx` with `<AppHeader>` (with `showStartBuilding={true}`)
- **FR-1.6**: Replace `<Header />` import in `app/editor/page.tsx` with `<AppHeader>` (no "Start Building", with nav links)

### FR-2: Dashboard Page (`/dashboard`)
- **FR-2.1**: Create `app/dashboard/page.tsx` as a client component
- **FR-2.2**: Uses `<AppHeader>` with nav links visible but no "Start Building" button
- **FR-2.3**: Nav links configuration:
  - "Dashboard" → `/dashboard` (active/current)
  - "Editor" → `/editor`
  - "ATS Score" → disabled, with "Soon" badge
- **FR-2.4**: Full-page dark layout matching homepage aesthetic:
  - Background: `bg-[#050508]` with retro-grid overlay and radial gradient glow
  - Same CSS variables and animations from `globals.css`

### FR-3: Dashboard Content (Cyber Style)
Based on Stitch "CraftCV - Welcome (Cyber Style)" screen:
- **FR-3.1**: Hero section with headline:
  - Title: "Build your professional CV in minutes"
  - Subtitle: Technical-style description text
  - Mono-font tech label (e.g. `> SYSTEM.INITIALIZATION`)
- **FR-3.2**: Three action cards in a 2-column layout:
  - **Left (large card)**: "Start from Scratch" — cyan accent icon, prominent CTA, links to `/editor`
  - **Right top**: "Import from PDF" — magenta accent icon, triggers native file picker for PDF
  - **Right bottom**: "Import from JSON" — lime accent icon, triggers native file picker for JSON
- **FR-3.3**: Card styling:
  - Background: `bg-[#0a0a12]` with `border border-zinc-800 hover:border-[accent-color]`
  - Hover: `-translate-y-1` transition, border color shift to card's accent
  - Monospace link at card footer (e.g. `INITIALIZE_WORKSPACE →`)
- **FR-3.4**: Bottom info badges row (3 columns):
  - "ATS Compliant Output" — cyan
  - "Encrypted Data Privacy" — magenta
  - "Real-time AI Coaching" — lime
  - Mono uppercase labels above, white text values below
- **FR-3.5**: Footer matching homepage footer style

### FR-4: Import Flows from Dashboard
- **FR-4.1**: "Start from Scratch" → `router.push('/editor')` — no data, empty editor
- **FR-4.2**: "Import from PDF" → Opens native file picker (`<input type="file" accept=".pdf">`), processes the file using existing `PdfImportDialog` logic, stores result in Zustand store, then `router.push('/editor')`
- **FR-4.3**: "Import from JSON" → Opens native file picker (`<input type="file" accept=".json">`), uses existing `importCVFromJSON` util, stores in Zustand, then `router.push('/editor')`

### FR-5: Editor Page Cleanup
- **FR-5.1**: Remove `WelcomeDialog` component usage from `app/editor/page.tsx`
- **FR-5.2**: Remove `welcomeOpen` state and `isCVEmpty` logic
- **FR-5.3**: Replace `<Header />` with `<AppHeader>` with appropriate nav links (Dashboard, Editor active, ATS Score disabled+Soon)
- **FR-5.4**: Keep all existing editor functionality intact (sub-header actions, preview, AI panel, etc.)

### FR-6: Routing Updates
- **FR-6.1**: Update all `<Link href="/editor">` in `app/page.tsx` to `<Link href="/dashboard">`
- **FR-6.2**: Keep `/editor` accessible directly via URL (not a protected route)

## 5. Non-Goals (Out of Scope)

- ATS Score page implementation (just the disabled link placeholder)
- Mobile-specific dashboard layout (responsive yes, but no separate mobile design beyond standard responsive)
- Authentication or user accounts
- Changes to the editor's form functionality or PDF generation

## 6. Design Considerations

### Visual Reference Hierarchy
1. **Primary reference**: Homepage (`app/page.tsx`) — colors, button styles (rounded), typography, animations
2. **Layout reference**: Stitch "CraftCV - Welcome (Cyber Style)" — card grid, content structure, info badges
3. **If homepage and Stitch conflict**: Homepage wins (per user instruction)

### Key Design Tokens (from Homepage)
| Token | Value |
|---|---|
| Background | `#050508` |
| Cyan accent | `#00f0ff` |
| Magenta accent | `#ff00aa` |
| Lime accent | `#b8ff00` |
| Card bg | `#0a0a12` |
| Text primary | `text-zinc-100` (white) |
| Text secondary | `text-zinc-400` (gray) |
| Font headlines | System sans (Geist) |
| Font code | Monospace |
| Border style | `border-[#00f0ff]/20` |
| Button style | `bg-[#00f0ff] text-black font-semibold` with rounded corners |

### Animations
- `fade-in-up` for staggered content reveal
- `float` for decorative elements
- Hover transitions on cards (`-translate-y-1`, border color change)

## 7. Technical Considerations

- **Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Lucide React
- **State**: Zustand store for CV data (already exists)
- **Import logic**: Reuse existing `importCVFromJSON` from `lib/json-handler.ts` and PDF import API from `app/api/ai/import-pdf/route.ts`
- **AppHeader**: Must be a client component (uses `usePathname` for active link detection)
- **Dashboard**: Client component (handles file input refs and router)

## 8. Success Metrics

- Homepage CTAs route to `/dashboard` instead of `/editor`
- All 3 dashboard actions work correctly (scratch, PDF import, JSON import)
- Consistent header across homepage, dashboard, and editor
- Visual consistency with homepage cyber aesthetic
- No regressions in editor functionality

## 9. Open Questions

None — all clarified during planning.
