const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/authRouter");
const questionRouter = require("./routes/questionRouter");

const app = express();

function appSetup(app) {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/auth/user", authRouter);
  app.use("/question", questionRouter);
}

// Just export, no need to call routes above again
exports.app = app;
exports.appSetup = appSetup;
