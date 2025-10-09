const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const questionRouter = require("./routes/questionRouter");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(cors());
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
 
app.use("/api/auth/user", authRouter);
app.use("/question" , questionRouter);
app.use(express.json());

module.exports = app;