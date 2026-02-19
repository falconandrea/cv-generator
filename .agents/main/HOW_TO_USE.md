# 📋 How to Use This Template

Hello! You just received a complete system for working with AI agents professionally. Here's what to do now.

---

## 🎯 What You Got

A **repository template** with:
- ✅ AI operating system (PLANNING/ACTING/REVIEW/DEBUG modes)
- ✅ Persistent memory across sessions
- ✅ Best practices for Laravel 12 and Next.js 15+
- ✅ 7 ready-to-use workflow prompts
- ✅ Complete documentation templates
- ✅ Real examples of errors and solutions

---

## 🚀 First 3 Steps (5 minutes)

### 1. Save the Template Repository
```bash
# Create a directory for your templates
mkdir -p ~/templates
cd ~/templates

# Save this template
mv /path/to/ai-agent-template ./ai-agent-template
```

### 2. Read QUICK_START.md
```bash
cd ai-agent-template
cat .agents/main/QUICK_START.md
```
It explains everything in 5 minutes.

### 3. Try It on a New Project
```bash
# Create a new project
mkdir my-test-project
cd my-test-project

# Copy the template
cp -r ~/templates/ai-agent-template/.agents .
cp ~/templates/ai-agent-template/agents.md .

# Choose your stack
cp .agents/templates/TECH_STACK_nextjs.md .agents/context/TECH_STACK.md
# or
cp .agents/templates/TECH_STACK_laravel.md .agents/context/TECH_STACK.md

# Initialize git
git init
git add .
git commit -m "Initial commit with AI agent template"
```

---

## 🎓 Complete Workflow (First Time)

### Phase 1: Project Setup (15-30 min)

1. **Open your AI tool** (Claude, ChatGPT, etc.)

2. **Load the setup prompt**:
   ```
   Copy all content from .agents/prompts/01_project_setup.md
   Paste it in the chat
   ```

3. **Answer the AI's questions**:
   - What are you building?
   - Who is it for?
   - Which stack are you using?
   - Which database?
   - Which external services?
   - etc.

4. **AI will create all files** in `.agents/context/`:
   - PRD.md
   - APP_FLOW.md
   - BACKEND_STRUCTURE.md
   - IMPLEMENTATION_PLAN.md
   - etc.

5. **Review and approve**

6. **AI will say**: "✅ Setup complete. Type 'Start implementing' to begin."

### Phase 2: Development (Daily)

**Every morning**:
```
Open new chat with AI
Paste: "Read agents.md and follow Session Initialization Protocol"
```

AI will:
- Read progress.md
- Read lessons.md
- Tell you what's been done
- Suggest what to do today

**During the day**:
- Ask AI to implement features
- AI follows the guidelines
- AI updates progress.md
- If it makes mistakes, add to lessons.md

**Evening**:
```
Tell AI: "Update progress.md with today's work"
```

### Phase 3: New Features (Each time)

```
Copy .agents/prompts/02_create_prd.md
Fill in feature details
Paste in chat
```

AI will:
- Ask clarifying questions
- Verify scope
- Propose implementation
- Ask for approval
- Implement
- Update docs

### Phase 4: Bug Fix (When needed)

```
Copy .agents/prompts/04_bug_fix.md
Describe the bug
Paste in chat
```

AI will:
- Check if similar error exists in lessons.md
- Do systematic debugging
- Propose solution
- Document in lessons.md

---

## 💡 Practical Tips

### 1. Use Quick Commands

Instead of writing long prompts every time:

```
# ✅ Fast
"What's next?"
"New feature: users can upload avatar"
"Debug this: login form not validating"
"Review my code"

# ❌ Slow
"Can you tell me what I should work on next based on the progress file and implementation plan..."
```

### 2. Keep progress.md Updated

**Every day**:
```
End of day: "Update progress.md"
```

**Why it matters**:
- AI reads it at the start of every session
- If not updated, AI doesn't know what you did
- It's the AI's "short-term memory"

### 3. Document ALL Errors in lessons.md

**When AI makes mistakes**:
```
"Add this mistake to lessons.md:
- What went wrong: [explain]
- Solution: [explain]
- Prevention: [how to avoid]"
```

**Why it matters**:
- AI will NEVER repeat the same error
- It's the AI's "long-term memory"

### 4. Don't Skip Planning Mode

When asking for a feature:
```
❌ Wrong:
"Create a login system"

✅ Correct:
Use .agents/prompts/02_create_prd.md
AI will ask questions
You answer
Then AI implements properly
```

**Why**:
- 10 min of planning saves hours of refactoring
- AI needs complete context

---

## 🎯 Files to Keep Updated

### HIGH Priority (always update)
1. **progress.md** - After every task
2. **lessons.md** - After every error
3. **TECH_STACK.md** - When adding packages

### MEDIUM Priority (update when needed)
4. **PRD.md** - When scope changes
5. **BACKEND_STRUCTURE.md** - When DB schema changes
6. **API_CONTRACTS.md** - When API changes

### LOW Priority (rarely)
7. **BEST_PRACTICES.md** - When establishing new patterns
8. **agents.md** - Almost never (core rules)

---

## 🔧 Customization

### 1. Modify BEST_PRACTICES.md
Add your preferred patterns:
```markdown
## My Team's Patterns

### Component Naming
- Feature components: `Feature[Name].tsx`
- UI components: `[Name].tsx`
- Containers: `[Name]Container.tsx`
```

### 2. Create Custom Prompts
In `.agents/prompts/` add your own:
```bash
.agents/prompts/08_my_workflow.md
.agents/prompts/09_team_review.md
```

### 3. Add Specific Templates
In `.agents/templates/` add your own:
```bash
.agents/templates/my-controller-template.md
.agents/templates/my-component-template.md
```

---

## 📊 How to Know It's Working

### After 1 Week

You should notice:
- ✅ AI remembers what you did yesterday
- ✅ AI asks before coding
- ✅ progress.md is updated

If not:
- Are you updating progress.md?
- Are you using the prompts?
- Are you telling AI to read agents.md?

### After 1 Month

You should notice:
- ✅ AI doesn't repeat past errors
- ✅ You have a library of useful lessons.md entries
- ✅ AI follows the stack correctly

If not:
- Are you documenting errors in lessons.md?
- Is TECH_STACK.md updated?

---

## 🆘 Common Problems

### "AI keeps forgetting context"

**Solution**:
```
Every time you open new chat:
"Read agents.md and follow Session Initialization Protocol"
```

### "AI uses wrong versions"

**Solution**:
```
1. Verify TECH_STACK.md is filled in
2. Tell AI: "Check TECH_STACK.md for correct versions"
```

### "AI repeats the same errors"

**Solution**:
```
1. Did you document the error in lessons.md?
2. Tell AI: "Check lessons.md before proceeding"
```

### "progress.md is a mess"

**Solution**:
```
1. Copy progress.md template again
2. Refill from scratch
3. From now on, ALWAYS update after every task
```

---

## 🎓 Advanced Workflows (After 1 Month)

### Multi-Project
Use the same template for multiple projects:
```bash
~/projects/
  project-a/.agents/  # same rules
  project-a/agents.md # same index
  project-b/.agents/  # same rules
  project-b/agents.md # same index
```

### Team Collaboration
Commit `.agents/` and `agents.md` to Git:
```bash
git add .agents/ agents.md
git commit -m "Add AI agent system"
```

The whole team uses the same system.

### Custom Skills
Create domain-specific skills:
```bash
.agents/ecommerce/checkout-patterns.md
.agents/saas/subscription-patterns.md
```

---

## 🖥️ IDE Configuration

If you use an AI-powered IDE, you can configure it to work with this template.

### Cursor

Create a `.cursorrules` file in your project root:

```
# Cursor AI Rules

## AI Behavior
Always read agents.md before starting any work.
Follow the Operating Modes strictly (PLANNING → ACTING → REVIEW).
Update .agents/memory/progress.md after completing tasks.

## Session Start
1. Read agents.md
2. Read .agents/memory/progress.md
3. Read .agents/memory/lessons.md
4. Ask: "Ready to continue with [current task]?"

## File Priority
1. agents.md - Main instructions
2. .agents/memory/progress.md - Current state
3. .agents/context/TECH_STACK.md - Stack versions
4. .agents/context/BEST_PRACTICES.md - Patterns
5. Relevant .agents/context/ files for current task

## Rules
- Never assume - always ask in PLANNING MODE
- Always check TECH_STACK.md for versions before using libraries
- Always update progress.md after work
- Never repeat mistakes from lessons.md
```

### Windsurf

Create a `.windsurfrules` file in your project root with the same content as above.

### Other AI IDEs

Most AI-powered IDEs support a rules file. Check your IDE documentation and create a similar file with the rules above.

---

## 📚 Study Material

### Read Now
1. **QUICK_START.md** - 5 minutes
2. **README.md** - 15 minutes
3. **agents.md** - 10 minutes

### Read This Week
4. **.agents/context/BEST_PRACTICES.md** - 20 minutes
5. **All .agents/prompts/** - 30 minutes

### Stack-Specific
6. **Laravel**: `.agents/guidelines/laravel/sail-guidelines.md`
7. **Next.js**: `.agents/guidelines/nextjs/app-router-guidelines.md`

---

## 🎉 You're Ready!

### Final Checklist

- [ ] Template saved
- [ ] Read QUICK_START.md
- [ ] Read this file (HOW_TO_USE.md)
- [ ] Chose a test project
- [ ] Copied template to project
- [ ] Chose stack (Laravel or Next.js)
- [ ] Ready to run setup prompt

### Next Step

```bash
cd your-new-project
# Open your AI tool
# Paste content of .agents/prompts/01_project_setup.md
# Answer the questions
# Start building! 🚀
```

---

**Good luck! 🍀**

You have everything you need to work productively with AI agents.

If you have questions, re-read:
- QUICK_START.md for setup
- README.md for full docs

**Remember**: The system works IF you use it. Update progress.md and lessons.md always!
