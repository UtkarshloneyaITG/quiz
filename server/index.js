const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// Serve frontend build (for production)
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Node backend!" });
});

// // Fallback for React Router
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
