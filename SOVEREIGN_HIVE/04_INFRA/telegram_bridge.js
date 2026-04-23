/**
 * ============================================================
 * SOVEREIGN BRIDGE — Telegram Bot Listener
 * Base 45 Sovereign Hive · 04_INFRA/telegram_bridge.js
 * ============================================================
 * SETUP: npm install telegraf
 * RUN:   node telegram_bridge.js
 * ============================================================
 */

const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");

// ============================================================
// 🔑 CREDENTIALS — FILL THESE IN
// ============================================================

const BOT_TOKEN     = "8713959114:AAG5hH03BbhzZjtUVcFqhWGs2S6525DPUrs";       // From @BotFather
const AUTHORIZED_ID = 7244760427;                          // Your numeric Telegram User ID
const AUTHORIZED_USERNAME = "PASTE_YOUR_USERNAME_HERE";  // Without the @

// ============================================================
// 📁 HIVE PATHS
// ============================================================

const HIVE_ROOT     = path.resolve(__dirname, "..");
const GLOBAL_BRAIN  = path.join(HIVE_ROOT, "00_GLOBAL_BRAIN");
const JAZZO_AGENCY  = path.join(HIVE_ROOT, "03_JAZZO_AGENCY", "clients");
const RENDER_QUEUE  = path.join(__dirname, "render_queue.json");

// ============================================================
// 🔒 SECURITY GATE — Sovereign-Only Middleware
// ============================================================

const sovereignOnly = (ctx, next) => {
  const senderId = ctx.from?.id;
  if (senderId !== AUTHORIZED_ID) {
    // Silent drop — zero information returned to unauthorized user
    console.warn(`[BLOCKED] Unauthorized access attempt from ID: ${senderId} @${ctx.from?.username}`);
    return;
  }
  return next();
};

// ============================================================
// 🛠️ HELPERS
// ============================================================

/**
 * Read or initialize the render queue JSON file
 */
function getRenderQueue() {
  if (!fs.existsSync(RENDER_QUEUE)) {
    fs.writeFileSync(RENDER_QUEUE, JSON.stringify({ jobs: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(RENDER_QUEUE, "utf8"));
}

function saveRenderQueue(data) {
  fs.writeFileSync(RENDER_QUEUE, JSON.stringify(data, null, 2));
}

/**
 * Get status emoji for a render job
 */
function statusEmoji(status) {
  const map = { PENDING: "🟡", COMPLETE: "🟢", FAILED: "🔴", RUNNING: "🔵" };
  return map[status] || "⚪";
}

/**
 * Create a timestamped project folder in 03_JAZZO_AGENCY/clients/
 */
function createProjectFolder(industry) {
  const date = new Date().toISOString().split("T")[0];
  const folderName = `${industry.replace(/\s+/g, "_")}_${date}`;
  const fullPath = path.join(JAZZO_AGENCY, folderName);

  fs.mkdirSync(fullPath, { recursive: true });

  // Drop a starter brand_dna.md in the folder
  const starter = `# ${industry} — Brand DNA\n> Created: ${date}\n> Industry: ${industry}\n\n## Orchestrator Output\n*(Run Sovereign Orchestrator and paste JSON output here)*\n\n## Build Status\n- [ ] Orchestrator classification complete\n- [ ] Identity lock confirmed\n- [ ] Voice clone configured\n- [ ] Website build started\n`;
  fs.writeFileSync(path.join(fullPath, "brand_dna.md"), starter);

  return fullPath;
}

/**
 * Sync modified .md files to 00_GLOBAL_BRAIN
 */
function syncToGlobalBrain() {
  const sourceDir = path.resolve(__dirname, "..");
  const synced = [];

  // Find all .md files in immediate subfolders (not recursive to avoid loop)
  fs.readdirSync(sourceDir).forEach((item) => {
    const itemPath = path.join(sourceDir, item);
    if (fs.statSync(itemPath).isFile() && item.endsWith(".md")) {
      const dest = path.join(GLOBAL_BRAIN, item);
      fs.copyFileSync(itemPath, dest);
      synced.push(item);
    }
  });

  return synced;
}

// ============================================================
// 🤖 BOT INITIALIZATION
// ============================================================

const bot = new Telegraf(BOT_TOKEN);

// Apply security gate to ALL incoming messages
bot.use(sovereignOnly);

// ============================================================
// 📋 COMMAND HANDLERS
// ============================================================

const welcomeMessage = `🛡️ <b>Sovereign Bridge ONLINE</b>

<b>Commands:</b>
/new_project [Industry] — Create project folder
/status — View render queue
/render [Prompt] — Queue a video render
/sync — Sync .md files to Global Brain`;

/**
 * /start — Wake confirmation
 */
bot.start((ctx) => {
  ctx.reply(welcomeMessage, { parse_mode: "HTML" });
});

/**
 * /new_project [Industry]
 * Creates a timestamped client folder in 03_JAZZO_AGENCY/clients/
 */
bot.command("new_project", (ctx) => {
  const args = ctx.message.text.replace("/new_project", "").trim();

  if (!args) {
    return ctx.reply("⚠️ Usage: /new_project [Industry]\nExample: /new_project Barbershop");
  }

  try {
    const folderPath = createProjectFolder(args);
    const relativePath = folderPath.replace(HIVE_ROOT, "").replace(/\\/g, "/");
    ctx.reply(
      `✅ <b>Project Created</b>\n\n📁 <code>03_JAZZO_AGENCY/clients/${path.basename(folderPath)}</code>\n\n📄 brand_dna.md initialized\n\n<i>Run Sovereign Orchestrator with client data to complete setup.</i>`,
      { parse_mode: "HTML" }
    );
    console.log(`[NEW_PROJECT] Created: ${folderPath}`);
  } catch (err) {
    ctx.reply(`❌ Error creating project: ${err.message}`);
    console.error("[NEW_PROJECT ERROR]", err);
  }
});

/**
 * /status
 * Returns current render queue summary
 */
bot.command("status", (ctx) => {
  const queue = getRenderQueue();

  if (!queue.jobs || queue.jobs.length === 0) {
    return ctx.reply("📊 <b>Render Queue</b> — No active jobs.\n\nUse /render [Prompt] to queue a video.", {
      parse_mode: "HTML",
    });
  }

  const lines = queue.jobs.map((job, i) => {
    const emoji = statusEmoji(job.status);
    return `${emoji} [${job.status}] Job #${String(i + 1).padStart(3, "0")} — ${job.engine}\n   <i>${job.prompt.substring(0, 60)}...</i>`;
  });

  ctx.reply(`📊 <b>Render Queue — ${queue.jobs.length} job(s)</b>\n\n${lines.join("\n\n")}`, {
    parse_mode: "HTML",
  });
});

/**
 * /render [Prompt]
 * Queues a video generation request via Hollywood Director
 */
bot.command("render", (ctx) => {
  const prompt = ctx.message.text.replace("/render", "").trim();

  if (!prompt) {
    return ctx.reply(
      "⚠️ Usage: /render [Prompt]\nExample: /render James MST-6 opens the barbershop at golden hour, Phoenix AZ, 85mm, triumphant"
    );
  }

  const queue = getRenderQueue();
  const jobId = String(queue.jobs.length + 1).padStart(3, "0");
  const timestamp = new Date().toISOString();

  const newJob = {
    id: jobId,
    status: "PENDING",
    engine: "Hollywood Director",
    prompt: `[DIRECTOR v1.0] ${prompt}`,
    created: timestamp,
    updated: timestamp,
  };

  queue.jobs.push(newJob);
  saveRenderQueue(queue);

  ctx.reply(
    `🎬 <b>Render Queued</b>\n\nJob #${jobId}\nEngine: Hollywood Director\nStatus: 🟡 PENDING\n\n<code>${prompt.substring(0, 80)}${prompt.length > 80 ? "..." : ""}</code>`,
    { parse_mode: "HTML" }
  );

  console.log(`[RENDER] Queued job #${jobId}: ${prompt.substring(0, 60)}`);
});

/**
 * /sync
 * Force-syncs .md changes to 00_GLOBAL_BRAIN
 */
bot.command("sync", (ctx) => {
  try {
    const synced = syncToGlobalBrain();

    if (synced.length === 0) {
      return ctx.reply("🔄 <b>Sync Complete</b> — No new files found to sync.", { parse_mode: "HTML" });
    }

    const fileList = synced.map((f) => `  ✅ ${f}`).join("\n");
    ctx.reply(`🔄 <b>Sync Complete</b> — ${synced.length} file(s) updated:\n\n${fileList}`, {
      parse_mode: "HTML",
    });

    console.log(`[SYNC] Synced ${synced.length} files to 00_GLOBAL_BRAIN`);
  } catch (err) {
    ctx.reply(`❌ Sync error: ${err.message}`);
    console.error("[SYNC ERROR]", err);
  }
});

/**
 * Catch-all — unknown commands
 */
bot.on("text", (ctx) => {
  if (ctx.message.text.startsWith("/")) {
    ctx.reply("❓ Unknown command. Available:\n/new_project · /status · /render · /sync");
  }
});

// ============================================================
// 🚀 LAUNCH
// ============================================================

bot.launch().then(() => {
  const botInfo = bot.botInfo;
  console.log("\n🛡️  Sovereign Bridge ONLINE");
  console.log(`🤖  Bot: @${botInfo?.username || "connecting..."}`);
  console.log(`🔒  Authorized ID: ${AUTHORIZED_ID}`);
  console.log(`🔒  Authorized Username: @${AUTHORIZED_USERNAME}`);
  console.log(`📡  Listening for commands...\n`);
});

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
