# 🚀 Launch & Feedback Strategy

## 1. Preparation (Tracking & Compliance)
Before sharing the link to the public, it is fundamental to set up the appropriate tracking and compliance tools to monitor traffic and gather actionable data.

- **Google Tag Manager (GTM):** Use as the central hub for injecting all other scripts to avoid cluttering the codebase.
- **Google Analytics 4 (GA4):** Connect via GTM to track page views, PDF exports, AI usage, and general user flow. Setup custom events for key actions (e.g. `export_pdf`, `ai_optimize_click`).
- **CookieYes:** Implement via GTM or directly in the `<head>` to ensure GDPR compliant cookie banners, specifically blocking GA4/GTM until consent is given.
- **Google Search Console (GSC):** Verify domain ownership (`craftcv.online`) and submit the `sitemap.xml` to start tracking organic search presence.

## 2. Launch Strategy (Where to Post)

To get initial feedback and real users, Reddit is one of the best platforms. Here is a strategy for different subreddits:

### A. r/resumes
- **Focus:** The value provided to job seekers.
- **Angle:** *"I built a free, privacy-first, ATS-friendly CV builder because existing ones charge ridiculous fees at the end. It also has an AI feature to tailor your CV to a specific Job Description."*
- **Call to Action (CTA):** Ask for UI/UX feedback and if the generated PDFs pass ATS parsers well in their experience. Be humble and helpful.

### B. r/SideProject / r/SomebodyMakeThis
- **Focus:** The journey of building it and the tech stack.
- **Angle:** Showcasing the Vibe Coding / "Built with AI" approach. *"I built an ATS-friendly CV builder in X days using Next.js and AI tools. Here's how I handled the local-first architecture and the LLM integration."*
- **Call to Action (CTA):** Ask for technical feedback, code review, or overall impressions.

### C. r/webdev / r/nextjs
- **Focus:** The technical implementation.
- **Angle:** Discuss the challenges of generating high-quality PDFs on the client-side using `@react-pdf/renderer` or how you handled PII masking before sending data to the LLM.

### D. Other potential platforms:
- **ProductHunt:** Good for a polished "official" launch. Do this *after* fixing initial bugs reported by Reddit users.
- **Hacker News (Show HN):** Good if you can emphasize the technical "cool factor" (e.g. local-first, no-database, fast PDF generation).
- **IndieHackers / LinkedIn:** General visibility.

## 3. Gathering & Acting on Feedback
- **Feedback Loop:** Create a way for users to report bugs easily (e.g. a simple feedback form, or simply tell them to reply to the Reddit thread).
- **Monitor Analytics:** Check the drop-off rates. Are people leaving at the "Experience" section? Are they trying the AI feature?
- **Iterate:** Document the feedback in `.ai/memory/blockers.md` or a new `feedback.md` and address them in sprints.
