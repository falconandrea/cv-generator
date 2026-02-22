# ATS-Friendly CV Generator

A modern, fast, and privacy-focused web application to generate **ATS-optimized CVs**. Built with Next.js, optimized for speed and simplicity.

> **Status**: In Active Development
> **Privacy**: Local-first. Your data stays in your browser (unless you opt-in for AI features).

---

## 🚀 Features

- **ATS-Ready**: Single-column layout optimized for Applicant Tracking Systems.
- **Real-time Preview**: See changes as you type.
- **Privacy First**: No database. Data is stored in your browser or exported as JSON.
- **Export/Import**: Save your progress as a JSON file and resume anytime.
- **PDF Generation**: High-quality, selectable text PDF output.
- **Mobile Friendly**: Responsive design for editing on the go.
- **AI-Powered (Coming Soon)**:
  - Optimize your CV based on a Job Description (using LLMs like DeepSeek).
  - Get actionable advice to improve your content.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **PDF Engine**: [@react-pdf/renderer](https://react-pdf.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/falconandrea/cv-generator.git
   cd cv-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🐳 Docker

The project includes a multi-stage `Dockerfile` for production-ready builds.

### Run locally with Docker

```bash
# 1. Build the image
docker build -t cv-generator .

# 2. Run the container
docker run -p 3000:3000 cv-generator
```

Then open [http://localhost:3000](http://localhost:3000).

### Deploy on a VPS (with Traefik)

The `server/docker-compose.yml` file is provided as a reference for self-hosting on a VPS behind a [Traefik](https://traefik.io/) reverse proxy with automatic HTTPS (Let's Encrypt).

> **Note**: The file is pre-configured for the domain `cv-generator.andreafalcon.dev` and pulls the image from GHCR (`ghcr.io/falconandrea/cv-generator:main`). You'll need to edit it to match your own domain and image registry before using it.

---

## 🧘 Vibe Coding & Spec-Driven Development

This project embraces the **Vibe Coding** philosophy, combined with a **Spec-Driven** approach.

-   **Spec-Driven**: We define clear, detailed specifications (PRD, Tech Stack, App Flow) *before* writing code. This ensures the AI agent has perfect context.
-   **Vibe Coding**: We iterate fast, focusing on the "feel" and user experience, letting the AI handle the heavy lifting of implementation while we direct the flow.
-   **Cursor & Rules**: We use `.cursorrules` (or `.agents` instructions) to enforce coding standards and project structure automatically.

---

## 📝 License

MIT
