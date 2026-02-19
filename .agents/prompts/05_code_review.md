# 🔍 Code Review Request

**Use this prompt when you want the AI to review code**

---

```
I need you to review some code. Enter REVIEW MODE and perform a thorough analysis.

CODE TO REVIEW: [Specify what to review]

Options:
- [ ] Specific file: [path/to/file.tsx]
- [ ] Entire feature: [feature name]
- [ ] Recent changes: [last commit / last hour of work]
- [ ] Everything in the project

---

## Review Checklist

Go through this checklist systematically:

### 1. Compliance with Project Standards

Check against `.agents/context/` files:

- [ ] **TECH_STACK.md**: Are correct library versions used?
- [ ] **BEST_PRACTICES.md**: Are patterns followed correctly?
- [ ] **FRONTEND_GUIDELINES.md**: UI components match design system? (if applicable)
- [ ] **BACKEND_STRUCTURE.md**: Database schema followed? (if applicable)
- [ ] **API_CONTRACTS.md**: API responses match spec? (if applicable)

### 2. Code Quality

- [ ] **Single Responsibility**: Does each function/component do one thing?
- [ ] **No Code Duplication**: Any repeated code that should be extracted?
- [ ] **Naming**: Are variables/functions clearly named?
- [ ] **Comments**: Complex logic explained? No unnecessary comments?
- [ ] **Type Safety** (if TypeScript): No `any` types? Proper interfaces?

### 3. Error Handling

- [ ] **Try-Catch**: All async operations wrapped?
- [ ] **User-Friendly Errors**: Error messages helpful to users?
- [ ] **Logging**: Errors logged for debugging?
- [ ] **Graceful Degradation**: App doesn't crash on errors?

### 4. Security

- [ ] **Input Validation**: All user inputs validated?
- [ ] **SQL Injection**: Using parameterized queries / ORM? (Laravel/Prisma)
- [ ] **XSS Protection**: User content sanitized?
- [ ] **Secrets**: No API keys or passwords in code?
- [ ] **Authentication**: Protected routes actually protected?

### 5. Performance

- [ ] **N+1 Queries**: Using eager loading? (Laravel)
- [ ] **Unnecessary Re-renders**: React components optimized? (Next.js)
- [ ] **Image Optimization**: Using next/image? (Next.js)
- [ ] **Database Indexes**: Frequently queried fields indexed? (if applicable)
- [ ] **Lazy Loading**: Heavy components lazy loaded?

### 6. UX/UI (if applicable)

- [ ] **Loading States**: Shown during async operations?
- [ ] **Error States**: Displayed when things fail?
- [ ] **Empty States**: Handled when no data?
- [ ] **Responsive**: Works on mobile and desktop?
- [ ] **Accessibility**: Keyboard navigation? Screen reader support?

### 7. Testing Considerations

- [ ] **Testability**: Code structured for easy testing?
- [ ] **Edge Cases**: Handled (empty arrays, null values, etc.)?
- [ ] **Validation**: Form validation working?

### 8. Common Mistakes Check

Review `.agents/memory/lessons.md`:

- [ ] Are we repeating any past mistakes?
- [ ] Are we violating any documented lessons learned?

---

## Review Output Format

Provide the review in this structure:

### ✅ Strengths
[What's done well in this code]

### ⚠️ Issues Found

#### 🔴 Critical (must fix before deployment)
1. **Issue**: [Description]
   **Location**: [File:Line]
   **Why it's critical**: [Explanation]
   **Fix**: [Suggested solution]

2. [Next critical issue...]

#### 🟡 Warnings (should fix soon)
1. **Issue**: [Description]
   **Location**: [File:Line]
   **Impact**: [What could go wrong]
   **Fix**: [Suggested solution]

#### 🔵 Suggestions (nice to have)
1. **Suggestion**: [Description]
   **Why**: [Benefit of making this change]
   **Example**: [Show better approach]

### 📚 Lessons to Document

If this review reveals patterns to avoid:
- [ ] Add to `.agents/memory/lessons.md`: [What to add]
- [ ] Update `.agents/context/BEST_PRACTICES.md`: [What to add]

### 🎯 Overall Assessment

- **Code Quality Score**: [1-10]
- **Ready for Production?**: Yes / No / With Fixes
- **Estimated Time to Fix Issues**: [time estimate]

---

## After Review

Ask me:
"Would you like me to:
1. Fix the critical issues now?
2. Create a checklist of all issues for you to fix?
3. Explain any of the issues in more detail?"

---

## Quick Review Commands

For faster reviews, you can also say:

- "Quick security review" → Focus only on security checklist
- "Quick performance review" → Focus only on performance
- "Quick standards review" → Check against BEST_PRACTICES.md only
- "Full deep review" → Complete thorough analysis
```

---

## Example Usage

```
I need you to review some code. Enter REVIEW MODE.

CODE TO REVIEW: src/app/api/users/route.ts

[Paste code or specify file path]

Please perform a full review using the checklist above.
```
