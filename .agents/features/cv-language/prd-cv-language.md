# 📋 PRD: CV Language Settings

> **Feature**: CV Language Settings
> **Related**: First step towards GDPR Consent Feature (requires language context)
> **Status**: DRAFT

## 1. Overview
Currently, the CV generation assumes English (e.g., section titles like "Experience", dates formatted with English months like "January"). 
We need to allow users to specify the language of their CV. This choice will dynamically translate fixed labels in the generated PDF (section titles, default texts, date formatting). 
Initially, we will support **English (EN)** and **Italian (IT)**. This change acts as a prerequisite for language-specific features like the Italian GDPR consent text.

## 2. Goals
- Allow users to select the language of their CV (EN/IT).
- Automatically translate PDF section headers based on the selected language.
- Automatically format dates in the PDF based on the selected language.
- Persist the user's language choice in the `.json` export and local storage.

## 3. User Stories
- **As a user**, I want to be able to choose Italian as the language for my CV, so that my generated PDF has Italian section names (e.g., "Esperienza" instead of "Experience").
- **As a user**, I want the dates on my Italian CV to be formatted in Italian (e.g., "Gennaio 2020" instead of "January 2020" and "Presente" instead of "Present").
- **As a returning user**, I want my selected language to be remembered and exported/imported via JSON correctly.

## 4. Functional Requirements
1. **Data Model (Zustand/Types)**:
   - Add a `cvLanguage: "en" | "it"` field to `CVState` (or maybe within a new `settings` section in `CVState`).
   - Default value should be `"en"`.
   - Update `defaultCVState`, store actions (`setCVLanguage`), and `applyAiPatch` (if necessary, though AI probably shouldn't override user settings unless asked).
2. **Editor UI**:
   - Create a new "Settings" area in the application. Given the current layout, this could be:
     - A new tab/menu item in the `EditorSidebar` (e.g., "Impostazioni" / "Settings") alongside "Personal Info", "Experience", etc.
     - OR a distinct settings panel.
     - *Decision*: A new section in the sidebar "Settings" that renders a `SettingsForm` component.
   - The `SettingsForm` will contain a `<Select>` component to choose the CV language (English / Italian).
3. **PDF Generation (`cv-document.tsx`)**:
   - Create a simple translation dictionary/function.
   - Translate all hardcoded section headers: "Summary", "Experience", "Projects", "Education", "Languages", "Skills", "Certifications".
   - Update the `formatDate` function to accept the selected language and translate month names (e.g., "January" -> "Gennaio") and "Present" -> "Presente".
4. **JSON Handling (`json-handler.tsx`)**:
   - Ensure the new language/settings field is properly exported and imported, preserving backward compatibility.
5. **AI Optimizer Constraints**:
   - Pass the `cvLanguage` to the AI's internal context prompt so it knows whether to reply and rewrite text in English or Italian.
   - Prevent the AI from proposing changes to the `cvLanguage` field itself. The AI schema should *omit* the `cvLanguage` field entirely, treating it strictly as read-only configuration.

## 5. Non-Goals
- We are **not** translating the entire UI of the editor tool (buttons, forms, tooltips). The editor UI remains in English. We are only translating the **output PDF**.
- We are **not** automatically translating the user's free-text input (like their experience description).

## 6. Technical Considerations
- **Backward Compatibility**: JSON imports from previous versions won't have the `cvLanguage` field. The schema validator in `json-handler.tsx` needs to handle this gracefully.
- **AI Import**: The AI PDF extractor should ideally detect the language and set `cvLanguage` accordingly, but for MVP, we can just leave it as default (or update the prompt to include `cvLanguage` guessing).

## 7. Success Metrics
- User can toggle between EN and IT and immediately see the PDF headers and dates change.
- JSON export/import correctly preserves the `cvLanguage` state.

## 8. Open Questions (for User)
- **AI PDF Import**: Should we update the AI prompt to try and guess the language from the uploaded PDF and set it automatically?
- **Prompt Constraints**: The schema provided to the AI optimizer will not include `cvLanguage` so it cannot be overwritten by the user via chat request. Does that sound good?
