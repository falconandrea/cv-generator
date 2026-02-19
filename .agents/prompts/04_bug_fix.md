# 🐛 Bug Fix Protocol

**Copy and fill in the bug details before pasting to your AI**

---

```
I found a bug that needs to be fixed. Let's debug it systematically.

BUG: [Brief description, e.g., "Login form doesn't show validation errors"]

---

## Step 1: Bug Details

### What's happening?
[Describe the current buggy behavior]

Example: "When I submit the login form with invalid email, no error message appears"

### What should happen?
[Describe the expected behavior]

Example: "Should show 'Invalid email format' error below the email field"

### How to reproduce?
[Step-by-step reproduction steps]

Example:
1. Go to /login
2. Enter "notanemail" in email field
3. Click "Sign In" button
4. [BUG] No error message appears

### Where does it happen?
- **Environment**: Development / Staging / Production
- **Browser**: Chrome / Safari / Firefox / All
- **Device**: Desktop / Mobile / Both
- **Frequency**: Always / Sometimes / Rare

### Recent changes?
[Was this working before? Any recent code changes related to this?]

Example: "Was working last week, broke after I updated React Hook Form"

---

## Step 2: Initial Investigation

Before you start debugging, do these checks:

1. **Check `.agents/memory/lessons.md`**
   - Have we encountered this bug before?
   - Is there a known solution?

2. **Check `.agents/context/TECH_STACK.md`**
   - Are all library versions correct?
   - Any version conflicts?

3. **Check `.agents/memory/progress.md`**
   - What was the last thing changed?
   - Could recent work have caused this?

Report your findings before proceeding.

---

## Step 3: Debugging Plan

Enter DEBUG MODE and propose a debugging strategy:

### Hypothesis
What do you think is causing this?

Example: "Validation errors might not be wired up to the UI properly"

### Investigation Steps
List the steps you'll take to find the root cause:

1. [ ] Check [specific file/component]
2. [ ] Verify [specific configuration]
3. [ ] Test [specific scenario]
...

### Code to Inspect
Which files should we look at first?

- [ ] File 1: [path] - [why this file]
- [ ] File 2: [path] - [why this file]
...

---

## Step 4: Root Cause Analysis

After investigating, explain:

### Root Cause
What exactly is causing the bug?

Example: "The `errors` object from useForm is not being destructured, so `errors.email` is always undefined"

### Why did this happen?
- Code logic error?
- Missing implementation?
- Regression from recent change?
- Library bug?
- Environment configuration?

---

## Step 5: Solution Proposal

Propose the fix:

### Changes Needed
```
List the exact changes required:
- File: [path]
  Change: [what to modify]
  
- File: [path]
  Change: [what to modify]
```

### Why this fixes it
Explain how your solution addresses the root cause.

### Side effects?
Could this fix break anything else?

### Testing strategy
How will we verify the fix works?

---

## Step 6: Get Approval

Ask me:
"Does this solution make sense? Should I implement it?"

Wait for my approval before making changes.

---

## Step 7: Implementation

Once approved:

1. Make the fix
2. Test the reproduction steps
3. Test edge cases
4. Verify no regressions in related features

---

## Step 8: Documentation

After fixing:

1. **Update `.agents/memory/lessons.md`**
   Add an entry:
   ```
   ### [DATE] - [CATEGORY] - Bug Fix
   **What went wrong**: [Bug description]
   **Root cause**: [What caused it]
   **Solution**: [How we fixed it]
   **Prevention**: [How to avoid this in the future]
   ```

2. **Update `.agents/memory/progress.md`**
   Mark the bug as fixed

3. **Update `.agents/context/BEST_PRACTICES.md`** (if needed)
   If this bug reveals a pattern to avoid, add it

---

## Example Bug Report

```
BUG: Users can't upload profile pictures larger than 1MB

What's happening?
When users try to upload a 2MB image, they get a generic "Upload failed" error

What should happen?
Should show "File too large. Maximum size is 5MB" and allow retry

Reproduction:
1. Go to /profile/edit
2. Click "Upload Photo"
3. Select image > 1MB
4. [BUG] Generic error, upload fails

Environment: Production
Browser: All browsers
Device: Both desktop and mobile
Frequency: Always

Recent changes:
Changed file storage from local to S3 last week
```

---

Ready to debug? Describe the bug using the template above.
```
