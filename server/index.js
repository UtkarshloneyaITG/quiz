import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

// Serve static frontend (after build)
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Node backend!" });
});

// React router fallback
app.use('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
