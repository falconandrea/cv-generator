# Tasks: AI Optimize — CV Chat Assistant

Based on: `prd-ai-optimize.md`

---

## Relevant Files

### New files to create
- `app/api/ai/optimize/route.ts` — Server-side Next.js API Route; handles LLM calls, PII masking, and returns proposed changes
- `components/ai/AiOptimizePanel.tsx` — Main AI chat panel component (replaces left column in AI mode)
- `components/ai/ChatMessage.tsx` — Single chat bubble component (user / assistant), with inline Apply/Skip buttons
- `components/ai/PrivacyNotice.tsx` — Dismissible one-time privacy alert shown at top of chat panel
- `lib/pii-masker.ts` — Utility: masks PII fields in CV data before sending to LLM
- `lib/ai-client.ts` — Client-side helper: sends messages to `/api/ai/optimize` and parses the response
- `.env.local.example` — Documents the required env vars: `AI_PROVIDER_BASE_URL`, `AI_PROVIDER_API_KEY`, `AI_PROVIDER_MODEL`

### Files to modify
- `app/editor/page.tsx` — Add `isAiMode` state toggle; conditionally render `AiOptimizePanel` vs form editor in left column
- `components/layout/EditorTopNav.tsx` (or equivalent action bar) — Add "AI Optimize" button (with disabled+tooltip state) and "← Back to Editor" button
- `state/store.ts` — Add `applyAiPatch(patch)` action to apply partial CV updates from AI confirmations
- `state/types.ts` — Add `AiMessage` type and any new types for AI proposed changes payload

---

## Instructions

**IMPORTANT:** As you complete each task, mark it by changing `- [ ]` to `- [x]`.  
Update after completing each sub-task, not just parent tasks.

---

## Tasks

- [ ] 1.0 Environment & Dependencies Setup
  - [ ] 1.1 Add `openai` npm package if not already in `package.json` (`npm install openai`)
  - [ ] 1.2 Create `.env.local.example` documenting `AI_PROVIDER_BASE_URL`, `AI_PROVIDER_API_KEY`, `AI_PROVIDER_MODEL`
  - [ ] 1.3 Add the three env vars to `.env.local` (developer configures with their own keys)
  - [ ] 1.4 Ensure `next.config.ts` exposes server-side env vars to the API route (no client exposure)

- [ ] 2.0 PII Masking Utility
  - [ ] 2.1 Create `lib/pii-masker.ts` with a `maskPii(cvData: CvData): CvData` function
  - [ ] 2.2 Mask fields: `personalInfo.name`, `personalInfo.email`, `personalInfo.phone`, `personalInfo.website`, `personalInfo.linkedin`, `personalInfo.github` (and any other link fields in `state/types.ts`)
  - [ ] 2.3 Replace values with descriptive placeholders: `[CANDIDATE NAME]`, `[EMAIL]`, `[PHONE]`, `[LINK]`
  - [ ] 2.4 Verify the function returns a deep copy (does not mutate the original store data)

- [ ] 3.0 Server-Side API Route
  - [ ] 3.1 Create `app/api/ai/optimize/route.ts` (Next.js App Router `POST` handler)
  - [ ] 3.2 Accept request body: `{ messages: AiMessage[], cvData: CvData }` where `cvData` is already PII-masked by the client
  - [ ] 3.3 Build the system prompt instructing the AI to: (a) help tailor the CV to a job description, (b) always explain proposed changes before applying, (c) return structured `proposed_changes` JSON when suggesting edits, (d) never suggest edits to personal info fields
  - [ ] 3.4 Call the LLM using the `openai` SDK with `baseURL` set from `AI_PROVIDER_BASE_URL` env var, using `AI_PROVIDER_MODEL`
  - [ ] 3.5 Return the AI response text and any `proposed_changes` structured payload to the client
  - [ ] 3.6 Add error handling: return `{ error: string }` with appropriate HTTP status on LLM failure

- [ ] 4.0 Zustand Store Update
  - [ ] 4.1 Read `state/types.ts` and add `AiMessage` type: `{ role: 'user' | 'assistant'; content: string; proposedChanges?: Partial<CvData> }`
  - [ ] 4.2 Read `state/store.ts` and add `applyAiPatch(patch: Partial<CvData>): void` action that does a deep merge of the patch into the current CV data
  - [ ] 4.3 Verify that applying a patch triggers a Zustand subscription update (so the live preview re-renders)

- [ ] 5.0 AI Chat UI Components
  - [ ] 5.1 Create `components/ai/PrivacyNotice.tsx` — shadcn/ui `Alert` with the privacy disclaimer; reads/writes `localStorage` key `ai_privacy_dismissed`; shows only if not dismissed
  - [ ] 5.2 Create `components/ai/ChatMessage.tsx` — renders a single chat bubble; user messages right-aligned, assistant left-aligned; if message has `proposedChanges`, show "✅ Apply" / "❌ Skip" inline buttons
  - [ ] 5.3 Create `lib/ai-client.ts` — async function `sendMessage(messages, cvData)` that calls `/api/ai/optimize`, runs `maskPii` on `cvData` before sending, returns `{ content, proposedChanges? }`
  - [ ] 5.4 Create `components/ai/AiOptimizePanel.tsx`:
    - Hold local state: `messages: AiMessage[]`, `input: string`, `isLoading: boolean`
    - Initialize with the default assistant greeting message
    - Render `PrivacyNotice` at top
    - Render scrollable `ChatMessage` list
    - Render input bar (textarea + Send button) at bottom
    - On send: append user message, call `lib/ai-client.ts`, append assistant response
    - Handle Apply: call `store.applyAiPatch(proposedChanges)` → preview updates automatically
    - Handle Skip: mark message as skipped (no store update)
    - Show a loading spinner/skeleton while `isLoading === true`

- [ ] 6.0 Editor Page Integration
  - [ ] 6.1 Open `app/editor/page.tsx`; add `const [isAiMode, setIsAiMode] = useState(false)` local state
  - [ ] 6.2 In the left column: conditionally render `<AiOptimizePanel />` when `isAiMode === true`, otherwise render the existing form sections
  - [ ] 6.3 Locate the action bar (top or inline); add "AI Optimize" button:
    - Disabled if `personalInfo.firstName` and `personalInfo.lastName` and `personalInfo.email` are all empty
    - Tooltip on disabled state: *"Fill in your personal info to unlock AI Optimize"*
    - On click: `setIsAiMode(true)`
  - [ ] 6.4 When `isAiMode === true`, replace the "AI Optimize" button with "← Back to Editor" button that calls `setIsAiMode(false)`
  - [ ] 6.5 Confirm the URL does not change when toggling between modes (no `router.push` calls)

- [ ] 7.0 Testing & Verification
  - [ ] 7.1 Manual: Fill in personal info → verify "AI Optimize" button becomes enabled
  - [ ] 7.2 Manual: Click "AI Optimize" → verify left panel switches to chat, preview stays on right, URL unchanged
  - [ ] 7.3 Manual: Click "← Back to Editor" → verify form reappears with all data intact
  - [ ] 7.4 Manual: Open AI chat → verify privacy notice appears; dismiss it; re-open → notice should NOT appear again
  - [ ] 7.5 Manual: Send a first message (e.g. paste a JD) → verify loading spinner appears, then an assistant reply with proposed changes and Apply/Skip buttons
  - [ ] 7.6 Manual: Click "✅ Apply" → verify form fields update and live PDF preview re-renders
  - [ ] 7.7 Manual: Inspect Network tab → verify `/api/ai/optimize` request body does NOT contain the user's real name/email/phone/links
  - [ ] 7.8 Manual: Test with empty `.env.local` `AI_PROVIDER_*` vars → verify a graceful error message appears in the chat
