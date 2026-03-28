# Tasks: Dashboard Redesign

Based on: prd-dashboard-redesign.md

## Relevant Files

- `components/layout/AppHeader.tsx` - [NEW] Shared header component with conditional nav links and CTA
- `components/layout/Header.tsx` - [DELETE] Old editor header, replaced by AppHeader
- `app/dashboard/page.tsx` - [NEW] Dashboard page with cyber aesthetic and 3 action cards
- `app/editor/page.tsx` - [MODIFY] Remove WelcomeDialog, use AppHeader, cleanup imports
- `app/page.tsx` - [MODIFY] Replace inline header with AppHeader, update all `/editor` links to `/dashboard`
- `components/editor/welcome-dialog.tsx` - [DELETE] No longer needed (dashboard replaces it)
- `lib/json-handler.tsx` - Reference for `importCVFromJSON` reuse
- `components/editor/pdf-import-dialog.tsx` - Reference for PDF import `processFile` logic extraction
- `app/globals.css` - Reference for retro-grid, animations, CSS variables

## Instructions

**IMPORTANT:** As you complete each task, mark it by changing `- [ ]` to `- [x]`.
Update after completing each sub-task, not just parent tasks.

## Tasks

- [ ] 1.0 Create shared `AppHeader` component
  - [ ] 1.1 Create `components/layout/AppHeader.tsx` as a client component (`"use client"`)
  - [ ] 1.2 Define TypeScript interface for props: `showStartBuilding?: boolean`, `navLinks?: Array<{ label: string, href: string, disabled?: boolean, badge?: string }>`
  - [ ] 1.3 Implement header layout matching homepage inline header exactly:
    - Dark bg with `border-b border-[#00f0ff]/20 px-6 py-4`
    - Logo: `Terminal` icon (cyan) + "CRAFT" + "_CV" (cyan span), wrapped in `<Link href="/">`
    - `text-xl font-bold tracking-tight`
  - [ ] 1.4 Implement nav links section (between logo and CTA):
    - Map `navLinks` array, render as `<Link>` or `<span>` (if disabled)
    - Style: `text-sm text-zinc-400 hover:text-[#00f0ff] transition-colors`
    - Active link detection via `usePathname()` → highlight with `text-[#00f0ff]`
    - Disabled: `opacity-50 cursor-not-allowed pointer-events-none`
    - Badge rendering: small `text-[10px] bg-[#00f0ff]/20 text-[#00f0ff] px-1.5 py-0.5 font-mono uppercase` inline next to label
  - [ ] 1.5 Implement optional "Start Building" CTA button (only rendered when `showStartBuilding={true}`):
    - `<Link href="/dashboard">` wrapping `<Button>` with `bg-[#00f0ff] text-black hover:bg-[#00f0ff]/80 font-semibold`
  - [ ] 1.6 Ensure responsive: nav links hidden on mobile (`hidden md:flex`), logo always visible

- [ ] 2.0 Create `/dashboard` page
  - [ ] 2.1 Create `app/dashboard/page.tsx` as `"use client"` component
  - [ ] 2.2 Add page layout structure:
    - Full-page dark bg `bg-[#050508] text-white min-h-screen flex flex-col`
    - Fixed retro-grid background overlay (reuse same pattern from homepage)
    - Radial gradient glow overlay
  - [ ] 2.3 Add `<AppHeader>` with nav links config:
    - `navLinks={[{ label: "Dashboard", href: "/dashboard" }, { label: "Editor", href: "/editor" }, { label: "ATS Score", href: "#", disabled: true, badge: "Soon" }]}`
    - `showStartBuilding={false}`
  - [ ] 2.4 Build hero section:
    - Tech label in mono font: `> SYSTEM.INITIALIZATION` with cyan color
    - Title: "Build your professional CV in minutes" — large bold text with gradient accent
    - Subtitle: Technical description in `text-zinc-400 font-mono text-sm`
    - Apply `fade-in-up` staggered animations
  - [ ] 2.5 Build 3 action cards in 2-column grid layout:
    - Grid: `grid-cols-1 lg:grid-cols-2 gap-6` — left card spans full height, right column has 2 stacked cards
    - Card base style: `bg-[#0a0a12] border border-zinc-800 hover:border-[accent] p-8 transition-all duration-300 hover:-translate-y-1`
  - [ ] 2.6 Implement "Start from Scratch" card (left, large):
    - Cyan accent (`#00f0ff`), plus icon in colored bg circle
    - Title + description + mono-font CTA link "INITIALIZE_WORKSPACE →"
    - `onClick` → `router.push('/editor')`
  - [ ] 2.7 Implement "Import from PDF" card (right top):
    - Magenta accent (`#ff00aa`), file icon
    - Title + description
    - Hidden `<input type="file" accept=".pdf">` ref, card click triggers file picker
  - [ ] 2.8 Implement "Import from JSON" card (right bottom):
    - Lime accent (`#b8ff00`), code icon
    - Title + description
    - Hidden `<input type="file" accept=".json">` ref, card click triggers file picker
  - [ ] 2.9 Build bottom info badges row (3 columns):
    - "ATS Compliant Output" (FileText icon, cyan), "Encrypted Data Privacy" (Lock icon, magenta), "Real-time AI Coaching" (Sparkles icon, lime)
    - Mono uppercase label above, white text value below
    - Staggered `fade-in-up` animations
  - [ ] 2.10 Add footer matching homepage footer style

- [ ] 3.0 Implement import flows from dashboard
  - [ ] 3.1 Extract PDF processing logic: Reuse the `processFile` callback pattern from `pdf-import-dialog.tsx` inside dashboard — call `/api/ai/import-pdf`, parse response, populate Zustand store via `useCVStore()`
  - [ ] 3.2 Add loading state for PDF import: show a loading toast or overlay while AI processes the PDF
  - [ ] 3.3 On successful PDF import → `router.push('/editor')` with toast success
  - [ ] 3.4 Implement JSON import flow: reuse `importCVFromJSON` from `lib/json-handler.tsx`, trigger via hidden file input, populate store, then `router.push('/editor')`
  - [ ] 3.5 Handle error cases: invalid file type, file too large, API errors — show toast errors, stay on dashboard

- [ ] 4.0 Update editor page
  - [ ] 4.1 Replace `import { Header } from "@/components/layout/Header"` with `import { AppHeader } from "@/components/layout/AppHeader"`
  - [ ] 4.2 Replace `<Header />` with `<AppHeader navLinks={[...]} />` (Dashboard, Editor active, ATS Score disabled+Soon), no showStartBuilding
  - [ ] 4.3 Remove `WelcomeDialog` import and `<WelcomeDialog>` JSX
  - [ ] 4.4 Remove `welcomeOpen` state, `isCVEmpty` computed value, and the `useEffect` that opens the welcome dialog
  - [ ] 4.5 Keep all other editor functionality intact: sub-header, preview, AI panel, PDF import dialog (still used from editor top nav), JSON import/export
  - [ ] 4.6 Verify editor still works when accessed directly via URL `/editor`

- [ ] 5.0 Update homepage routing & header
  - [ ] 5.1 Replace inline `<header>` in `app/page.tsx` with `<AppHeader showStartBuilding={true} />`
  - [ ] 5.2 Update all `<Link href="/editor">` to `<Link href="/dashboard">` in `app/page.tsx` (hero CTA, bottom CTA)
  - [ ] 5.3 Ensure homepage does NOT show nav links (no `navLinks` prop passed to AppHeader)
  - [ ] 5.4 Verify homepage visual appearance matches current design exactly

- [ ] 6.0 Cleanup & Testing
  - [ ] 6.1 Delete `components/layout/Header.tsx` (old editor header)
  - [ ] 6.2 Delete or keep `components/editor/welcome-dialog.tsx` — verify no other imports reference it, then delete
  - [ ] 6.3 Test full flow: Homepage → Dashboard → Start from Scratch → Editor (empty)
  - [ ] 6.4 Test full flow: Homepage → Dashboard → Import PDF → Editor (populated)
  - [ ] 6.5 Test full flow: Homepage → Dashboard → Import JSON → Editor (populated)
  - [ ] 6.6 Test direct URL access: `/editor` loads correctly without redirect
  - [ ] 6.7 Test ATS Score link is disabled with "Soon" badge, not clickable
  - [ ] 6.8 Test responsive: mobile viewport on dashboard, header nav hidden
  - [ ] 6.9 Verify no console errors or broken imports
  - [ ] 6.10 Update `.ai/memory/progress.md` with completed feature
