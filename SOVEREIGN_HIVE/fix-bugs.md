---
description: Fix bugs systematically with intelligent routing to specialized fix workflows. Routes by issue type - type errors, UI issues, CI/CD failures, test failures, log analysis, parallel fixes for multiple issues, complex/hard issues, and fast fixes for simple bugs. Uses debugger, tester, and code-reviewer subagents with debugging and problem-solving skills.
---

# Role
You are an expert AI agent specializing in this workflow.

# Fix Bugs Workflow

Intelligent bug fixing with specialized routes based on issue type.

## Decision Tree

**1. Check for existing plan:**
- If markdown plan exists → Implement from plan

**2. Route by issue type:**

| Issue Type | Route | Description |
|------------|-------|-------------|
| Type errors | `/fix:types` | TypeScript/type checking errors |
| UI/UX issues | `/fix:ui` | Design, layout, style, responsive issues |
| CI/CD failures | `/fix:ci` | GitHub Actions, pipeline, deployment issues |
| Test failures | `/fix:test` | Jest, Vitest, test suite problems |
| Log analysis | `/fix:logs` | Error logs, stack traces, server logs |
| Multiple independent issues | `/fix:parallel` | 2+ unrelated issues in different areas |
| Complex issues | `/fix:hard` | Architecture, refactor, system-wide problems |
| Simple bugs (default) | `/fix:fast` | Single file, straightforward fixes |

---

# Role
You are an expert AI agent specializing in this workflow.

## Fast Fix Workflow

For small, straightforward issues:

1. **Analyze** - If screenshot/video provided, describe issue in detail
2. **Debug** - Use debugger to find root cause
3. **Activate skills** - `debugging` + `problem-solving`
4. **Implement** - Fix based on reports
5. **Test** - Verify fix works
6. **Iterate** - If tests fail, repeat from step 2
7. **Report** - Summary of changes, next steps

---

# Role
You are an expert AI agent specializing in this workflow.

## Hard Fix Workflow

For complex, architecture-level issues:

1. **Analyze** - If screenshot/video, describe issue
2. **Questions** - Ask probing questions until 100% clear
3. **Debug** - Find root cause
4. **Research** - Investigate solutions (if needed)
5. **Plan** - Create implementation plan
6. **Implement** - Execute plan step by step
7. **Report** - Summary, offer to commit to git

Skills: `sequential-thinking`, `problem-solving`, `debugging`

---

# Role
You are an expert AI agent specializing in this workflow.

## Parallel Fix Workflow

For multiple independent issues:

1. **Analyze** - Debug all issues, categorize by scope
2. **Plan** - Create parallel-executable fix plan with dependency graph
3. **Execute** - Launch multiple agents for independent fixes simultaneously
4. **Sequential** - Handle dependent fixes in order
5. **Test** - Full test suite
6. **Review** - Code review all changes
7. **Report** - Summary of all fixes

---

# Role
You are an expert AI agent specializing in this workflow.

## UI Fix Workflow

For design, layout, style issues:

1. **Search** - Query design database for context
2. **Analyze** - Describe visual issues from screenshots
3. **Implement** - Apply fix following design guidelines
4. **Verify** - Screenshot and analyze result
5. **Test** - Compile and test
6. **Report** - Summary of changes

---

# Role
You are an expert AI agent specializing in this workflow.

## Log Analysis Workflow

1. **Setup** - Ensure logs are being captured to file
2. **Analyze** - Read last 30 lines of logs
3. **Scout** - Find exact location in codebase
4. **Plan** - Create fix plan
5. **Implement** - Apply fix
6. **Test** - Verify fix works
7. **Review** - Quick code review

---

# Role
You are an expert AI agent specializing in this workflow.

## CI/CD Fix Workflow

1. **Analyze** - Read GitHub Actions logs with `gh` command
2. **Implement** - Fix based on root cause
3. **Test** - Verify fix works
4. **Report** - Summary of changes

---

# Role
You are an expert AI agent specializing in this workflow.

## Type Errors Workflow

```bash
bun run typecheck  # or tsc / npx tsc
```

**Rules:**
- Fix ALL type errors
- Repeat until no errors remain
- NEVER use `any` just to pass type check
