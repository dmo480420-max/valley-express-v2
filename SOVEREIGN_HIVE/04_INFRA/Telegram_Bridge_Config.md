# 📡 TELEGRAM BRIDGE CONFIG
## Sovereign Hive — Mobile Command Interface
> **Location:** `04_INFRA/Telegram_Bridge_Config.md`  
> **Version:** 1.0 · **Updated:** 2026-04-05  
> **Engine:** Node.js + Telegraf v4 · **Security:** Sovereign-Only Whitelist

---

## 🔑 CREDENTIALS (FILL THESE IN BEFORE RUNNING)

> ⚠️ Never commit this file to a public repository after filling in credentials.

```
**BOT_API_TOKEN:**     8713959114:AAG5hH03BbhzZjtUVcFqhWGs2S6525DPUrs

**AUTHORIZED_CHAT_ID:**  7244760427

**AUTHORIZED_USERNAME:**  [ PASTE YOUR TELEGRAM @USERNAME HERE (without @) ]
```

**How to get your Chat ID:**
1. Message `@userinfobot` on Telegram
2. It will reply with your User ID — paste that above

**How to create your Bot Token:**
1. Open Telegram → search `@BotFather`
2. Send `/newbot` → follow prompts → copy the API token

---

## 🏗️ ARCHITECTURE

```
Your Phone (Telegram)
        ↓
  Telegram API (polling)
        ↓
  04_INFRA/telegram_bridge.js   ← Node.js listener (runs locally)
        ↓
  SECURITY GATE (whitelist check)
        ↓
  Command Router:
  ├── /new_project  → Creates folder in 03_JAZZO_AGENCY + triggers Blitz Workflow
  ├── /status       → Reads active render task log from 04_INFRA/render_queue.json
  ├── /render       → Writes prompt to Hollywood Director queue
  └── /sync         → Copies latest .md files to 00_GLOBAL_BRAIN
```

---

## 🔒 SECURITY GATE — SOVEREIGN-ONLY

The bot will **silently ignore** all messages from unauthorized senders.  
No error is returned to the unauthorized user — zero information leakage.

**Authorization check (applied to every incoming message):**
```javascript
const AUTHORIZED_ID = YOUR_CHAT_ID;  // Set in telegram_bridge.js
if (ctx.from.id !== AUTHORIZED_ID) return;  // Silent drop
```

Only one user ID is ever authorized. Group chats are automatically rejected.

---

## 📋 COMMAND MENU

### `/new_project [Industry]`
**Triggers:** Blitz Workflow  
**Action:**
1. Creates a timestamped client folder in `03_JAZZO_AGENCY/clients/`
2. Copies `orchestrator_output_template.json` into the new folder
3. Returns confirmation with folder path  
**Usage:** `/new_project Barbershop`  
**Response:** `✅ Project created: 03_JAZZO_AGENCY/clients/Barbershop_2026-04-05/`

---

### `/status`
**Triggers:** Render queue read  
**Action:**
1. Reads `04_INFRA/render_queue.json`
2. Returns list of active/pending/completed render tasks (Kling / Veo / Hollywood Director)  
**Usage:** `/status`  
**Response:**
```
📊 Render Queue Status:
🟡 [PENDING]  James_MST6_Barbershop_Hero.mp4 — Hollywood Director
🟢 [COMPLETE] JAZZO_Blade_Intro_Reel.mp4 — Kling
🔴 [FAILED]   Valley_Express_Dispatch_Scene.mp4 — Veo (retry available)
```

---

### `/render [Prompt]`
**Triggers:** Hollywood Director skill  
**Action:**
1. Receives the full prompt text after `/render`
2. Appends it to `04_INFRA/render_queue.json` with timestamp and status `PENDING`
3. Formats it with `[DIRECTOR v1.0]` header
4. Returns confirmation  
**Usage:** `/render James MST-6 opens the barbershop at golden hour, Phoenix AZ, 85mm, triumphant`  
**Response:** `🎬 Render queued: Job #004 · Hollywood Director · PENDING`

---

### `/sync`
**Triggers:** Global Skills folder sync  
**Action:**
1. Scans all `.md` files in the current working directory
2. Copies any modified files (by timestamp) to `00_GLOBAL_BRAIN/`
3. Returns a list of files synced  
**Usage:** `/sync`  
**Response:**
```
🔄 Sync Complete — 3 files updated:
  ✅ Base45_SuperBuilder_v16.md
  ✅ image_mastery.md
  ✅ Sovereign_Orchestrator_v1.md
```

---

## 🚀 SETUP INSTRUCTIONS

### Step 1 — Install Dependencies
```bash
cd C:\Users\msjac\.gemini\antigravity\global_workflows\04_INFRA
npm init -y
npm install telegraf
```

### Step 2 — Fill in Credentials
Edit `telegram_bridge.js` and replace the placeholder values:
```javascript
const BOT_TOKEN = "PASTE_YOUR_BOT_TOKEN_HERE";
const AUTHORIZED_ID = 000000000; // Replace with your numeric Chat ID
```

### Step 3 — Wake Up the Bridge
```powershell
node "C:\Users\msjac\.gemini\antigravity\global_workflows\04_INFRA\telegram_bridge.js"
```

### Step 4 (Optional) — Run Persistently with PM2
```powershell
npm install -g pm2
pm2 start "C:\Users\msjac\.gemini\antigravity\global_workflows\04_INFRA\telegram_bridge.js" --name "sovereign-bridge"
pm2 save
pm2 startup
```
This keeps the bridge alive after reboots.

---

## 🖥️ TERMINAL COMMAND TO WAKE THE BRIDGE

```powershell
node "C:\Users\msjac\.gemini\antigravity\global_workflows\04_INFRA\telegram_bridge.js"
```

You will see:
```
🛡️  Sovereign Bridge ONLINE
🤖  Bot: @YourBotName
🔒  Authorized ID: [your ID]
📡  Listening for commands...
```

Send `/status` from your phone to confirm it's live.

---

*TELEGRAM BRIDGE CONFIG v1.0*  
*Part of the Base 45 Sovereign Hive — 04_INFRA*
