# 📋 Product Requirements Document (PRD)

> **Project**: Craft CV
> **Feature**: Stats Counters (Anonymous usage tracking)
> **Status**: APPROVED / PLANNING

## 1. Overview
The goal is to implement internal anonymous counters to track platform usage (CVs created, AI messages exchanged, PDFs uploaded, and ATS tests performed). These counters will be stored locally on the server in a JSON file without the need to introduce an external database like MySQL/Postgres.

## 2. Goals
- Keep track of key platform metrics to understand user engagement.
- Store this tracking safely and persistently via Docker Volumes.
- Maintain the system lightweight and "database-less".

## 3. User Stories
- As an administrator, I want to be able to read a JSON file on the server to gather usage statistics.
- As a user, my actions (downloading a PDF, sending an AI prompt) should anonymously increment global counters without slowing down my requests.

## 4. Functional Requirements
1. **Counter Triggers**:
    - `cv_created`: Incremented every time a user downloads a generated CV from the frontend.
    - `ai_messages`: Incremented every time a prompt is sent to `/api/ai/optimize`, `/api/ai/chat` (if exists), etc.
    - `pdf_uploaded`: Incremented every time a user uploads a PDF to `/api/ai/import-pdf`.
    - `ats_tests`: Incremented every time a user requests an ATS score at `/api/ai/analyze-ats`.
2. **Storage**:
    - A JSON file located inside `/app/data/stats.json`.
    - Docker config must map `./data:/app/data` to the host to ensure persistence.
3. **API for Frontend**:
    - Create a new endpoint `POST /api/stats/increment` to allow the client to increment the `cv_created` counter when the specific frontend action happens (the other API counters will be incremented directly server-side).
4. **Concurrency**:
    - Uses basic asynchronous read/write `fs.promises` as low-traffic setup (acceptable minimal risk of overwriting simultaneous hits).

## 5. Non-Goals (Out of Scope)
- Developing a frontend UI dashboard to visualize these stats.
- Tracking user IPs, session details, or any PII.
- Using complex message queues or database setups.

## 6. Design Considerations
- No UI changes are needed. Tracking will be completely invisible to the end user.

## 7. Technical Considerations
- **Persistence**: Because Next.js creates serverless endpoints and we are running via a Docker container, we need to guarantee that the `data` directory exists and has the correct permissions to be written by the Next.js process (`node`). In `docker-compose.yml`, we need a volume mount.
- **Fail-safe**: If reading/writing to `stats.json` fails, it should NOT crash the main API endpoints. It should simply `console.error` and move on.

## 8. Success Metrics
- JSON file correctly reflects counts matching approximate usage.
- Container reboots do not erase the JSON file.

## 9. Open Questions
- None.
