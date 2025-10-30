const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const BASE_URL = "https://yourapp.onrender.com"; // Apne deployed URL se badlo

// Temporary store (for demo)
const shortLinks = {};

app.post("/shorten", (req, res) => {
  const { youtubeUrl } = req.body;
  if (!youtubeUrl || !youtubeUrl.includes("youtube")) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }
  const shortId = Math.random().toString(36).substring(2, 8);
  shortLinks[shortId] = youtubeUrl;
  const shortLink = `${BASE_URL}/${shortId}`;
  res.json({ shortLink });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const originalUrl = shortLinks[id];
  if (originalUrl) {
    return res.redirect(originalUrl);
  }
  res.status(404).send("Link not found!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
