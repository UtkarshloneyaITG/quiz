const { default: mongoose } = require("mongoose");

const Question = mongoose.Schema({
  QuestionID: {
    type: String,
    unique: true,
  },
  Question: {
    type: String,
    required: true,
    unique: true,
  },
  Answers: [
    {
      AnswerID: { type: String, unique: true },
      Answer: {
        type: String,
        Array,
      },
    },
  ],
  CorrectAnswerID: {
    type: String,
  },

  QuestionType: {
    type: String,
    required: true,
    default: "mcq",
  },
});

const Que = mongoose.model("questions", Question);

module.exports = Que;
