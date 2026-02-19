# Tech Stack - Next.js Project

> **CRITICAL**: AI must use these EXACT versions. Never deviate without explicit permission.

## Frontend Stack

### Core Framework
- **Next.js**: ^15.0.0 (App Router ONLY, NO Pages Router)
- **React**: ^19.0.0
- **TypeScript**: ^5.3.0 (strict mode enabled)
- **Node.js**: >=20.11.0 LTS

### Styling
- **TailwindCSS**: ^3.4.0
  - JIT mode enabled
  - Custom config in `tailwind.config.ts`
  - NO arbitrary values without design system approval
- **shadcn/ui**: Latest (component library)
  - Install only needed components
  - Customized in `components/ui/`

### UI Components & Icons
- **Lucide React**: ^0.263.1 (for ALL icons)
- **class-variance-authority**: ^0.7.0 (for component variants)
- **clsx** + **tailwind-merge**: Latest (for className utilities)

### Forms & Validation
- **React Hook Form**: ^7.50.0
- **Zod**: ^3.22.0 (schema validation)
- **@hookform/resolvers**: ^3.3.0

### Data Fetching & State
- **TanStack Query (React Query)**: ^5.17.0 (for server state)
- **Zustand**: ^4.5.0 (for client state - if needed)
- **SWR**: Alternative to React Query (choose one, document in ARCHITECTURE_DECISIONS.md)

## Backend/Database (if applicable)

### Database
- **PostgreSQL**: ^16.0 (via Supabase or direct)
- **Prisma**: ^5.8.0 (ORM)
  - OR **Drizzle ORM**: ^0.29.0 (lighter alternative)
  - Choose one, document in ARCHITECTURE_DECISIONS.md

### Authentication
- **NextAuth.js (Auth.js)**: ^5.0.0-beta
  - OR **Clerk**: Latest
  - OR **Supabase Auth**: Latest
  - Choose one, document in ARCHITECTURE_DECISIONS.md

### Backend as a Service (if using)
- **Supabase**: Latest (database + auth + storage + realtime)
  - `@supabase/supabase-js`: ^2.39.0
  - `@supabase/ssr`: ^0.0.10 (for Next.js)

## Development Tools

### Code Quality
- **ESLint**: ^8.56.0 (Next.js config + TypeScript)
- **Prettier**: ^3.2.0
- **TypeScript**: Strict mode

### Testing (if required)
- **Vitest**: ^1.2.0 (unit tests)
- **Playwright**: ^1.41.0 (E2E tests)
- **Testing Library**: ^14.1.0 (component tests)

## Production Environment

### Hosting
- VPS with Docker and traefik

### Environment Variables
```bash
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl"

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..." # Server-side only

# External APIs
# [Add as needed]
```

### Performance Budget
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint

# Type check
npm run type-check

# Run tests (if configured)
npm run test
```

## Package Constraints

### Allowed Utility Libraries
- `date-fns`: ^3.0.0 (date manipulation)
- `nanoid`: ^5.0.0 (unique IDs)
- `react-hot-toast`: ^2.4.0 (notifications)
- `framer-motion`: ^11.0.0 (animations - use sparingly)

### Forbidden Patterns
- ❌ NO `use client` in every component (be intentional)
- ❌ NO Pages Router patterns (`getServerSideProps`, `getStaticProps`)
- ❌ NO `any` type in TypeScript (use `unknown` and type guards)
- ❌ NO inline styles (TailwindCSS only)
- ❌ NO external icon libraries other than Lucide React
- ❌ NO `<img>` tags (use `next/image` always)
- ❌ NO `<a>` tags for internal links (use `next/link`)

## App Router Patterns

### File Conventions (STRICT)
```
app/
├── layout.tsx          # Root layout (must exist)
├── page.tsx            # Homepage
├── loading.tsx         # Loading UI
├── error.tsx           # Error UI
├── not-found.tsx       # 404 page
│
├── (auth)/             # Route group (no URL segment)
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
│
├── dashboard/
│   ├── layout.tsx      # Nested layout
│   ├── page.tsx
│   └── [id]/           # Dynamic route
│       └── page.tsx
│
└── api/                # API routes
    └── users/
        └── route.ts    # GET, POST, etc.
```

### Server vs Client Components
**Default: Server Components**
- Use `use client` ONLY when needed:
  - Event handlers (onClick, onChange)
  - React hooks (useState, useEffect)
  - Browser APIs (localStorage, window)

## Version Lock Justification

**Why Next.js 15?**
- App Router stability
- React Server Components
- Turbopack (dev mode)

**Why React 19?**
- Server Components support
- Better TypeScript integration

**Why TypeScript?**
- Catch errors at compile time
- Better IDE support
- Self-documenting code

**Why shadcn/ui?**
- Fast component scaffolding
- Full control over code
- TailwindCSS native
- Copy-paste friendly

## Notes
- Update this file if ANY dependency changes
- Document version upgrade decisions in `ARCHITECTURE_DECISIONS.md`
- AI: NEVER suggest packages not listed here without asking first
- AI: ALWAYS use App Router patterns, NEVER Pages Router
