const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

const app = require("./src/index");
const mongoConnect = require("./src/db/db");
const errorHandler = require("./src/middleWare/errorHandler");

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoConnect();

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
