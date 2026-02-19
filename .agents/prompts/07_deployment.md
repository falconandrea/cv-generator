# 🚀 Deployment Preparation Checklist

**Use this before deploying to production**

---

```
I'm preparing to deploy to production. Help me create a complete deployment checklist.

DEPLOYMENT TARGET: [Staging / Production / Both]

PLATFORM: [VPS with Docker / Vercel / AWS / Other]

---

## Pre-Deployment Checklist

Go through this systematically and report status for each item:

### 1. Code Quality ✅

- [ ] **All tests passing**
  - Run: [test command]
  - Status: [Pass / Fail / No tests]

- [ ] **No console errors**
  - Check browser console
  - Check server logs
  - Status: [Clean / Has errors]

- [ ] **Code review completed**
  - All PR/MR approved?
  - Status: [Yes / No / N/A]

- [ ] **TypeScript/PHP checks passing**
  - Next.js: `npm run type-check`
  - Status: [Pass / Fail]

### 2. Environment Configuration 🔧

Review and verify all environment variables:

#### Required Variables
- [ ] `DATABASE_URL` - [Verified / Missing / Wrong]
- [ ] `APP_KEY` / `NEXTAUTH_SECRET` - [Set / Missing]
- [ ] API keys for:
  - [ ] Payment gateway - [Set / N/A]
  - [ ] Email service - [Set / N/A]
  - [ ] Storage (S3/etc) - [Set / N/A]
  - [ ] Analytics - [Set / N/A]
  - [ ] Error tracking - [Set / N/A]

#### Environment-Specific Settings
- [ ] Rate limiting configured
- [ ] CORS configured properly
- [ ] Allowed hosts/origins set

#### Sensitive Data Check
- [ ] No API keys in code
- [ ] No passwords in code
- [ ] `.env` file not committed
- [ ] Secrets stored in platform's secret manager

### 3. Database 🗄️

- [ ] **Migrations up to date**
  - Prisma: `npx prisma migrate status`
  - Status: [Up to date / Missing migrations]

- [ ] **Seeders/fixtures removed** (if any test data)
  - Status: [Clean / Has test data]

- [ ] **Backup strategy in place**
  - How: [Automated daily / Manual / None]
  - Last backup: [Date / N/A]

- [ ] **Database indexes created**
  - Check frequently queried columns
  - Status: [Optimized / Needs indexing]

### 4. Performance 🚀


#### Next.js
- [ ] **Build successful**: `npm run build`
  - Build time: [duration]
  - Bundle size: [within budget?]
- [ ] **Images optimized**
  - All using `next/image`
  - Proper sizes specified
- [ ] **Lighthouse score check**
  - Performance: [score /100]
  - Accessibility: [score /100]
  - SEO: [score /100]

### 5. Security 🔒

- [ ] **HTTPS enabled**
  - Certificate: [Valid / Expires soon / Missing]

- [ ] **Security headers set**
  - CSP (Content Security Policy)
  - X-Frame-Options
  - X-Content-Type-Options
  - HSTS

- [ ] **Authentication working**
  - Login: [Tested / Not tested]
  - Password reset: [Tested / Not tested]
  - Session timeout: [Configured]

- [ ] **Authorization working**
  - Role-based access: [Tested / N/A]
  - Protected routes: [All protected]

- [ ] **Input validation**
  - All forms validated
  - API inputs validated
  - File uploads validated (type, size)

- [ ] **SQL Injection protection**
  - Using ORM (Eloquent/Prisma): [Yes]
  - No raw queries: [Verified]

- [ ] **XSS protection**
  - User content sanitized
  - Using framework escaping

### 6. Monitoring & Logging 📊

- [ ] **Error tracking configured**
  - Service: [Sentry / Flare / Other / None]
  - Test error sent: [Yes / No]

- [ ] **Logging configured**
  - Next.js: Vercel logs / Custom logging
  - Log rotation: [Configured / Manual]

- [ ] **Analytics installed**
  - Service: [PostHog / GA / Plausible / None]
  - Tracking verified: [Yes / No]

- [ ] **Uptime monitoring**
  - Service: [UptimeRobot / Pingdom / None]
  - Alert email: [Set / Not set]

### 7. Third-Party Services ☁️

Verify all integrations are production-ready:

- [ ] **Payment gateway**
  - Mode: [Live / Test]
  - Webhooks: [Configured / N/A]

- [ ] **Email service**
  - Mode: [Live / Test]
  - Daily limit: [Known / Unknown]
  - Templates: [Verified / Not checked]

- [ ] **File storage**
  - Bucket/container: [Correct / Wrong]
  - Permissions: [Correct / Wrong]
  - CDN: [Configured / N/A]

- [ ] **Other APIs**
  - List each: [Name - Status]

### 8. Functionality Testing 🧪

Test critical user flows in production-like environment:

- [ ] **User registration**
  - Email sent: [Yes / No]
  - Redirect works: [Yes / No]

- [ ] **User login**
  - Credentials work: [Yes / No]
  - Remember me: [Works / N/A]

- [ ] **Password reset**
  - Email received: [Yes / No]
  - Reset link works: [Yes / No]

- [ ] **Core feature 1**: [Name]
  - Status: [Tested / Not tested]

- [ ] **Core feature 2**: [Name]
  - Status: [Tested / Not tested]

- [ ] **Payment flow** (if applicable)
  - Test transaction: [Success / Failed / N/A]

### 9. Deployment Process 📦

- [ ] **Deployment strategy decided**
  - [ ] Zero-downtime (blue-green)
  - [ ] Rolling deployment
  - [ ] Simple replace
  - [ ] Other: [specify]

- [ ] **Rollback plan ready**
  - How to rollback: [explain]
  - Database rollback: [explain if schema changed]

- [ ] **Maintenance page** (if needed)
  - Created: [Yes / No / N/A]

- [ ] **Team notified**
  - Deployment time: [When]
  - Expected downtime: [Duration / None]

### 10. Post-Deployment Plan 📋

- [ ] **Smoke tests ready**
  - List critical paths to test immediately

- [ ] **Monitoring dashboard open**
  - Watch for errors for first [30 minutes]

- [ ] **Team available**
  - Who's on call: [Name]
  - Backup: [Name]

---

## Platform-Specific Checks

### If Deploying to Vercel (Next.js)

- [ ] Build settings correct
  - Build command: `npm run build`
  - Output directory: `.next`
  - Install command: `npm install`

- [ ] Environment variables set in Vercel dashboard

- [ ] Domain configured
  - Custom domain: [Set / Not set]
  - DNS: [Propagated / Pending]

- [ ] Preview deployments tested
  - Last preview: [Passed / Failed]


## Final Go/No-Go Decision

### Green Flags (Safe to Deploy) ✅
- All critical checks passed
- Tests passing
- Staging environment tested
- Team ready
- Rollback plan clear

### Red Flags (DON'T Deploy) 🚫
- Failing tests
- Missing critical env variables
- Untested critical features
- No rollback plan
- Known critical bugs

---

## Deployment Command

When ready, execute:


### Vercel
```bash
git push origin main
# Or manual: vercel --prod
```

### Manual
```bash
[Your deployment command]
```

---

## Post-Deployment Actions

Immediately after deployment:

1. [ ] **Run smoke tests**
   - [ ] Homepage loads
   - [ ] Login works
   - [ ] [Critical feature] works

2. [ ] **Check error dashboard**
   - Any new errors?
   - Error rate normal?

3. [ ] **Monitor logs**
   - For first 15-30 minutes
   - Watch for anomalies

4. [ ] **Update progress.md**
   - [ ] Mark deployment complete
   - [ ] Note any issues

5. [ ] **Update team**
   - Send "✅ Deployment successful" message
   - Or "⚠️ Issue found: [description]"

---

Ready to deploy? Report the status of each checklist item above.
```

---

## Quick Deployment Health Check

For faster checks, use this:

```
Quick deployment health check:

1. Tests passing? [Y/N]
2. Build successful? [Y/N]
3. Env vars set? [Y/N]
4. Database migrated? [Y/N]
5. Critical paths tested? [Y/N]

If all YES → Deploy
If any NO → Fix before deploying
```
