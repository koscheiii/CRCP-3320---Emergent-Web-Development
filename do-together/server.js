import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

// --- CORS MUST COME BEFORE ANY ROUTES ---
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://koscheiii.github.io"
    ]
  })
);

// Allow JSON bodies
app.use(express.json());

// Load activities.json
let activities = [];
try {
  const data = fs.readFileSync("./activities.json", "utf8");
  activities = JSON.parse(data);
} catch (err) {
  console.error("Error reading activities.json:", err);
}

// API route
app.get("/api/suggestion", (req, res) => {
  const { mood, group } = req.query;

  let filtered = activities;

  if (mood && mood !== "any") {
    filtered = filtered.filter(a => a.mood === mood);
  }

  if (group && group !== "any") {
    filtered = filtered.filter(a => a.group === group);
  }

  if (filtered.length === 0) {
    return res.json({ suggestion: "No activities match your filters :(" });
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)];
  res.json(random);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});