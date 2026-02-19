# Next.js App Router Guidelines

> These guidelines are specific to Next.js 15+ projects using App Router (NOT Pages Router).

---

## 🎯 Core Principles

### 1. Server Components by Default

```typescript
// ✅ CORRECT - Server Component (default)
// app/posts/page.tsx
export default async function PostsPage() {
  const posts = await db.post.findMany() // Direct DB call OK!
  return <PostsList posts={posts} />
}

// ❌ WRONG - Unnecessary 'use client'
'use client'  // Not needed if no interactivity!

export default function PostsPage() {
  return <div>Static content</div>
}
```

### 2. Use 'use client' Only When Needed

Add `'use client'` directive ONLY for:
- Event handlers (`onClick`, `onChange`, etc.)
- React Hooks (`useState`, `useEffect`, `useContext`)
- Browser APIs (`localStorage`, `window`, `document`)
- Third-party libraries that require client-side

```typescript
// ✅ Client component (needs interactivity)
'use client'

import { useState } from 'react'

export function SearchBar() {
  const [query, setQuery] = useState('')
  
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
```

---

## 📁 File Structure Conventions

### App Directory Structure

```
app/
├── layout.tsx              # Root layout (REQUIRED)
├── page.tsx                # Homepage (/)
├── loading.tsx             # Loading UI for page.tsx
├── error.tsx               # Error boundary for page.tsx
├── not-found.tsx           # 404 page
├── globals.css             # Global styles
│
├── (marketing)/            # Route group (no URL segment)
│   ├── layout.tsx          # Layout for marketing pages
│   ├── about/
│   │   └── page.tsx        # /about
│   └── contact/
│       └── page.tsx        # /contact
│
├── (dashboard)/            # Route group
│   ├── layout.tsx          # Dashboard layout
│   ├── dashboard/
│   │   ├── page.tsx        # /dashboard
│   │   └── loading.tsx
│   └── settings/
│       └── page.tsx        # /settings
│
├── blog/
│   ├── page.tsx            # /blog (list)
│   ├── [slug]/             # Dynamic route
│   │   ├── page.tsx        # /blog/my-post
│   │   ├── loading.tsx
│   │   └── error.tsx
│   └── [...slug]/          # Catch-all route
│       └── page.tsx        # /blog/2024/03/post
│
└── api/                    # API routes
    ├── posts/
    │   ├── route.ts        # /api/posts (GET, POST)
    │   └── [id]/
    │       └── route.ts    # /api/posts/:id (GET, PATCH, DELETE)
    └── auth/
        └── [...nextauth]/
            └── route.ts    # NextAuth.js routes
```

### Components Structure

```
components/
├── ui/                     # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── posts/                  # Feature-specific
│   ├── post-list.tsx
│   ├── post-card.tsx
│   └── post-form.tsx
├── layout/                 # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   └── sidebar.tsx
└── shared/                 # Shared/common
    ├── loading-spinner.tsx
    └── error-message.tsx
```

---

## 🎨 Special Files in App Router

### layout.tsx (Required in root)

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My App',
  description: 'App description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

### page.tsx

```typescript
// app/posts/[id]/page.tsx
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'

interface Props {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PostPage({ params }: Props) {
  const post = await db.post.findUnique({
    where: { id: params.id }
  })
  
  if (!post) notFound()
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}

// Generate static params for SSG
export async function generateStaticParams() {
  const posts = await db.post.findMany()
  return posts.map((post) => ({
    id: post.id,
  }))
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await db.post.findUnique({
    where: { id: params.id }
  })
  
  return {
    title: post?.title,
    description: post?.excerpt,
  }
}
```

### loading.tsx

```typescript
// app/posts/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}
```

### error.tsx

```typescript
// app/posts/error.tsx
'use client' // Error boundaries must be client components

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Posts error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-4">
        {error.message || 'Failed to load posts'}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

### not-found.tsx

```typescript
// app/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-xl mb-4">Page Not Found</h2>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}
```

---

## 🔄 Data Fetching Patterns

### Server Component (Recommended)

```typescript
// ✅ BEST - Server Component with async/await
export default async function UsersPage() {
  const users = await fetch('https://api.example.com/users', {
    cache: 'no-store', // or 'force-cache' or { next: { revalidate: 3600 } }
  }).then(res => res.json())
  
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

### Client Component with React Query

```typescript
// ✅ Client Component (when needed)
'use client'

import { useQuery } from '@tanstack/react-query'

export function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />

  return (
    <div>
      {data.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

### Caching Strategies

```typescript
// No caching (always fresh)
fetch(url, { cache: 'no-store' })

// Cache forever
fetch(url, { cache: 'force-cache' })

// Revalidate after 60 seconds
fetch(url, { next: { revalidate: 60 } })

// Opt out of caching for entire route
export const dynamic = 'force-dynamic'

// Revalidate entire route
export const revalidate = 3600 // 1 hour
```

---

## 🛣️ API Routes (Route Handlers)

### Basic Route Handler

```typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

// GET /api/posts
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const posts = await db.post.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST /api/posts
const createPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(100),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createPostSchema.parse(body)

    const post = await db.post.create({
      data: {
        ...data,
        userId: 'user-id', // Get from auth
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Failed to create post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
```

### Dynamic Route Handler

```typescript
// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface Props {
  params: { id: string }
}

// GET /api/posts/:id
export async function GET(
  request: NextRequest,
  { params }: Props
) {
  try {
    const post = await db.post.findUnique({
      where: { id: params.id },
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PATCH /api/posts/:id
export async function PATCH(
  request: NextRequest,
  { params }: Props
) {
  try {
    const body = await request.json()
    
    const post = await db.post.update({
      where: { id: params.id },
      data: body,
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/:id
export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    await db.post.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
```

---

## 🖼️ Image Optimization

### Always use next/image

```typescript
// ✅ CORRECT
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // For above-the-fold images
  className="rounded-lg"
/>

// For dynamic images
<Image
  src={user.avatar}
  alt={user.name}
  width={64}
  height={64}
  className="rounded-full"
/>

// For external images (configure in next.config.js)
<Image
  src="https://example.com/image.jpg"
  alt="External image"
  width={400}
  height={300}
/>

// ❌ WRONG - Never use <img> tag
<img src="/hero.jpg" alt="Hero" /> // No optimization!
```

### next.config.js for external images

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
    ],
  },
}

module.exports = nextConfig
```

---

## 🔗 Navigation

### Always use next/link

```typescript
// ✅ CORRECT
import Link from 'next/link'

<Link href="/about">About</Link>
<Link href={`/posts/${post.id}`}>Read more</Link>

// With className
<Link href="/contact" className="text-blue-600 hover:underline">
  Contact Us
</Link>

// ❌ WRONG - Never use <a> for internal links
<a href="/about">About</a> // Full page reload!
```

### Programmatic navigation

```typescript
'use client'

import { useRouter } from 'next/navigation'

export function LoginButton() {
  const router = useRouter()
  
  const handleLogin = async () => {
    await login()
    router.push('/dashboard')
    // or router.replace('/dashboard') to replace history
  }
  
  return <button onClick={handleLogin}>Log in</button>
}
```

---

## 🎨 Styling with TailwindCSS

### Component with Tailwind

```typescript
import { cn } from '@/lib/utils' // shadcn utility

interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export function Button({ 
  variant = 'default', 
  size = 'md',
  children,
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': 
            variant === 'default',
          'border border-input bg-background hover:bg-accent': 
            variant === 'outline',
          'hover:bg-accent hover:text-accent-foreground': 
            variant === 'ghost',
        },
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

---

## ⚠️ Common Pitfalls

### ❌ DON'T: Use 'use client' everywhere

```typescript
// ❌ BAD
'use client' // Not needed!

export default function AboutPage() {
  return <div>Static content</div>
}
```

### ✅ DO: Server component by default

```typescript
// ✅ GOOD
export default function AboutPage() {
  return <div>Static content</div>
}
```

### ❌ DON'T: Fetch in client components unnecessarily

```typescript
// ❌ BAD
'use client'

export default function PostsPage() {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    fetch('/api/posts').then(...)
  }, [])
  
  return ...
}
```

### ✅ DO: Fetch in server components

```typescript
// ✅ GOOD
export default async function PostsPage() {
  const posts = await fetch('/api/posts').then(r => r.json())
  return ...
}
```

### ❌ DON'T: Use regular <img> or <a> tags

```typescript
// ❌ BAD
<img src="/logo.png" />
<a href="/about">About</a>
```

### ✅ DO: Use Next.js components

```typescript
// ✅ GOOD
import Image from 'next/image'
import Link from 'next/link'

<Image src="/logo.png" width={200} height={50} alt="Logo" />
<Link href="/about">About</Link>
```

---

## 📚 Quick Reference

**Create page**: `app/path/page.tsx`
**Create API**: `app/api/path/route.ts`
**Dynamic route**: `app/posts/[id]/page.tsx`
**Catch-all**: `app/blog/[...slug]/page.tsx`
**Route group**: `app/(group)/page.tsx` (no URL segment)
**Client component**: Add `'use client'` at top
**Server actions**: Add `'use server'` in function

---

For more App Router docs: https://nextjs.org/docs/app
