import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(cors());

const __dirname = path.resolve();
const activities = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'activities.json'), 'utf-8')
);

app.get('/api/suggestion', (req, res) => {
  const mood = req.query.mood || 'any';
  const group = req.query.group || 'any';

  let filtered = [];

  if (mood === 'any') {
    Object.values(activities).forEach(type => {
      if (group === 'any') {
        Object.values(type).forEach(arr => filtered.push(...arr));
      } else {
        filtered.push(...type[group]);
      }
    });
  } else {
    if (!activities[mood]) return res.json({ suggestion: "No mood found 🥲" });

    if (group === 'any') {
      Object.values(activities[mood]).forEach(arr => filtered.push(...arr));
    } else {
      filtered = activities[mood][group];
    }
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)];
  res.json({ suggestion: random || "No activity found 🥲" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});