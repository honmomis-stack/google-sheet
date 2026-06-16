var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_genai = require("@google/genai");
var import_fs = __toESM(require("fs"), 1);
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getAIClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is missing. Please add it in Settings > Secrets in AI Studio.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: process.env.NODE_ENV });
});
app.post("/api/gemini/consult", async (req, res) => {
  try {
    const { message, category } = req.body;
    if (!message) {
      return res.status(400).json({ error: "\u179F\u17B6\u179A\u179F\u17BD\u179A\u1793\u17B6\u17C6\u1798\u17B7\u1793\u17A2\u17B6\u1785\u1791\u1791\u17C1\u1794\u17B6\u1793\u1791\u17C1 (Message is required)" });
    }
    const ai = getAIClient();
    const systemInstruction = `
      You are an expert Google Sheets and Google Apps Script trainer specializing in office administrative work, payroll (Tax on Salary in Cambodia), employee database systems, registry tracking, and automated workflows including Telegram updates.
      You respond exclusively in Khmer (\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A) with high-quality formatting, clear spacing, code blocks showing Google Sheets formulas, and structured instructions.

      Guidelines:
      1. Explain formulas clearly in Cambodian context.
      2. When writing formulas, list them in clear code blocks so users can copy them easily (e.g. \`=SUM(A1:A10)\`).
      3. For any Apps Script, write complete, error-free JavaScript with comments in Khmer explaining each line.
      4. Maintain a warm, encouraging, and highly professional tutoring tone.
    `;
    const prompt = `\u1785\u17C6\u178E\u17B6\u178F\u17CB\u1790\u17D2\u1793\u17B6\u1780\u17CB\u179F\u17C6\u1793\u17BD\u179A: ${category || "\u1791\u17BC\u1791\u17C5"} 

 \u179F\u17C6\u1793\u17BD\u179A\u1794\u17BB\u1782\u17D2\u1782\u179B\u17B7\u1780: ${message}`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });
    const reply = response.text;
    res.json({ reply });
  } catch (error) {
    console.error("Consultation error:", error);
    res.status(500).json({ error: error.message || "An error occurred with Gemini API" });
  }
});
app.post("/api/gemini/generate-script", async (req, res) => {
  try {
    const { botToken, chatId, columnsToNotify, triggerType, customMessage } = req.body;
    const token = botToken || "YOUR_TELEGRAM_BOT_TOKEN";
    const chat = chatId || "YOUR_CHAT_ID";
    const selectedCols = columnsToNotify || ["\u1788\u17D2\u1798\u17C4\u17C7 (Name)", "\u1795\u17D2\u1793\u17C2\u1780 (Department)", "\u1794\u17D2\u179A\u17B6\u1780\u17CB\u1781\u17C2\u1794\u1784\u17D2\u1782\u17C4\u179B (Basic Salary)"];
    const ai = getAIClient();
    const systemInstruction = `
      You are a Google Apps Script Generator. Generate a tailored, functional Google Apps Script function that sends a notification message to a Telegram Channel/Group when a change happens or a new record is added in Google Sheets.
      The code comments and instructions MUST be in Cambodian (Khmer).
    `;
    const prompt = `
      Generate a Google Apps Script to send Telegram notifications.
      Parameters provided:
      - Telegram Bot Token: "${token}"
      - Telegram Chat ID: "${chat}"
      - Selected Sheet columns reference to send: ${JSON.stringify(selectedCols)}
      - Trigger type: "${triggerType || "On row added / submission"}"
      - Additional Khmer message context: "${customMessage || ""}"

      Make sure the code is extremely clean, uses URL Fetch App correctly, and encodes characters properly. Add extensive comments in Khmer inside code blocks to explain step-by-step how to configure the script in Google Sheets.
    `;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3
      }
    });
    res.json({ script: response.text });
  } catch (error) {
    console.error("Script generation error:", error);
    res.status(500).json({ error: error.message || "An error occurred with Gemini API" });
  }
});
async function setupVite() {
  const distPath = import_path.default.join(process.cwd(), "dist");
  const isProd = process.env.NODE_ENV === "production" || import_fs.default.existsSync(import_path.default.join(distPath, "index.html"));
  if (!isProd) {
    console.log("Setting up Express with Vite Dev Middleware...");
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.warn("Failed to load Vite fallback to static serving:", e);
      app.use(import_express.default.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(import_path.default.join(distPath, "index.html"));
      });
    }
  } else {
    console.log("Setting up Express in production mode...");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Khmer Sheet School] Express Server listening on port ${PORT}`);
  });
}
setupVite().catch((err) => {
  console.error("Vite startup crash:", err);
});
