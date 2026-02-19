# 🚀 Quick Start Guide

Get up and running with AI Agent Development Template in 5 minutes.

## ⚡ Super Fast Start (2 minutes)

### 1. Copy Template to Your Project

```bash
# If starting a new project
mkdir my-new-project
cd my-new-project

# Copy template files
cp -r /path/to/ai-agent-template/.agents .
cp /path/to/ai-agent-template/agents.md .
```

### 2. Choose Your Stack

**For Laravel:**
```bash
cp .agents/templates/TECH_STACK_laravel.md .agents/context/TECH_STACK.md
```

**For Next.js:**
```bash
cp .agents/templates/TECH_STACK_nextjs.md .agents/context/TECH_STACK.md
```

### 3. Initialize Your Project

**Open your AI chat (Claude/ChatGPT) and paste:**

```
Read the file .agents/prompts/01_project_setup.md and follow its instructions to help me set up this project.
```

The AI will:
1. ✅ Ask you discovery questions
2. ✅ Create all documentation files
3. ✅ Set up progress tracking
4. ✅ Be ready to start building

That's it! Your AI now has complete context.

---

## 📖 Common Commands for Your AI

Once set up, use these commands in your AI chat:

### Starting a New Session
```
Read agents.md and follow the Session Initialization Protocol
```

### Check Progress
```
What's next? (reads progress.md)
```

### Add a Feature
```
New feature: [describe feature]
(AI will use 02_create_prd.md workflow)
```

### Fix a Bug
```
Debug this: [describe bug]
(AI will use 04_bug_fix.md workflow)
```

### Review Code
```
Review my code using .agents/prompts/05_code_review.md
```

### Before Deployment
```
Run pre-deployment checklist from .agents/prompts/07_deployment.md
```

---

## 🎯 First Steps After Setup

### 1. Verify Tech Stack (2 min)
Open `.agents/context/TECH_STACK.md` and update:
- [ ] Exact version numbers
- [ ] Deployment platform
- [ ] Database choice
- [ ] External services

### 2. Fill in PRD (10 min)
The AI created `.agents/context/PRD.md` from your answers. Review it:
- [ ] User stories complete?
- [ ] Acceptance criteria clear?
- [ ] Out-of-scope items listed?

### 3. Check Implementation Plan (5 min)
Review `.agents/context/IMPLEMENTATION_PLAN.md`:
- [ ] Steps make sense?
- [ ] Priorities correct?
- [ ] Any missing tasks?

### 4. Start Building! 🎉
Tell your AI:
```
I've reviewed all the documentation. Let's start with step 1.1 of the implementation plan.
```

---

## 🔧 Daily Workflow

### Morning (Starting New Session)
```
1. Open AI chat
2. Say: "Read progress.md and tell me what's next"
3. AI summarizes and proposes next task
4. Say: "Approved, start implementing"
```

### During Development
- AI writes code following guidelines
- AI updates progress.md automatically
- If AI makes mistake → Add to lessons.md

### End of Day
```
Say: "Update progress.md with today's work"
AI documents what was completed
```

---

## 💡 Pro Tips

### 1. Trust the Planning Mode
When AI asks questions, it's gathering context. Don't skip it!

### 2. Keep Documentation Updated
The system only works if docs are current:
- Update TECH_STACK.md when adding packages
- Update progress.md after each session
- Document mistakes in lessons.md

### 3. Use the Prompts
Don't freestyle - use the prompts in `.agents/prompts/`:
- They're battle-tested
- They prevent AI from skipping steps
- They ensure consistent quality

### 4. Be Specific
Instead of: "Add user management"
Say: "New feature: Users can edit their profile including name, email, and avatar"

### 5. Review Before Approval
When AI proposes implementation:
- Read the plan
- Check it against PRD
- Verify it follows BEST_PRACTICES
- Then approve

---

## 🆘 Troubleshooting

### AI Forgot Context
```
Say: "Read agents.md session initialization"
```

### AI Using Wrong Versions
```
Say: "Check .agents/context/TECH_STACK.md for correct versions"
```

### AI Repeating Mistakes
```
Say: "Check .agents/memory/lessons.md before proceeding"
```

### Lost Track of Progress
```
Say: "Read .agents/memory/progress.md and summarize current state"
```

---

## 📚 File Quick Reference

| File | Purpose | When to Update |
|------|---------|----------------|
| `agents.md` | AI operating instructions | Rarely (core rules) |
| `.agents/context/TECH_STACK.md` | Locked versions | When adding packages |
| `.agents/context/PRD.md` | Product requirements | When scope changes |
| `.agents/context/BEST_PRACTICES.md` | Coding patterns | When establishing new patterns |
| `.agents/memory/progress.md` | Current state | After every task |
| `.agents/memory/lessons.md` | Mistakes & solutions | After every mistake |

---

## 🎓 Learning Path

**Week 1**: Use basic prompts
- Project setup
- New features
- Bug fixes

**Week 2**: Customize for your needs
- Add your own coding rules
- Create custom prompts
- Tune BEST_PRACTICES

**Week 3**: Scale up
- Try complex features
- Refactor existing code
- Pre-deployment checklists

---

## ✅ Success Checklist

You know it's working when:
- [ ] AI remembers previous sessions
- [ ] AI asks questions instead of assuming
- [ ] AI doesn't repeat past mistakes
- [ ] AI follows your tech stack strictly
- [ ] Documentation stays current automatically

---

## 🚀 Ready to Build?

```
Paste this into your AI:

"I'm using the AI Agent Development Template. 
Read agents.md to understand how to work with me.
Then read .agents/memory/progress.md and tell me what we should work on next."
```

Let's build something amazing! 🎉
