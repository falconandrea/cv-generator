# 📋 Product Requirements Document (PRD)

> **Project**: Craft CV (CV generator ATS Ready)
> **Version**: 1.1.0 (Launch Prep)
> **Status**: MVP Completed & Deployed

## 1. Vision & Scope
**Problem**: Existing CV generators are expensive, limited, or not optimized for ATS (Applicant Tracking Systems).
**Solution**: A free, local-first web app to generate ATS-ready PDF CVs rapidly. Supports JSON export/import for data persistence without a database.
**Target Audience**: Tech professionals and job seekers needing quick, clean, compliant CVs.

## 2. Core Features (MVP + Upcoming)

### 2.1 Editor & Preview (Existing/Refine)
- **Form-based Input**: Personal Info, Summary, Experience, Education, Projects, Certifications.
- **NEW**: **Languages Section** (Language + Proficiency Level).
- **Live Preview**: Real-time rendering of the CV.
- **Export/Import**:
  - Save data as JSON.
  - Load data from JSON.
  - Download as PDF.

### 2.2 AI Integration (Completed)
- **CV Optimization**:
  - Input: Current CV Data + Job Description.
  - Action: AI rewrites/adjusts summary and bullet points to match JD keywords.
  - **Privacy**: **Sensitive data masking** (Name, Email, Phone, Social Links) BEFORE sending to AI.
  - User Consent: Explicit warning/toggle before sending data.
- **ATS Score Simulator**:
  - Upload PDF to get an AI-generated score, readability format check, and targeted feedback.
- **AI Advice & Diff View**: General suggestions to improve the CV content via an integrated Chat UI allowing to apply/reject line by line.

### 2.3 UX/UI Redesign (Completed)
- **Landing Page**: Simple, high-impact landing page (Inspo: makemycv.com).
- **Editor Layout**:
  - **Left**: Sidebar Stepper (Contact -> Experience -> etc.).
  - **Center**: Form Inputs.
  - **Right**: Live Preview (Sticky/Fixed).
- **Mobile Experience**: Fully responsive.

### 2.4 Privacy & Data (Completed)
- **No Database**: All data stays in the browser or is exported by the user.
- **AI Privacy**: PII Masking implemented for AI requests.

### 2.5 Launch & Analytics (Current Phase)
- **Tracking & Compliance**: Integration of GA4, GTM, CookieYes, and GSC to monitor user behavior and flow.
- **Community Feedback**: Strategy for launching on platforms like Reddit (e.g. `r/resumes`) to gather qualitative feedback and iterate.

## 3. Success Metrics
- Successful PDF generation without layout breaks.
- User ability to complete a CV from scratch in < 10 mins.
- "Optimize" feature produces coherent, relevant text changes.
- **New (Launch)**: 100+ unique visitors from Reddit launch.
- **New (Launch)**: 10+ PDF exports tracked via GA4 events.

## 4. Out of Scope (Current Phase)
- User Accounts / Login.
- Cloud Storage of CVs (Users must save JSON).
- Payment Processing (100% Free).
