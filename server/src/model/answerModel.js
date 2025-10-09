
const { default: mongoose } = require("mongoose");

const answersschems = mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  SubmitAnswers: [
    {
      QuestionID: {
        type: String,
        required: true,
      },
      AnswerID: {
        type: String,
        required: true,
      },
    },
  ],
  CorrectAnswers: [
    {
      QuestionID: {
        type: String,
        required: true,
      },
      AnswerID: {
        type: String,
        required: true,
      },
    },
  ],
  Score: {
    type: Number,
  },
  Submited_on: {
    type: Date,
    default: Date.now,
  },
});

const Ans = mongoose.model("answer", answersschems);

module.exports = Ans;
