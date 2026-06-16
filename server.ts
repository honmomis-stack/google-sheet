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
