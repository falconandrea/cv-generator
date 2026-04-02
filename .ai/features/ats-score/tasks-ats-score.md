# Tasks: ATS Score

Based on: prd-ats-score.md

## Relevant Files
- `package.json` - For adding `pdf-parse`
- `app/api/ai/analyze-ats/route.ts` - New API route for PDF parsing and AI invocation
- `app/ats-score/page.tsx` - Main UI page
- `components/ats/Dropzone.tsx` - Component for uploading PDF
- `components/ats/ResultsDashboard.tsx` - Component to display AI breakdown

## Instructions
**IMPORTANT:** As you complete each task, mark it by changing `- [ ]` to `-[x]`.
Update after completing each sub-task, not just parent tasks.

## Tasks

- [x] 1.0 Setup Backend and Dependencies
  - [x] 1.1 `npm install pdf-parse`
  - [x] 1.2 `npm install --save-dev @types/pdf-parse` (if available)

- [x] 2.0 API Route Creation
  - [x] 2.1 Create `app/api/ai/analyze-ats/route.ts`
  - [x] 2.2 Implement form-data parsing for PDF file and optional JD
  - [x] 2.3 Implement `pdf-parse` extraction logic off the buffer
  - [x] 2.4 Create strict AI prompt asking for JSON schema: `{ score, formatting, impact, keywordMatch (if jd), feedback: [{ title, status, description }] }`

- [x] 3.0 Frontend Core Components
  - [x] 3.1 Create `components/ats/Dropzone.tsx` for file upload and JD text area
  - [x] 3.2 Add "Cyber Style" loading animation while waiting for API
  - [x] 3.3 Create `components/ats/ResultsDashboard.tsx` and score visualizers (Gauge/Progress)

- [x] 4.0 Page Assembly & Routing
  - [x] 4.1 Create `app/ats-score/page.tsx` integrating the Dropzone and ResultsDashboard
  - [x] 4.2 Link `/ats-score` in `AppHeader`
  - [x] 4.3 Add permanent disclaimer about "AI-powered simulation"


