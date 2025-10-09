const express = require("express");
const {
  getAllQuestions,
  getQuestionByID,
} = require("../controller/question.Controller");
const submitAnswers = require("../controller/answer.controller");
const routes = express.Router();

// Get all Questions 
routes.route("/all").get(getAllQuestions);

//Get Question by id
routes.route("/id/:id").get(getQuestionByID);

//POST Answers
routes.route("/submit_answer").post(submitAnswers);

//Default URL Error
routes.route("/").get((req, res, next) => {
  res.status(200).json({ message: "please enter correct url" });
});

module.exports = routes;
