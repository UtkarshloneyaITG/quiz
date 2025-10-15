const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user.controller");

userRouter.post("/deleteHistory", userController.deteleUserHistory);
userRouter.post("/deleteSingleHistory", userController.deteleSingleHistory);

module.exports = userRouter;
