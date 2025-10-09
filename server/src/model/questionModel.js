const { default: mongoose } = require("mongoose");

const Question = mongoose.Schema({
  QuestionID: {
    type: String,
    required: true,
    unique: true,
  },
  Question: {
    type: String,
    required: true,
  },
  Answers: [
    {
      AnswerID: { type: String, required: true, unique: true },
      Answer: {
        type: String,
        required: true,
      },
    },
  ],
  CorrectAnswerID: {
    type: String,
    required: true,
  },
});

const Que = mongoose.model("questions", Question);

module.exports = Que;
