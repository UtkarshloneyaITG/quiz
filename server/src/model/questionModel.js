const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  AnswerID: { type: String, required: false },
  Answer: { type: String, required: false },
});

const questionSchema = new mongoose.Schema({
  QuestionID: {
    type: String,
    unique: true,
  },
  Question: {
    type: String,
    required: true,
    unique: true,
  },
  Answers: {
    type: [answerSchema],
    required: false, 
  CorrectAnswerID: {
    type: String,
    required: false, 
  },
  QuestionType: {
    type: String,
    required: true,
    default: "mcq",
  },
}
});

const Que = mongoose.model("questions", questionSchema);
module.exports = Que;
