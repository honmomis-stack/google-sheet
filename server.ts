import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Log requests
app.use((req, res, next) => {
  console.log(`[Express] ${req.method} ${req.url}`);
  next();
});


// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: process.env.NODE_ENV });
});

// ── Send a golden code to Telegram via the shared reankh.org bot ────────────
// Uses the SAME bot token as reankh.org (set TELEGRAM_BOT_TOKEN on the host).
// The code is wrapped in <code>…</code> so Telegram renders it tap-to-copy.
// Guarded by the caller's Supabase admin JWT so it can't be used as an open
// relay. Body: { code, chatId }. Authorization: Bearer <supabase access_token>.
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";
const APP_URL = process.env.APP_URL || "https://google-sheet.reankh.org/";
const ADMIN_EMAILS = ["hon.mom.is@gmail.com", "hon.mom.edu@gmail.com"];
// Codes are bot-delivered to the ADMIN's own chat; the admin then forwards the
// (tap-to-copy) message on to the student. A forward keeps the <code> entity.
const ADMIN_CHAT_ID = (process.env.ADMIN_TELEGRAM_ID || (process.env.ADMIN_TELEGRAM_IDS || "").split(",")[0] || "").trim();

app.post("/api/send-code", async (req, res) => {
  try {
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "").trim();
    const { code } = (req.body || {}) as { code?: string };

    if (!TELEGRAM_BOT_TOKEN) return res.status(500).json({ error: "TELEGRAM_BOT_TOKEN not configured on the server" });
    if (!ADMIN_CHAT_ID) return res.status(500).json({ error: "ADMIN_TELEGRAM_ID not configured on the server" });
    if (!token) return res.status(401).json({ error: "Missing auth token" });
    if (!code) return res.status(400).json({ error: "code is required" });

    // Verify the caller is an admin via their Supabase access token.
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${token}`, apikey: SUPABASE_ANON },
    });
    if (!userRes.ok) return res.status(401).json({ error: "Invalid session — please log in again" });
    const u = (await userRes.json()) as { email?: string };
    if (!ADMIN_EMAILS.includes((u.email || "").toLowerCase())) {
      return res.status(403).json({ error: "Admin only" });
    }

    // <code>…</code> → tap-to-copy in Telegram.
    const text =
      `🎉 <b>លេខកូដសម្ងាត់មាស (Golden Code)</b>\n` +
      `សាលាខ្មែរ Google Sheets\n\n` +
      `🔑 កូដរបស់អ្នក (ចុចលើកូដ ដើម្បីចម្លង)៖\n<code>${code}</code>\n\n` +
      `🔗 តំណចូល៖ ${APP_URL}\n\n` +
      `👉 ① ចូលតំណខាងលើ → ② Login ដោយ Gmail → ③ បញ្ចូលកូដខាងលើ\n` +
      `⚠️ កូដនេះប្រើបានតែ ១ ដងប៉ុណ្ណោះ។`;

    const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text, parse_mode: "HTML" }),
    });
    const tg = (await tgRes.json()) as { ok?: boolean; description?: string };
    if (!tg.ok) {
      return res.status(502).json({ error: tg.description || "Telegram rejected the message (user may not have started the bot)" });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error("[/api/send-code]", err);
    return res.status(500).json({ error: "Send failed" });
  }
});


// Vite & Static file serving setup
async function setupVite() {
  const distPath = path.join(process.cwd(), "dist");
  const isProd = process.env.NODE_ENV === "production" || fs.existsSync(path.join(distPath, "index.html"));

  if (!isProd) {
    console.log("Setting up Express with Vite Dev Middleware...");
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.warn("Failed to load Vite fallback to static serving:", e);
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  } else {
    console.log("Setting up Express in production mode...");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Khmer Sheet School] Express Server listening on port ${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Vite startup crash:", err);
});
