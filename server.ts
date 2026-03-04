import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Proxy route for Google Sheets to avoid CORS
  app.post("/api/contact", async (req, res) => {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwn2-jQ5YtuorzGtc7t3DxHRw_HKmQcpC6m9khzkW7sk8eu_4lQ3mE1y6Je6Bn5Gbdhdg/exec";
    
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      if (response.ok || response.status === 302) {
        return res.json({ success: true });
      } else {
        const errorText = await response.text();
        console.error("Google Script Error:", errorText);
        return res.status(response.status).json({ success: false, error: "Failed to submit to Google Sheets" });
      }
    } catch (error) {
      console.error("Proxy Error:", error);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Fallback to index.html for SPA
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
