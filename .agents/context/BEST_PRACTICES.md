# Development Best Practices & Patterns

> These patterns apply to Next.js projects unless specified otherwise.

---

## 🌐 Language Rule

**The entire application is in English.** ALL UI text, labels, loading messages, error messages, button text, and any string visible to the user MUST be written in English. Never write Italian (or any other language) in source code UI strings.

---

## 🎯 General Principles

### Single Responsibility
Every function/method/component does ONE thing well.

```typescript
// ✅ Good - Single responsibility
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// ❌ Bad - Multiple responsibilities
function calculateAndFormatTotal(items: Item[]): string {
  const total = items.reduce((sum, item) => sum + item.price, 0)
  return `$${total.toFixed(2)}`
}
```

### Composition Over Inheritance
Favor composition and small, reusable pieces.

```typescript
// ✅ Good - Composition
export function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <UserAvatar user={user} />
      <UserInfo user={user} />
      <UserActions user={user} />
    </Card>
  )
}

// ❌ Bad - Too many props (god component)
export function UserCard({ 
  user, 
  onEdit, 
  onDelete, 
  showStats, 
  isAdmin,
  theme 
}: UserCardProps) {
  // 200 lines of code...
}
```

---

## 🚨 Error Handling

### Always Handle Errors Explicitly

```typescript
// ✅ Good - Explicit error handling
async function fetchUserData(id: string) {
  try {
    const response = await fetch(`/api/users/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return { 
      data: null, 
      error: 'Unable to load user data. Please try again.' 
    }
  }
}

// ❌ Bad - Silent failure
async function fetchUserData(id: string) {
  try {
    const response = await fetch(`/api/users/${id}`)
    return await response.json()
  } catch {
    // 🚫 NEVER DO THIS
  }
}
```


---

## 🔄 State Management Decision Tree

### Where to Store Data?

```
Does it persist across browser refreshes?
  → YES: Database (Supabase/MySQL)
  → NO: ↓

Does it need to be shared across multiple pages?
  → YES: URL params (for shareable state) or Context/Zustand
  → NO: ↓

Does it need to be shared across components in same page?
  → YES: Lift state up or Context API
  → NO: Local useState/useReducer

Is it server data (API response)?
  → YES: React Query / SWR (with cache)
  → NO: Local state
```

### Examples

```typescript
// ✅ URL params for shareable filters
// Route: /products?category=electronics&sort=price

// ✅ Context for theme/user across app
const ThemeContext = createContext<Theme>('light')

// ✅ Local state for form input
const [email, setEmail] = useState('')

// ✅ React Query for server data
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
})
```

---

## 🎨 UI/UX Patterns

### Loading States (REQUIRED)

```typescript
// ✅ Good - All states handled
function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  if (isLoading) return <Skeleton />
  if (error) return <ErrorMessage error={error} />
  if (!data?.length) return <EmptyState />

  return <div>{data.map(user => ...)}</div>
}

// ❌ Bad - No loading state
function UserList() {
  const { data } = useQuery({ ... })
  return <div>{data?.map(user => ...)}</div> // ❌ Flashes undefined
}
```

### Icons (STRICT RULE)

```typescript
// ✅ Good - Lucide React only
import { User, Mail, Lock } from 'lucide-react'

<User className="w-4 h-4" />

// ❌ Bad - Other icon libraries
import { FaUser } from 'react-icons/fa'  // 🚫 NO
import HomeIcon from '@heroicons/react'  // 🚫 NO
```

### Forms with Validation

```typescript
// ✅ Good - React Hook Form + Zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be 8+ characters')
})

type FormData = z.infer<typeof schema>

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    // Submit logic
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      {/* ... */}
    </form>
  )
}
```

---


---

## ⚛️ Next.js-Specific Patterns

### Server vs Client Components

```typescript
// ✅ Good - Server component by default
// app/users/page.tsx (no 'use client')
export default async function UsersPage() {
  const users = await fetchUsers() // Direct DB call OK!
  return <UserList users={users} />
}

// ✅ Good - Client component only when needed
// components/user-list.tsx
'use client'

import { useState } from 'react'

export function UserList({ users }: { users: User[] }) {
  const [search, setSearch] = useState('') // Needs client
  
  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <>
      <input 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      {filtered.map(user => ...)}
    </>
  )
}

// ❌ Bad - Unnecessary 'use client'
'use client' // 🚫 Not needed if no interactivity!

export default function AboutPage() {
  return <div>Static content</div>
}
```

### Data Fetching Patterns

```typescript
// ✅ Good - Server component with async
// app/posts/[id]/page.tsx
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await db.post.findUnique({ where: { id: params.id } })
  
  if (!post) notFound()
  
  return <PostDetail post={post} />
}

// ✅ Good - Client component with React Query
'use client'

export function Comments({ postId }: { postId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId)
  })
  
  if (isLoading) return <Skeleton />
  
  return <CommentList comments={data} />
}
```

### Image Optimization

```typescript
// ✅ Good - next/image with dimensions
import Image from 'next/image'

<Image
  src="/avatar.jpg"
  alt="User avatar"
  width={64}
  height={64}
  className="rounded-full"
/>

// ❌ Bad - Regular img tag
<img src="/avatar.jpg" alt="User avatar" /> // 🚫 NO
```

### Route Handlers (API Routes)

```typescript
// ✅ Good - app/api/users/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    
    const user = await db.user.create({ data })
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('User creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## 📊 Database Naming Conventions

### Tables & Columns

```sql
-- ✅ Good - Plural tables, snake_case columns
CREATE TABLE user_profiles (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    display_name VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- ❌ Bad - Singular tables, camelCase
CREATE TABLE UserProfile (
    userId BIGINT,
    displayName VARCHAR(255)
);
```


---

## 🔒 Security Best Practices

### Input Validation

```typescript
// ✅ Good - Validate everything
const schema = z.object({
  amount: z.number().positive().max(10000),
  currency: z.enum(['USD', 'EUR', 'GBP'])
})

// ❌ Bad - Trust user input
const amount = request.body.amount // Could be negative!
```

### Environment Variables

```typescript
// ✅ Good - Validate env vars at startup
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  API_KEY: z.string()
})

const env = envSchema.parse(process.env)

// ❌ Bad - No validation
const apiKey = process.env.API_KEY // Could be undefined!
```

---

## 🧪 Testing Mindset

### Test Critical Paths

```typescript
// ✅ Good - Test the happy path + 1 error case
describe('User Registration', () => {
  it('creates user with valid data', async () => {
    const user = await createUser({ email: 'test@example.com', password: 'password123' })
    expect(user).toBeDefined()
    expect(user.email).toBe('test@example.com')
  })

  it('rejects duplicate email', async () => {
    await createUser({ email: 'existing@example.com', password: 'password123' })
    
    await expect(
      createUser({ email: 'existing@example.com', password: 'different' })
    ).rejects.toThrow('Email already exists')
  })
})
```

---

## 📝 Commit Message Convention

```bash
# ✅ Good - Clear, actionable
feat: add user authentication with email/password
fix: resolve race condition in payment processing
docs: update API documentation for v2 endpoints
refactor: extract user validation into service
test: add e2e tests for checkout flow
chore: update dependencies to latest versions

# ❌ Bad - Vague
update stuff
fix bug
changes
```

---

## 🎯 Performance Guidelines

### Next.js Performance

- Use `next/image` for ALL images
- Lazy load heavy components: `const Heavy = lazy(() => import('./Heavy'))`
- Use `loading.tsx` for instant feedback
- Debounce search inputs (300ms minimum)
- Virtualize long lists (>100 items)


---

## ⚠️ Common Pitfalls to Avoid

### General
- ❌ Committing `.env` files
- ❌ Hardcoding API keys or secrets
- ❌ Not handling edge cases (empty states, errors, loading)
- ❌ Ignoring TypeScript errors

### Next.js Specific
- ❌ Using `use client` everywhere
- ❌ Fetching data in client components when server components could do it
- ❌ Not specifying image dimensions
- ❌ Mixing client and server code incorrectly

---

## 📚 When in Doubt

1. Check this file first
2. Check `.agents/context/TECH_STACK.md` for version compatibility
3. Check `.agents/memory/lessons.md` for past mistakes
4. Ask the user before making architectural decisions
5. Document the decision in `.agents/context/ARCHITECTURE_DECISIONS.md`
