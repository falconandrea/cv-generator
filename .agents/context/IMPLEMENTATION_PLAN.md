# 📅 Implementation Plan

## Phase 1: Foundation & Cleanup
- [ ] Review `package.json` dependencies.
- [ ] Ensure Docker build works locally.
- [ ] Refactor `store.ts` to support new fields (Languages) and ensure type safety.

## Phase 2: Frontend Redesign (Layout)
- [ ] **Landing Page**: Create `app/page.tsx` (Landing) and move Editor to `app/editor/page.tsx` (already there).
- [ ] **Navigation**: Add Header/Footer.
- [ ] **Editor UI**:
    - [ ] Implement Sidebar/Stepper component.
    - [ ] Create "Split View" layout (Form Left, Preview Right).
    - [ ] Ensure Mobile responsiveness (Tabs/Drawer for steps).

## Phase 3: Core Features
- [ ] **Languages Section**: Add to Store, Form, and PDF Template.
- [ ] **PDF Template Tweaks**: Ensure it handles potentially longer content gracefully.

## Phase 4: AI Integration
- [ ] **Backend**: Setup `/api/ai/optimize` route.
- [ ] **Service**: Implement DeepSeek/GLM client.
- [ ] **Frontend**:
    - [ ] "Optimize" UI (Modal/Drawer).
    - [ ] Job Description Input.
    - [ ] Privacy Toggle & PII Masking utility.
    - [ ] "Apply Changes" logic.

## Phase 5: Polish & Deploy
- [ ] Test JSON Import/Export with new fields.
- [ ] Verify Docker production build.
- [ ] Final UI Polish (Animations, Dark Mode consistency).
