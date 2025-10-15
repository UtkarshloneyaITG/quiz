const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user.controller");

userRouter.post("/deleteHistory", userController.deteleUserHistory);

module.exports = userRouter;