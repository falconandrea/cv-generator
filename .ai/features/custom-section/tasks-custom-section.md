# Tasks: Custom Section

## 1. Types & Store
- [ ] **1.1** Add `CustomSection` interface to `state/types.ts` (`{ title: string; content: string }`)
- [ ] **1.2** Add `customSection` field to `CVState` interface and `defaultCVState`
- [ ] **1.3** Add `customSection` to `CVPatch` (it inherits automatically via `Partial<Omit<CVState, "personalInfo">>`)
- [ ] **1.4** Add `setCustomSection` action to `state/store.ts`
- [ ] **1.5** Add `customSection` to `initialState`, `partialize`, `resetCV`, and `applyAiPatch`

## 2. Editor Form
- [ ] **2.1** Create `components/editor/custom-section-form.tsx` with title Input + content Textarea
- [ ] **2.2** Add "Custom" tab to `EditorTopNav.tsx` SECTIONS array (after Skills)
- [ ] **2.3** Add "Custom" step to `EditorSidebar.tsx` steps array (after Skills)
- [ ] **2.4** Add "Custom" `TabsContent` to `editor-content.tsx` (after Skills)

## 3. PDF Generation
- [ ] **3.1** Add Custom section rendering to `components/pdf/cv-document.tsx` (after Skills, before Certifications), only if `content` is non-empty. Use `customSection.title` as the section header.

## 4. AI Integration
- [ ] **4.1** Add `customSection` to the schema in `app/api/ai/optimize/route.ts` system prompt
- [ ] **4.2** Add `customSection` to the schema in `app/api/ai/import-pdf/route.ts` system prompt
- [ ] **4.3** Add `customSection` handling to `summarizeChanges()` in `ChatMessage.tsx`
- [ ] **4.4** Add `customSection` handling to `getEffectivePatch()` in `ChatMessage.tsx`
- [ ] **4.5** Add `customSection` diff view to `AiDiffModal.tsx`

## 5. Verification
- [ ] **5.1** Run `npm run build` to verify no TypeScript/compilation errors
- [ ] **5.2** Manual browser test: add custom section content, verify PDF preview
- [ ] **5.3** Manual browser test: export JSON, verify `customSection` is present, re-import
- [ ] **5.4** Manual browser test: leave content empty, verify section is hidden in PDF
