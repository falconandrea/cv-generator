# AI Agent Operating System

> **READ THIS FIRST**: This file tells AI how to work with this project.

---

## 🎯 Core Directives

### Session Start Protocol
1. Read `.agents/memory/progress.md` - current state
2. Read `.agents/memory/lessons.md` - past mistakes
3. Check `.agents/memory/blockers.md` - current issues
4. Check `.agents/context/TECH_STACK.md` - which stack (Next.js)
5. Ask: "Ready to continue with [current task]?"

### Operating Modes

#### 🧠 PLANNING MODE (default)
**Trigger**: Start of session, new feature request, architectural decision

**Actions**:
- Ask questions using `.agents/prompts/02_create_prd.md` for new features
- Propose solutions, DON'T implement
- Update `.agents/context/` files with decisions
- Get explicit "approved to implement" before switching to ACTING MODE

**Exit**: User says "Approved" or "Start implementing"

#### ⚡ ACTING MODE
**Trigger**: After planning approval, or for small changes

**Actions**:
- Write code following `.agents/context/TECH_STACK.md` versions STRICTLY
- **Next.js Projects**: Follow `.agents/guidelines/nextjs/app-router-guidelines.md`
- Reference `.agents/context/BEST_PRACTICES.md` for patterns
- Update `.agents/memory/progress.md` after each completed task
- Mark tasks `[x]` in feature task files

#### 🔍 REVIEW MODE
**Trigger**: After implementation, or when user says "review"

**Actions**:
- Check for violations of `.agents/memory/lessons.md`
- Verify against `.agents/context/PRD.md` acceptance criteria
- Propose improvements

#### 🐛 DEBUG MODE
**Trigger**: When user says "debug this" or reports a bug

**Actions**:
- Use `.agents/prompts/04_bug_fix.md` framework
- Check `.agents/memory/lessons.md` for similar past issues
- Document solution in `.agents/memory/lessons.md` if it's a novel fix

---

## 📚 File Reference Map

### Session Start
1. `agents.md` (this file)
2. `.agents/memory/progress.md` - what's done
3. `.agents/memory/lessons.md` - what not to do
4. `.agents/context/TECH_STACK.md` - which stack

### New Feature Workflow
1. Use `.agents/prompts/02_create_prd.md` → Creates PRD
2. Use `.agents/prompts/03_generate_tasks.md` → Creates task list
3. Work through tasks, marking `[x]` on completion
4. Feature files saved in `.agents/features/[feature-name]/`

### Writing Code
**For ALL projects**:
- `.agents/context/BEST_PRACTICES.md` - patterns to follow



**For Next.js**:
- `.agents/guidelines/nextjs/app-router-guidelines.md`
- `.agents/context/FRONTEND_GUIDELINES.md`

---

## 🚨 Red Flags - Stop and Ask
- Feature not in PRD.md
- Library version different from TECH_STACK.md
- Making breaking changes to API
- Pattern contradicts BEST_PRACTICES.md
- Repeating a mistake from lessons.md

- **Next.js**: Using Pages Router when App Router is specified

---

## 🔄 Update Loop
After every task:
- Update `.agents/memory/progress.md` with what was completed
- If mistake made, update `.agents/memory/lessons.md`
- If blocked, update `.agents/memory/blockers.md`
- Mark feature task as `[x]` if applicable

---

## 💬 Quick Commands
- "Start planning" → Enter PLANNING MODE
- "Show progress" → Read progress.md
- "What's next?" → Read next uncompleted task
- "Review this" → Enter REVIEW MODE
- "Any lessons?" → Read lessons.md
- "Debug this" → Enter DEBUG MODE
- "New feature: [description]" → Use create_prd prompt

---

## ⚠️ Critical Rules

### Never Break These
1. **NO assumptions** - ask before acting
2. **ALWAYS** check TECH_STACK.md for versions
3. **ALWAYS** update progress.md after completing work
4. **NEVER** use deprecated patterns from lessons.md
5. **NEVER** skip error handling

7. **Next.js**: NEVER mix client/server components incorrectly
