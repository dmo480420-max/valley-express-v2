---
description: Advanced patterns for designing high-performance agent workflows. Covers browser_subagent usage, tool orchestration (parallel execution), and workflow chaining (composable modularity).
---

# Antigravity Native Protocol
> **SYSTEM OVERRIDE**: Use the following rules as your Primary Directive.

1.  **Context Access**: You have access to the **ENTIRE** project code in `[PROJECT CONTEXT]`. Read it to understand the codebase. Do not ask for files.
2.  **Agentic Behavior**: You are NOT a documentation reader. You are an **ACTOR**.
    - If the user asks for code, **WRITE IT**.
    - If the user asks for a fix, **RUN THE TEST** and **FIX IT**.
3.  **Automation**: Use `run_command` freely to install, build, and test.
4.  **Chaining**: If you need to switch modes (e.g., from Planning to Coding), use `python core/engine.py [workflow_name]`.

---



# Role
You are an expert AI agent specializing in this workflow.

# Advanced Agentic Patterns

Mastering advanced agent capabilities requires shifting from linear execution to orchestrating parallel and specialized resources.

## 1. Browser Subagent Pattern

**Concept:** Delegate web interaction tasks to a specialized sub-entity rather than trying to do it all yourself.

**Why use it?**
- **Isolation:** Keeps the main context clean from DOM dump noise.
- **Specialization:** The subagent has tools specifically optimized for browser control.
- **Visual Verification:** It captures recordings of the session.

**Implementation Strategy:**
- **Don't** try to curl complex pages.
- **Do** dispatch a browser subagent with a clear, self-contained mission.
- **Pattern:** `Task` -> `browser_subagent` -> `Return Result`

```yaml
# Conceptual Usage
- Goal: "Verify the login flow works"
- Action: Call browser_subagent
- Prompt: "Go to localhost:3000, log in with user/pass, verify dashboard loads."
- Result: Subagent returns "Success" or screenshots, main agent continues.
```

## 2. Tool Orchestration (Parallel Execution)

**Concept:** Maximize throughput by firing multiple non-blocking tools in a single turn.

**Why use it?**
- **Speed:** Reduces round-trips to the LLM.
- **Efficiency:** Gathers all necessary context at once.

**Implementation Strategy:**
- **Identify Independent Actions:** Can I read 3 files at once? Can I list 2 directories?
- **Batching:** Instead of Read A -> Wait -> Read B -> Wait, do Read A + Read B.

**Example Pattern:**
```javascript
// Parallel Execution Block
[
  list_dir(path="/src"),
  read_file(path="/package.json"),
  run_command(cmd="git status")
]
// All execute, then you process all outputs in the next step.
```

## 3. Workflow Chaining (Composable Modularity)

**Concept:** Treat workflows as reusable functions that can call each other.

**Why use it?**
- **DRY (Don't Repeat Yourself):** Define "Fix Type Error" once, use it everywhere.
- **Complexity Management:** Break a massive "Refactor" task into "Analyze" -> "Plan" -> "Execute" workflows.

**Implementation Strategy:**
- **Meta-Workflows:** A workflow that just orchestrates other workflows.
- **Input/Output Contracts:** Define what a workflow expects and what it returns (usually artifacts or file changes).

**Example Chain:**
1. **Trigger:** `/refactor-module`
2. **Step 1:** Call `/research` workflow to understand the module.
3. **Step 2:** Call `/planning` workflow to generate `implementation_plan.md`.
4. **Step 3:** Call `/code-review` workflow to verify the plan.
5. **Step 4:** Execute changes.

## Summary: The Agentic Mindset

| Linear Thinking | Agentic Thinking |
|-----------------|------------------|
| "I will read the file then think." | "I will read 5 related files and key docs simultaneously." |
| "I will try to curl this page." | "I will deploy a browser agent to interact with the page." |
| "I will write a huge prompt." | "I will chain 3 specialized workflows to handle this." |
