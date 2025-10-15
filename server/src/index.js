const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config(); // load env variables first

const authRouter = require("./routes/authRouter");
const questionRouter = require("./routes/questionRouter");


const app = express();



// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth/user", authRouter);
app.use("/question", questionRouter);


module.exports = app;
