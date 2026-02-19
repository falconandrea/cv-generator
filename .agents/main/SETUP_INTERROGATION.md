# Project Setup Interrogation Protocol

**AI Instructions**: When user wants to start a new project, enter PLANNING MODE and run through this questionnaire. Don't write code until all sections are complete.

## Phase 1: Project Vision

1. **What problem does this solve?**
   - Target user persona?
   - Main pain point addressed?

2. **Success Metrics**
   - What does "done" look like?
   - MVP vs Future scope boundary?

3. **Explicitly OUT of scope**
   - What features are NOT included?

---

## Phase 2: Technical Foundation

4. **Frontend Stack**
   - Framework: React / Vue / Svelte / Other?
   - Routing: Next.js / Remix / React Router?
   - Styling: TailwindCSS / CSS Modules / Styled Components?
   - Why this choice?

5. **Backend & Data**
   - Backend: Next.js API Routes / Express / Serverless?
   - Database: PostgreSQL / MongoDB / Firebase?
   - Auth: Supabase / Clerk / Auth.js / Custom?
   - File Storage: S3 / Cloudinary / Supabase Storage?

6. **Deployment**
   - Hosting: Vercel / Netlify / AWS / Railway?
   - CI/CD needed?
   - Environment strategy (dev/staging/prod)?

---

## Phase 3: User Experience

7. **Core User Flows** (top 3)
   - Flow 1: [e.g., "User signs up and creates first project"]
   - Flow 2: [e.g., "User invites team member"]
   - Flow 3: [e.g., "User exports data"]

8. **Design System**
   - Existing brand guidelines?
   - Component library: shadcn/ui / MUI / Headless UI / Custom?
   - Accessibility requirements (WCAG level)?

9. **Device Support**
   - Mobile-first / Desktop-first?
   - Responsive breakpoints needed?

---

## Phase 4: Data Architecture

10. **Core Data Entities**
    - List main entities (e.g., User, Post, Comment)
    - Key relationships?

11. **Real-time Requirements**
    - Any real-time features (chat, notifications, collaborative editing)?
    - If yes, strategy: WebSockets / Supabase Realtime / Polling?

12. **Third-party Integrations**
    - Payment: Stripe / PayPal / None?
    - Email: Resend / SendGrid / Postmark?
    - Analytics: Posthog / Google Analytics / Plausible?
    - Other services?

---

## Phase 5: Edge Cases & Error Handling

13. **Critical Error Scenarios**
    - What if payment fails?
    - What if external API is down?
    - What if user loses network?
    - How to handle concurrent edits?

14. **Data Validation**
    - Form validation strategy?
    - Server-side validation rules?

---

## Phase 6: Developer Experience

15. **Team & Process**
    - Solo developer or team?
    - Code review process?
    - Testing requirements: Unit / E2E / Manual only?

16. **Monitoring & Debugging**
    - Error tracking: Sentry / LogRocket / None?
    - Logging strategy?

---

## Output Process

After gathering answers:

1. **Summarize** key decisions
2. **Propose** `.agents/context/` file contents
3. **Ask** for approval
4. **Create** files in `.agents/context/` directory
5. **Create** `.agents/memory/progress.md` with initial state
6. **Switch** to ACTING MODE once approved