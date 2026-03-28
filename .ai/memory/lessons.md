# Lessons Learned

> **PURPOSE**: Document mistakes, bugs, and their solutions so AI never repeats them.

> **CRITICAL**: AI must read this file at session start and check it before making changes.

---

## Format for Each Entry

```markdown
### [DATE] - [CATEGORY] - [Short Title]
**What went wrong**: [Description of the problem]
**Root cause**: [Why it happened]
**Impact**: [What broke or how it affected the project]
**Solution**: [How we fixed it]
**Prevention**: [How to avoid this in the future]
**Files involved**: [List of files]
```

---

## 📚 Lessons Log

### 2026-03-15 - Deployment / Dependencies - DOMMatrix Reference Error in pdf-parse

**What went wrong**: Users couldn't import PDFs in production, causing a `ReferenceError: DOMMatrix is not defined` crash in the API route. Worked fine locally.
**Root cause**: The local environment used Node.js v24 which natively supports the `DOMMatrix` browser API required internally by `pdf-parse`, but the production environment used a Docker image with `node:20-slim`, which does not have this globally available.
**Impact**: The `POST /api/ai/import-pdf` route would consistently crash with a 500 error in production anytime a PDF was uploaded.
**Solution**:
1. Upgraded the Docker image to Node 22 (`FROM node:22-slim AS base`) for better modern API compatibility.
2. Installed `@napi-rs/canvas` package (`npm install @napi-rs/canvas`) to provide native canvas bindings.
3. Added a step to the `Dockerfile` to explicitly manually copy the `@napi-rs`, `pdf-parse`, and `pdfjs-dist` directories into `/app/node_modules/` alongside the standalone output.

`pdf-parse` uses Mozilla's `pdfjs-dist` package internally. `pdfjs-dist` requires `@napi-rs/canvas` to natively polyfill `DOMMatrix` and dynamically imports its worker `pdf.worker.mjs`. 
Next.js 15+ Turbopack completely isolates global scopes, meaning injecting `globalThis.DOMMatrix = class {}` dynamically at runtime fails. Crucially, when building with Next.js `output: 'standalone'` for Docker, Next.js's static tracer (`nft`) ignores dynamically loaded or conditional dependency paths. Since `pdfjs-dist` loads the canvas library and worker dynamically context-aware, Next.js completely omits them from the final `/app/.next/standalone` Docker container output. This resulted in the runtime crash despite the packages being in `package.json`.

**Prevention**:
- When `pdf-parse` or similar document libraries throw `DOMMatrix` errors or `@napi-rs/canvas` missing warnings in a Next.js production environment, remember that Next.js standalone output ignores optional, dynamically imported dependencies. Always explicitly `COPY --from=builder` the missing `node_modules` folders (like `@napi-rs`, `pdf-parse`, and `pdfjs-dist`) into your production `Dockerfile`.

**Files involved**:
- `Dockerfile`
- `package.json`

---

### 2026-02-26 - AI Integration - False Positive Changes

**What went wrong**: The AI proposed changes that were identical to the current CV data, but the UI showed them as "modifications" and the diff view showed identical before/after states.
**Root cause**: The system prompt provided a JSON schema which implicitly encouraged returning the entire CV object instead of only the modified fields. Also, the frontend didn't perform a deep equality check before treating a field as "changed".
**Impact**: Confusing UX where the AI says it made changes, but the diff view shows identical before/after states.
**Solution**:
1. Updated the System Prompt to say: "Only include fields in 'proposedChanges' that you are ACTUALLY modifying. Omit fields that remain unchanged."
2. Added a deep comparison function (`getEffectivePatch`) in the frontend (`ChatMessage.tsx`) to filter out `patch` fields that strictly equal the `currentCV` fields.
**Prevention**:
- Always sanitize and diff LLM outputs against current state before presenting them as "changes" to users.
**Files involved**:
- `app/api/ai/optimize/route.ts`
- `components/ai/ChatMessage.tsx`

---

## 📊 Lesson Categories

Keep track of lesson types to identify patterns:

- **AI Integration**: 1 lesson
- **API Design**: 1 lesson
- **State Management**: 1 lesson
- **Database**: 1 lesson
- **TypeScript**: 1 lesson
- **Security**: 1 lesson
- **Performance**: 1 lesson
- **Deployment**: 1 lesson

---

## 🎯 Most Critical Lessons (Top 5)

1. **Always paginate list endpoints** - Saved us from major refactor
2. **Never use `any` in TypeScript** - Prevents runtime errors
4. **Never expose secrets in frontend** - Security critical
5. **Always use `next/image`** - Performance critical

---

## Template for Adding New Lesson

```markdown
### [DATE] - [CATEGORY] - [Short Title]
**What went wrong**: 
**Root cause**: 
**Impact**: 
**Solution**: 
```code here```
**Prevention**: 
**Files involved**: 
```

---

**Remember**: When AI makes a mistake, ALWAYS document it here!
