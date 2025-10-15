
import express from "express";
import { config } from "dotenv";
import path from "path";
import { use, listen } from "./src/index";
import mongoConnect from "./src/db/db";
import errorHandler from "./src/middleWare/errorHandler";

config();

const PORT = process.env.PORT || 5000;

mongoConnect();


use(errorHandler);

listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
