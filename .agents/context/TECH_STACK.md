# 🛠 Tech Stack

> **Status**: Locked
> **Last Updated**: 2026-02-19

## Core Framework
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Package Manager**: NPM

## Frontend & UI
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Animations**: `tw-animate-css` / CSS Modules if needed
- **PDF Generation**: `@react-pdf/renderer`

## State Management
- **Global State**: Zustand (for CV data)
- **Forms**: React standard hooks / Controlled components (currently manual handling in `app/editor`)

## Backend & Services
- **API**: Next.js API Routes (Serverless functions)
- **Database**: **NONE** (Local-first, JSON export/import)
- **AI Provider**: DeepSeek / GLM (via OpenAI-compatible API if available, or direct SDK)
  - **Key Management**: Server-side Environment Variables (`.env`)

## DevOps & Deployment
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Reverse Proxy**: Traefik (Auto HTTPS with Let's Encrypt)
- **Hosting**: VPS (Ubuntu/Linux)

## Development Tools
- **Linting**: ESLint
- **Formatting**: Prettier (recommended)
