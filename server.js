import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "https://ytshare.vercel.app/"; // baad me change karenge

app.post("/api/shorten", (req, res) => {
  const { youtubeUrl } = req.body;
  if (!youtubeUrl) {
    return res.status(400).json({ error: "YouTube URL required" });
  }

  const encoded = Buffer.from(youtubeUrl).toString("base64");
  const shortLink = `${BASE_URL}?v=${encoded}`;
  res.json({ shortLink });
});

app.get("/", (req, res) => {
  const encoded = req.query.v;
  if (encoded) {
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    return res.redirect(decoded);
  }
  res.send("YouTube Link Shortener is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
