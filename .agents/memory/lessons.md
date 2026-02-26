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

### 2024-02-04 - API Design - Missing Pagination

**What went wrong**: Created `/api/posts` endpoint without pagination. When dataset grew to 500+ posts, API became slow and returned huge responses.

**Root cause**: Didn't anticipate data growth during initial implementation.

**Impact**: 
- API response time: 200ms → 3000ms
- Mobile app crashed loading large responses
- Had to refactor 3 components that consumed the API

**Solution**: 
```typescript
// Before
export async function GET() {
  const posts = await db.post.findMany()
  return NextResponse.json(posts)
}

// After
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  
  const posts = await db.post.findMany({
    take: limit,
    skip: (page - 1) * limit,
  })
  
  return NextResponse.json(posts)
}
```

**Prevention**: 
- ALWAYS add pagination to list endpoints from day 1
- Updated API_CONTRACTS.md template to include pagination by default
- Added to BEST_PRACTICES.md: "All list endpoints must support pagination"

**Files involved**:
- `app/api/posts/route.ts`
- `components/PostList.tsx`
- `.agents/context/API_CONTRACTS.md` (updated)
- `.agents/context/BEST_PRACTICES.md` (updated)

---

### 2024-02-03 - State Management - Lost Form Data on Navigation

**What went wrong**: User filled out long form, navigated away, came back → all data lost.

**Root cause**: Used local useState for form data instead of persistent storage.

**Impact**: Multiple user complaints, poor UX.

**Solution**:
```typescript
// Before
const [formData, setFormData] = useState({})

// After - Persist to localStorage
const [formData, setFormData] = useLocalStorage('draft-form', {})

// Or better - Use URL params for shareable state
const searchParams = useSearchParams()
const [formData, setFormData] = useState(() => 
  JSON.parse(searchParams.get('draft') || '{}')
)
```

**Prevention**:
- Added decision tree to BEST_PRACTICES.md for state location
- Rule: If data should persist, NEVER use local useState alone
- Consider: URL params (shareable), localStorage (private), database (critical)

**Files involved**:
- `components/forms/ApplicationForm.tsx`
- `.agents/context/BEST_PRACTICES.md` (updated)

---


### 2024-02-01 - TypeScript - Using 'any' Type

**What went wrong**: Used `any` type for API response, caused runtime error when API changed.

**Root cause**: Lazy typing instead of proper interfaces.

**Impact**: Production bug, users couldn't load posts.

**Solution**:
```typescript
// ❌ Before
const data: any = await response.json()

// ✅ After
interface Post {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
  }
  createdAt: string
}

const data: Post = await response.json()
```

**Prevention**:
- NEVER use `any` type in TypeScript
- Use `unknown` and type guards if type is truly unknown
- Create proper interfaces for all API responses
- Updated TECH_STACK.md: TypeScript strict mode enforced

**Files involved**:
- `lib/api/posts.ts`
- `.agents/context/TECH_STACK.md` (clarified strict mode)
- `.agents/context/BEST_PRACTICES.md` (added TypeScript section)

---

### 2024-01-31 - Security - Exposed API Key in Frontend

**What went wrong**: Accidentally committed API key in client-side code.

**Root cause**: Used `NEXT_PUBLIC_` prefix incorrectly, thought all env vars were private.

**Impact**: API key compromised, had to rotate immediately.

**Solution**:
```typescript
// ❌ WRONG - Exposes to browser
const apiKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY

// ✅ CORRECT - Server-side only
// In API route (server-side)
const apiKey = process.env.STRIPE_SECRET_KEY

// In client code - only send requests to OUR API
fetch('/api/payment', { method: 'POST', ... })
```

**Prevention**:
- NEVER use `NEXT_PUBLIC_` prefix for secrets
- Server-side API keys should NEVER reach the client
- Double-check `.env` not committed (added to `.gitignore`)
- Code review checklist now includes "No exposed secrets"

**Files involved**:
- `components/CheckoutForm.tsx`
- `app/api/payment/route.ts`
- `.agents/review-checklist.md` (updated)

---


### 2024-01-29 - Performance - Unoptimized Images

**What went wrong**: Using regular `<img>` tags instead of `next/image`, slow page loads.

**Root cause**: Not following Next.js best practices.

**Impact**: 
- Lighthouse performance score: 45/100
- Large CLS (Cumulative Layout Shift)
- Slow loading on mobile

**Solution**:
```typescript
// ❌ Before
<img src="/hero.jpg" alt="Hero" />

// ✅ After
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

**Prevention**:
- ALWAYS use `next/image` for images in Next.js
- ALWAYS specify width and height
- Added to app-router-guidelines.md: "Common mistake - using <img>"
- Code review checklist now includes "All images using next/image"

**Files involved**:
- Multiple page components
- `.agents/nextjs/app-router-guidelines.md` (updated)
- `.agents/review-checklist.md` (updated)

---

### 2024-01-28 - Deployment - Missing Environment Variable

**What went wrong**: Deployed to production, app crashed - missing `DATABASE_URL`.

**Root cause**: Forgot to set env var in Vercel dashboard.

**Impact**: 15 minutes downtime, production broken.

**Solution**:
1. Added all env vars to Vercel
2. Created pre-deployment checklist

**Prevention**:
- ALWAYS use `.agents/prompts/06_deployment.md` checklist before deploying
- Added `.env.example` file with all required variables
- Document all env vars in TECH_STACK.md
- Set up deployment script that checks for required env vars

**Files involved**:
- `.env.example` (created)
- `.agents/prompts/06_deployment.md` (updated)
- `.agents/context/TECH_STACK.md` (documented all env vars)

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
