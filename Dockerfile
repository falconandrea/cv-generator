# Base stage - Use official Node.js image
FROM node:22-slim AS base

# Install dependencies only when needed
FROM base AS deps
RUN apt-get update && apt-get install -y libc6-dev && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_API_ENDPOINT
ARG NEXT_PUBLIC_ENV

# Set environment variables during build
ENV NEXT_PUBLIC_API_ENDPOINT=${NEXT_PUBLIC_API_ENDPOINT}
ENV NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV}

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ensure optional canvas polyfill package and pdfjs-dist are copied since Next.js standalone trace misses conditional/dynamic imports
COPY --from=builder /app/node_modules/@napi-rs ./node_modules/@napi-rs
COPY --from=builder /app/node_modules/pdfjs-dist ./node_modules/pdfjs-dist
COPY --from=builder /app/node_modules/pdf-parse ./node_modules/pdf-parse

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "server.js"]
