# 📋 Product Requirements Document (PRD): ATS Score

> **Feature**: ATS (Applicant Tracking System) Score Simulation
> **Path**: `/ats-score` (Landing page / Tool page)
> **Status**: Planning

## 1. Overview
The ATS Score feature allows users to upload an existing CV in PDF format and visually see how an Applicant Tracking System would parse and evaluate it. Optionally, users can provide a Job Description (JD) to receive a tailored "Keyword Match" score. This feature serves as a strong top-of-funnel marketing tool to attract users to the CraftCV platform by highlighting areas where their current CV might fail in real-world recruitment systems.

## 2. Goals
- Provide users with immediate, actionable feedback on their current CV's readability, impact, and formatting.
- Simulate the behavior of enterprise ATS parsers.
- Act as a lead magnet to drive users towards using the CraftCV editor if their score is low.
- Ensure the user understands this is a highly realistic simulation.

## 3. User Stories
- As a job seeker, I want to upload my PDF CV so that I can see if an ATS can correctly read my information.
- As a job seeker, I want to paste a Job Description so that I can see my "Keyword Match" score and identify missing skills.
- As a user, I want to see clear recommendations on exactly which action verbs to add or which formatting issues to fix.

## 4. Functional Requirements
1. **PDF Upload Mechanism**: A drag-and-drop zone to accept `.pdf` files.
2. **Job Description Input**: An optional text area for pasting a JD or requirements.
3. **PDF Text Extraction**: A server-side or edge capability to extract raw text content from the uploaded PDF to test true parser readability.
4. **AI Evaluation Prompting**:
   - Send the extracted PDF text (and optional JD) to the AI endpoint.
   - The AI must evaluate: *Keyword Match (if JD present), Action Verbs, Impact Metrics, Brevity/Clarity, and Missing Essential Info (dates, contacts).*
5. **Loading State**: An engaging "Cyber Style" scanning animation while the AI processes the document.
6. **Score Dashboard**:
   - Overall Score (0-100).
   - Component scores (Formatting, Impact, Keyword Match).
   - Actionable checklist of "Passed" vs "Warning" vs "Failed" items.
7. **Disclaimer**: A permanent UI note explaining that this is an AI-powered simulation of ATS logic, not the exact algorithm of a specific company.

## 5. Non-Goals (Out of Scope for now)
- Supporting file formats other than PDF (no `.docx`, `.doc`).
- Storing the uploaded CVs or ATS reports in a database.
- Maintaining an ATS report history (score is lost on refresh).
- Directly parsing the CraftCV `localStorage` JSON for this specific tool (this tool strictly tests PDF parsability).

## 6. Design Considerations
- **Cyber Style Aesthetic**: The UI must match the new dashboard's modern, sleek, "hacker/cyber" aesthetic.
- **Micro-Animations**: The uploading and scanning process should feel "technical" and "deep", like a system analyzing data streams.
- **Typography & Colors**: Use the existing Tailwind colors (e.g., neon accents for high scores, warnings for low scores).

## 7. Technical Considerations
- **Text Extraction**: We will need a lightweight PDF extraction library (e.g., `pdf-parse` for the backend API route, or similar) to read the PDF buffer.
- **Security & Privacy**: The PDF is processed in memory on the API route and sent to the AI. It must not be saved to disk.
- **AI API Limitations**: Text extraction from long PDFs combined with long JDs must stay within the context window limits of our current AI provider (DeepSeek/GLM).

## 8. Success Metrics
- Average time spent on the ATS score page.
- Conversion rate: Percentage of users who check their ATS score and then click "Create a new CV" with our editor.
- Zero server errors during PDF parsing for standard, text-based PDF files.

## 9. Open Questions
- Do we want to limit the file size for the PDF upload (e.g., max 2MB or 5MB)?
- Which precise AI JSON schema do we want to return? (e.g., `{ score: number, keywords_found: string[], improvements: string[] }`).
