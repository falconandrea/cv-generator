# 📅 Implementation Plan

## Phase 1: Foundation & Cleanup
- [x] Review `package.json` dependencies.
- [x] Ensure Docker build works locally.
- [x] Refactor `store.ts` to support new fields (Languages) and ensure type safety.

## Phase 2: Frontend Redesign (Layout)
- [x] **Landing Page**: Create `app/page.tsx` (Landing) and move Editor to `app/editor/page.tsx` (already there).
- [x] **Navigation**: Add Header/Footer.
- [x] **Editor UI**:
    - [x] Implement Sidebar/Stepper component.
    - [x] Create "Split View" layout (Form Left, Preview Right).
    - [x] Ensure Mobile responsiveness (Tabs/Drawer for steps).

## Phase 3: Core Features
- [x] **Languages Section**: Add to Store, Form, and PDF Template.
- [x] **PDF Template Tweaks**: Ensure it handles potentially longer content gracefully.

## Phase 4: AI Integration
- [x] **Backend**: Setup `/api/ai/optimize` route.
- [x] **Service**: Implement DeepSeek/GLM client.
- [x] **Frontend**:
    - [x] "Optimize" UI (Modal/Drawer).
    - [x] Job Description Input.
    - [x] Privacy Toggle & PII Masking utility.
    - [x] "Apply Changes" logic.

## Phase 5: Polish & Deploy
- [x] Test JSON Import/Export with new fields.
- [x] Verify Docker production build.
- [x] Final UI Polish (Animations, Dark Mode consistency).
- [x] Production deployment to `craftcv.online`.

## Phase 6: Launch & Feedback Strategy
- [ ] Implement Analytics & Tracking:
    - [ ] Google Tag Manager (GTM).
    - [ ] Google Analytics 4 (GA4).
    - [ ] CookieYes integration for compliance.
    - [ ] Google Search Console validation.
- [ ] Community Launch:
    - [ ] Prepare Reddit posts (e.g. for `r/resumes`, `r/SideProject`).
    - [ ] Gather initial feedback and monitor analytics.
