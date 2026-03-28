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

- [x] 1.0 Create shared `AppHeader` component
  - [x] 1.1 Create `components/layout/AppHeader.tsx` as a client component (`"use client"`)
  - [x] 1.2 Define TypeScript interface for props: `showStartBuilding?: boolean`, `navLinks?: Array<{ label: string, href: string, disabled?: boolean, badge?: string }>`
  - [x] 1.3 Implement header layout matching homepage inline header exactly
  - [x] 1.4 Implement nav links section (between logo and CTA)
  - [x] 1.5 Implement optional "Start Building" CTA button (only rendered when `showStartBuilding={true}`)
  - [x] 1.6 Ensure responsive: nav links hidden on mobile (`hidden md:flex`), logo always visible

- [x] 2.0 Create `/dashboard` page
  - [x] 2.1 Create `app/dashboard/page.tsx` as `"use client"` component
  - [x] 2.2 Add page layout structure
  - [x] 2.3 Add `<AppHeader>` with nav links config
  - [x] 2.4 Build hero section
  - [x] 2.5 Build 3 action cards in 2-column grid layout
  - [x] 2.6 Implement "Start from Scratch" card (left, large)
  - [x] 2.7 Implement "Import from PDF" card (right top)
  - [x] 2.8 Implement "Import from JSON" card (right bottom)
  - [x] 2.9 Build bottom info badges row (3 columns)
  - [x] 2.10 Add footer matching homepage footer style

- [x] 3.0 Implement import flows from dashboard
  - [x] 3.1 Extract PDF processing logic
  - [x] 3.2 Add loading state for PDF import
  - [x] 3.3 On successful PDF import → `router.push('/editor')` with toast success
  - [x] 3.4 Implement JSON import flow
  - [x] 3.5 Handle error cases

- [x] 4.0 Update editor page
  - [x] 4.1 Replace `Header` import with `AppHeader`
  - [x] 4.2 Replace `<Header />` with `<AppHeader navLinks={[...]} />`
  - [x] 4.3 Remove `WelcomeDialog` import and JSX
  - [x] 4.4 Remove `welcomeOpen` state, `isCVEmpty`, and related `useEffect`
  - [x] 4.5 Keep all other editor functionality intact
  - [x] 4.6 Verify editor still works when accessed directly via URL `/editor`

- [x] 5.0 Update homepage routing & header
  - [x] 5.1 Replace inline `<header>` in `app/page.tsx` with `<AppHeader showStartBuilding={true} />`
  - [x] 5.2 Update all `<Link href="/editor">` to `<Link href="/dashboard">` in `app/page.tsx`
  - [x] 5.3 Ensure homepage does NOT show nav links
  - [x] 5.4 Verify homepage visual appearance matches current design exactly

- [x] 6.0 Cleanup & Testing
  - [x] 6.1 Delete `components/layout/Header.tsx` (old editor header)
  - [x] 6.2 Delete `components/editor/welcome-dialog.tsx`
  - [x] 6.3 Test full flow: Homepage → Dashboard → Start from Scratch → Editor (empty)
  - [x] 6.4 Test full flow: Homepage → Dashboard → Import PDF → Editor (populated)
  - [x] 6.5 Test full flow: Homepage → Dashboard → Import JSON → Editor (populated)
  - [x] 6.6 Test direct URL access: `/editor` loads correctly without redirect
  - [x] 6.7 Test ATS Score link is disabled with "Soon" badge, not clickable
  - [x] 6.8 Test responsive: mobile viewport on dashboard, header nav hidden
  - [x] 6.9 Verify no console errors or broken imports
  - [x] 6.10 Update `.ai/memory/progress.md` with completed feature
