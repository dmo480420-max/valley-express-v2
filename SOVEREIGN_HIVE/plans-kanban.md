---
description: Plans dashboard server with progress tracking and timeline visualization.
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

# Plans Kanban Workflow

Visual dashboard for viewing plan directories with progress tracking and timeline visualization.

## Installation

```bash
cd .antigravity/skills/plans-kanban
npm install
```

## Quick Start

```bash
# View plans dashboard
node scripts/server.cjs --dir ./plans --open

# Remote access (all interfaces)
node scripts/server.cjs --dir ./plans --host 0.0.0.0 --open

# Background mode
node scripts/server.cjs --dir ./plans --background

# Stop all running servers
node scripts/server.cjs --stop
```

## Features

### Dashboard View
- Plan cards with progress bars
- Phase status breakdown (completed, in-progress, pending)
- Last modified timestamps
- Issue and branch links
- Priority indicators

### Timeline Visualization
- Gantt-style timeline of plans
- Duration tracking
- Activity heatmap

### Design
- Glassmorphism UI with dark mode
- Responsive grid layout
- Warm accent colors

## CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--dir <path>` | Plans directory | - |
| `--port <number>` | Server port | 3500 |
| `--host <addr>` | Host to bind | localhost |
| `--open` | Auto-open browser | false |
| `--background` | Run in background | false |
| `--stop` | Stop all servers | - |

## HTTP Routes

| Route | Description |
|-------|-------------|
| `/` or `/kanban` | Dashboard view |
| `/api/plans` | JSON API for plans data |
| `/assets/*` | Static assets |
| `/file/*` | Local file serving |

## Plan Structure

The dashboard scans for directories containing `plan.md` files:

```
plans/
├── 251215-feature-a/
│   ├── plan.md              # Required
│   ├── phase-01-setup.md
│   └── phase-02-impl.md
├── 251214-feature-b/
│   └── plan.md
└── templates/               # Excluded by default
```

## Remote Access

When using `--host 0.0.0.0`, use `networkUrl` to access from other devices.
