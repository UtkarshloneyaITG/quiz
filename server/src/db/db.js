const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DATABASE_URL;

const mongoConnect = () => {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("mongoose connect");
    })
    .catch((e) => {
      console.log((e) => {
        console.log("mongoose connect error", e);
      });
    });
};

module.exports = mongoConnect;
