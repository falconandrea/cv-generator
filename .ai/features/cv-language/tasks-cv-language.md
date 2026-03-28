# 📝 Tasks: CV Language Settings

> **Feature**: CV Language Settings
> **Related PRD**: `prd-cv-language.md`
> **Status**: DRAFT

## Phase 1: Data Model & Store
- [ ] **1.1 Update Types (`state/types.ts`)**
  - Define `CVLanguage` type (`"en" | "it"`).
  - Add `cvLanguage?: CVLanguage` to `CVState` interface (optional for backwards compatibility, though default will be applied).
  - Add `setCVLanguage` action to store types.
  - Update `defaultCVState` to include `cvLanguage: "en"`.
- [ ] **1.2 Update Store (`state/store.ts`)**
  - Add `cvLanguage: "en"` to `initialState`.
  - Implement `setCVLanguage` action.
  - Add `cvLanguage` to the `partialize` configuration for `persist` middleware.

## Phase 2: Editor UI
- [ ] **2.1 Create Settings Form (`components/editor/settings-form.tsx`)**
  - Create a new component to display the language `<Select>`.
  - Connect it to `useCVStore` to read/write `cvLanguage`.
- [ ] **2.2 Update Sidebar (`components/editor/EditorSidebar.tsx`)**
  - Add a "Settings" tab/step at the end of the sidebar (or top, depending on PRD feedback).
  - Add corresponding icon (e.g., `Settings` from `lucide-react`).
- [ ] **2.3 Update Editor Content (`components/editor/editor-content.tsx`)**
  - Render the new `SettingsForm` when the "Settings" step is active.

## Phase 3: PDF Generation
- [ ] **3.1 Create Translation Dictionary (`lib/i18n.ts` or inline in `cv-document.tsx`)**
  - Define translations for section headers ("Summary", "Experience", etc.) for "en" and "it".
  - Define translations for "Present" -> "Presente".
  - Create a month translation map (1-12) for Italian.
- [ ] **3.2 Update Date Formatter (`components/pdf/cv-document.tsx`)**
  - Modify `formatDate(date: string | null)` to accept the selected language.
  - Output Italian month names if language is "it".
- [ ] **3.3 Update PDF Rendering (`components/pdf/cv-document.tsx`)**
  - Read `cv.cvLanguage` (fallback to "en").
  - Replace all hardcoded headers with the translated strings based on the selected language.

## Phase 4: Import / Export & AI Integrations
- [ ] **4.1 Update JSON Handler (`lib/json-handler.tsx`)**
  - Update `validateCVData` to accept `cvLanguage` (it's optional in the check so old JSONs don't break).
  - Ensure `exportCVAsJSON` includes `cvLanguage` in the exported object.
- [ ] **4.2 Update AI PDF Importer (`app/api/ai/import-pdf/route.ts`)**
  - *Optional/Nice-to-have*: Instruct the AI to detect the language of the uploaded PDF and return `cvLanguage` as "en" or "it" in the JSON schema.
- [ ] **4.3 Update AI Optimizer (`app/api/ai/optimize/route.ts`)**
  - Pass the current `cvLanguage` into the system prompt context so the AI knows which language to use when replying and rewriting content.
  - *Crucial*: Ensure the Zod schema provided to `generateObject` **does not** include `cvLanguage`. This guarantees the AI can never override the user's language setting via chat.
