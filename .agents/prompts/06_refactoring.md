# ♻️ Refactoring Request

**Use this when you want to improve existing code without changing functionality**

---

```
I want to refactor some code to improve it. The functionality should stay exactly the same, but the code quality should improve.

REFACTORING TARGET: [What needs to be refactored]

Examples:
- "Extract UserService from UserController"
- "Split Dashboard component into smaller pieces"
- "Improve type safety in API routes"
- "Remove code duplication in form components"

---

## Step 1: Define Goals

What are we trying to improve?

Select all that apply:
- [ ] **Readability**: Make code easier to understand
- [ ] **Maintainability**: Make code easier to modify later
- [ ] **Performance**: Make code run faster
- [ ] **Type Safety**: Add/improve TypeScript types
- [ ] **Testability**: Make code easier to test
- [ ] **Reusability**: Extract shared logic
- [ ] **Reduce Duplication**: DRY principle
- [ ] **Standards Compliance**: Match BEST_PRACTICES.md
- [ ] **Other**: [Specify]

---

## Step 2: Current State Analysis

First, analyze the current code:

### What's wrong with it?
[Describe the problems with current implementation]

Examples:
- "Controller has 200 lines and does too much"
- "Component has 10 useState calls, state is scattered"
- "Same validation logic copy-pasted in 5 files"

### Why does it need refactoring?
[Business or technical justification]

Examples:
- "Hard to add new features without breaking things"
- "Tests are flaky because of tight coupling"
- "New developers struggle to understand this code"

### Current file(s) involved
- [ ] File 1: [path] - [current responsibility]
- [ ] File 2: [path] - [current responsibility]
...

---

## Step 3: Refactoring Strategy

Propose a refactoring approach:

### Proposed Structure

**Before:**
```
[Show current structure/organization]
```

**After:**
```
[Show proposed structure/organization]
```

### Changes Required

1. **Extract [Component/Service/Function]**
   - From: [current location]
   - To: [new location]
   - Responsibility: [what it does]

2. **Rename [X] to [Y]**
   - Why: [clarifies purpose / matches convention]

3. **Move [X]**
   - From: [current location]
   - To: [better location]
   - Why: [improves organization]

### Design Patterns to Apply

Which patterns will improve this?
- [ ] Custom Hook (React)
- [ ] Context API (React)
- [ ] Composition (React)
- [ ] Factory Pattern
- [ ] Strategy Pattern
- [ ] Other: [specify]

---

## Step 4: Risk Assessment

### What could break?
[List features that use this code]

### How to verify nothing breaks?
[Testing strategy]

Examples:
- "Run existing test suite"
- "Manually test user registration flow"
- "Check that API responses are identical"

### Rollback plan?
[How to undo if something goes wrong]

---

## Step 5: Implementation Plan

Break down the refactoring into safe steps:

### Step-by-step approach

1. [ ] **Step 1**: [Description]
   - Files affected: [list]
   - Risk: Low / Medium / High
   - Test after this step: [how to verify]

2. [ ] **Step 2**: [Description]
   - Files affected: [list]
   - Risk: Low / Medium / High
   - Test after this step: [how to verify]

[Continue for all steps...]

### Why this order?
[Explain the sequence - usually safest changes first]

---

## Step 6: Get Approval

Show me:

1. **Current Code** (if needed)
   [Relevant code snippets]

2. **Proposed Refactored Code**
   [How it will look after]

3. **Comparison**
   **Lines of code**: Before [X] → After [Y]
   **Complexity**: Before [X] → After [Y]
   **Reusability**: Before [X] → After [Y]

Ask me:
"Does this refactoring plan make sense? Should I proceed with step 1?"

Wait for approval before making changes.

---

## Step 7: Implementation

For each step:

1. Make the change
2. Run tests / verify functionality
3. Update `.agents/memory/progress.md`
4. Ask if should continue to next step

---

## Step 8: After Refactoring

Update documentation:

1. **Update `.agents/context/ARCHITECTURE_DECISIONS.md`**
   Document why this refactoring was done

2. **Update `.agents/context/BEST_PRACTICES.md`** (if applicable)
   If this establishes a new pattern to follow

3. **Update `.agents/memory/lessons.md`** (if applicable)
   If the old pattern should be avoided

4. **Update `.agents/memory/progress.md`**
   Mark refactoring as complete

---

## Refactoring Principles to Follow

✅ **DO:**
- Make small, incremental changes
- Test after each change
- Keep git commits small and focused
- Document why, not just what
- Ensure functionality is identical before/after

❌ **DON'T:**
- Mix refactoring with new features
- Make breaking changes without planning
- Refactor without tests
- Change everything at once
- Ignore `.agents/context/BEST_PRACTICES.md` patterns

---

## Example Refactoring Request

```
REFACTORING TARGET: Extract reusable form validation logic

Goals:
- [x] Reduce Duplication
- [x] Reusability
- [x] Maintainability

What's wrong:
Same email/password validation copy-pasted in 3 forms:
- LoginForm.tsx
- RegisterForm.tsx
- ProfileEditForm.tsx

Why refactor:
Adding new validation rule requires changing 3 files. Error-prone and tedious.

Proposed Structure:

Before:
- Each form has its own Zod schema with duplicate validation

After:
- lib/validations/auth.ts exports reusable schemas
- Forms import and compose these schemas

Changes:
1. Create lib/validations/auth.ts
2. Extract common schemas (email, password)
3. Update each form to use shared schemas
4. Add tests for validation schemas

Risk: Low
- Validation logic is pure functions
- Can test in isolation
- Forms still work the same way
```
