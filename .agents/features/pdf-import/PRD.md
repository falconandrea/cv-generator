# PRD: PDF-to-CV Import

## Objective
Streamline the initial onboarding experience for new users by allowing them to bootstrap their CV data from an existing PDF resume.

## User Stories
- As a new user, I want to upload my current PDF CV so that I don't have to manually re-type everything.
- As a user, I want to see a clear loading state while the AI is analyzing my PDF.
- As a user, I want my CV form to be automatically populated after the import.

## Features
### 1. PDF Upload Interface
- Add an "Import from PDF" button to the Editor top navigation.
- Add a prominent Call-to-Action (CTA) box above the personal info form: "Pre-fill your form by uploading your CV in PDF format".
- Support file selection for `.pdf` files.

### 2. Text Extraction & AI Analysis
- Extract raw text from the uploaded PDF.
- Send the text to the LLM with a specialized prompt to extract structured data matching the `CVState` schema.
- Map the LLM output to the Zustand store.

### 3. Loading & Feedback
- Show a loading spinner/overlay while the PDF is being processed.
- Show success/error toasts using `sonner`.

## Technical Requirements
- **PDF Extraction**: Use `pdf-parse` in a Next.js API route.
- **LLM**: Use the configured AI provider to transform raw text into JSON.
- **API**: Create a new endpoint `/api/ai/import-pdf`.

## Acceptance Criteria
- [ ] User can click "Import from PDF" and select a file.
- [ ] The file is sent to the server, text is extracted, and AI returns a valid JSON.
- [ ] The editor form is populated with the extracted data.
- [ ] Errors (invalid files, AI failure) are handled gracefully with user-facing messages.
