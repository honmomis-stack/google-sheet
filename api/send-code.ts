// Vercel serverless function. The production host is Vercel (static Vite SPA +
// /api functions) — the Express server in ../server.ts only runs for local
// `npm run dev`, so the real endpoint in prod lives here.
//
// Sends a golden code to the ADMIN's own Telegram chat as a tap-to-copy
// <code> message; the admin then forwards it to the student (a forward keeps
// the entity). Guarded by the caller's Supabase admin JWT so it isn't an open
// relay. Body: { code }. Header: Authorization: Bearer <supabase access_token>.

type Req = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};
type Res = {
  status: (code: number) => Res;
  json: (body: unknown) => void;
};

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";
const APP_URL = process.env.APP_URL || "https://google-sheet.reankh.org/";
const ADMIN_EMAILS = ["hon.mom.is@gmail.com", "hon.mom.edu@gmail.com"];
// The code is bot-delivered to the admin, who forwards it on to the student.
const ADMIN_CHAT_ID = (process.env.ADMIN_TELEGRAM_ID || (process.env.ADMIN_TELEGRAM_IDS || "").split(",")[0] || "").trim();

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const authHeader = req.headers["authorization"];
    const token = (Array.isArray(authHeader) ? authHeader[0] : authHeader || "").replace(/^Bearer\s+/i, "").trim();
    const body = (typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {})) as { code?: string };
    const code = body.code;

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
      return res.status(502).json({ error: tg.description || "Telegram rejected the message" });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error("[/api/send-code]", err);
    return res.status(500).json({ error: "Send failed" });
  }
}
