const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const authRouter = require("./routes/authRouter");
const questionRouter = require("./routes/questionRouter");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/user", authRouter);
app.use("/question", questionRouter);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
module.exports = app;
