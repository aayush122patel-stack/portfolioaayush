import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fetch from "node-fetch";

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

      // Google Apps Script redirects on success, node-fetch handles it by default
      // but we just need to know if it went through.
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
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
