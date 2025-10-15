const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoConnect = require("./src/db/db");
const errorHandler = require("./src/middleWare/errorHandler");
const appSetup = require("./src/index");

dotenv.config();

const app = express();

// Connect MongoDB
mongoConnect();

// Setup middleware and routes
appSetup(app);

// Global error handler
app.use(errorHandler);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
