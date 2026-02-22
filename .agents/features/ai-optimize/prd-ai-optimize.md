# PRD: AI Optimize — CV Chat Assistant

> **Feature**: AI Optimize  
> **Status**: Draft — Awaiting Approval  
> **Created**: 2026-02-22  
> **Author**: AI Agent (PLANNING MODE)

---

## 1. Overview

Users can access a dedicated **AI Optimize** mode within the existing editor. After filling in their CV data (or importing a JSON), they click an **"AI Optimize"** button to enter a split-screen view: the live PDF preview stays on the right, and an LLM-powered chat appears on the left. The user can paste a job description, ask questions, or request changes. The AI explains every proposed modification and applies it to the Zustand store only after the user explicitly confirms — reflecting changes in real time in the preview. The user can seamlessly switch back to the manual editor at any time.

---

## 2. Goals

- Allow users to improve CV content against a specific job description via natural language chat.
- Apply AI-suggested changes directly to the CV form/store (no copy-paste required).
- Keep all personal data private: PII fields are masked before being sent to the LLM.
- Make the feature accessible but non-intrusive: it lives behind a conditional button, not in the main flow.
- Support any OpenAI-compatible LLM provider via a single environment variable.

---

## 3. User Stories

1. **As a job seeker**, I want to paste a job description into the chat so the AI can suggest how to tailor my CV for that role.
2. **As a user**, I want the AI to always explain its proposed changes and ask for my confirmation before updating any field, so I stay in control.
3. **As a user**, I want to switch between the AI chat view and my manual editor without losing any data or changing the URL.
4. **As a privacy-conscious user**, I want to know that my name, email, phone number, and social links are never sent to the AI in clear text.
5. **As a self-hoster**, I want to configure any OpenAI-compatible LLM provider via an environment variable so I can use DeepSeek, OpenAI, or any other API.

---

## 4. Functional Requirements

### 4.1 Entry Point & Enablement
- `FR-01`: An **"AI Optimize"** button appears in the top action bar (near the "Download PDF" button).
- `FR-02`: The button is **disabled** until the user has filled in at least the Personal Info section (first name, last name, or email non-empty).
- `FR-03`: A tooltip on the disabled button reads: *"Fill in your personal info to unlock AI Optimize."*

### 4.2 View Switching (No URL Change)
- `FR-04`: Clicking "AI Optimize" switches the left panel from the form editor to the AI Chat panel. The right preview panel remains unchanged.
- `FR-05`: A **"← Back to Editor"** button replaces "AI Optimize" in the action bar while in AI mode.
- `FR-06`: Switching views preserves all CV data in the Zustand store — no data is lost.
- `FR-07`: The URL does not change when switching between Editor view and AI Optimize view.

### 4.3 Chat Interface
- `FR-08`: On first load of the AI chat, an **initial assistant message** appears automatically:
  > *"Hi! Paste the job description you're targeting, or just tell me what you'd like to improve in your CV."*
- `FR-09`: The user can type messages and submit them via Enter or a Send button.
- `FR-10`: The chat supports multi-turn conversation (full history is maintained during the session).
- `FR-11`: A loading indicator (spinner or typing animation) shows while the AI is processing.

### 4.4 AI Behavior & Confirmation Flow
- `FR-12`: The AI must **always explain its proposed changes** (which fields, what new content) before applying them.
- `FR-13`: After proposing changes, the AI presents a **"Apply changes"** confirmation action (inline button in the chat bubble or a chat message asking the user to confirm).
- `FR-14`: Only after explicit user confirmation (e.g., user types "yes", "apply", or clicks a confirm button) does the AI call a function to update the Zustand store.
- `FR-15`: The AI can update any CV field **except** the Personal Info section (name, email, phone, address, social links). If asked to change those, it politely declines.
- `FR-16`: Updatable sections: Summary, Experience (role title, bullet points, description), Education (description), Projects (description, stack), Certifications (name, description), Languages, Skills.

### 4.5 Privacy & PII Masking
- `FR-17`: Before any CV data is sent to the LLM, the following fields are replaced with placeholders:
  - Full name → `[CANDIDATE NAME]`
  - Email → `[EMAIL]`
  - Phone → `[PHONE]`
  - Website / LinkedIn / GitHub URLs → `[LINK]`
- `FR-18`: A **one-time privacy notice** is shown the first time the user enters AI Optimize mode:
  > *"Your personal info (name, email, phone, and links) will be masked before being sent to the AI."*
  - User dismisses with "Got it". This preference is saved to `localStorage`.

### 4.6 LLM Provider Configuration
- `FR-19`: The LLM provider is configured via environment variables in `.env.local`:
  - `AI_PROVIDER_BASE_URL` — the OpenAI-compatible base URL (e.g., `https://api.deepseek.com/v1`)
  - `AI_PROVIDER_API_KEY` — the API key
  - `AI_PROVIDER_MODEL` — the model name (e.g., `deepseek-chat`, `gpt-4o`)
- `FR-20`: The API call is made server-side via a Next.js API Route (`/api/ai/optimize`) to keep the API key secret.
- `FR-21`: The API route uses the OpenAI SDK (already compatible with most providers via `baseURL` override).

---

## 5. Non-Goals (Out of Scope)

- Persistent chat history across browser sessions (chat resets on page reload).
- PDF re-generation triggered by AI — it continues to use the existing live preview pipeline.
- AI editing of Personal Info fields (name, email, phone, links).
- File upload of the job description (text paste only).
- Multiple simultaneous AI conversations or profiles.
- Any form of user authentication or cloud storage.

---

## 6. Design Considerations

### 6.1 Layout
- The AI Optimize view shares the same two-column layout as the editor:
  - **Left column** (replaces form): Chat interface — message history (scrollable) + input bar at bottom.
  - **Right column** (unchanged): Live PDF preview.
- The top action bar remains visible with the "← Back to Editor" button replacing "AI Optimize".

### 6.2 Chat UI
- Messages are displayed as chat bubbles (user: right-aligned / AI: left-aligned).
- AI messages that contain proposed changes should have a visual distinction (e.g., different background color, a ✏️ icon, or a bordered "Proposed changes" block).
- Confirmation can be:
  - An inline **"✅ Apply"** / **"❌ Skip"** button pair within the AI message bubble, OR
  - The AI explicitly asking "Should I apply these changes?" and listening for "yes"/"no".
  - Recommended: inline button pair for clarity and UX.

### 6.3 Privacy Notice
- Shown as a dismissible `Alert` (shadcn/ui `Alert` component) at the top of the chat panel, **only on first open**.

### 6.4 Disabled Button State
- "AI Optimize" button uses `disabled` attribute with reduced opacity + tooltip via shadcn/ui `Tooltip`.

---

## 7. Technical Considerations

- **Framework**: Next.js 16 (App Router) — TypeScript.
- **State**: Zustand store holds all CV data. AI updates are patches applied via Zustand's `set()`.
- **View toggle**: A boolean state variable (e.g., `isAiMode`) in the Editor page controls which left-panel component renders. No routing change.
- **API**: New Next.js API Route at `/api/ai/optimize` using the `openai` npm package with `baseURL` override.
- **LLM interaction pattern**: The AI must use **function calling / structured output** to return proposed field changes. The frontend then awaits user confirmation before applying the patch to the Zustand store.
- **Streaming**: Optional (nice-to-have). The initial implementation can use non-streaming for simplicity.
- **PII Masking**: Pure utility function (no library needed) — runs client-side before sending data to the API route.
- **Dependencies**: `openai` npm package (if not already installed).

---

## 8. Success Metrics

- User can reach the AI chat, paste a JD, and receive relevant CV improvement suggestions in under 30 seconds.
- AI-proposed changes are applied correctly to the Zustand store and reflected in the live preview.
- No PII (name, email, phone, links) appears in any LLM API call payload (verifiable via network inspection).
- The user can switch between editor and AI mode without any data loss.
- The feature works with at least DeepSeek and OpenAI GPT-4o via env config.

---

## 9. Open Questions

- Should the AI receive the **full CV data** on every message, or only on the first message (then only diffs on updates)? → Recommend: send full masked CV on every request (simpler, stateless).
- Should "Apply" / "Skip" buttons still appear if the AI message contains no proposed changes (e.g., a "I can't do that" reply)? → No, only show buttons when the AI returns a `proposed_changes` structured payload.
- What happens if the API call fails? → Show an error message in the chat bubble, allow the user to retry.
