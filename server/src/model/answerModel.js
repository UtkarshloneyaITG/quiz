const { default: mongoose } = require("mongoose");

const answersschems = mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Results : [{
    TypeTCO: {
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
    },
    TypeMCQ: {
      SubmitAnswers: [
        {
          QuestionID: {
            type: String,
            required: true,
          },
          Answer: {
            type: Array,
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
          Answer: {
            type: Array,
            required: true,
          },
        },
      ],
    },
    TypeSubjective: {
      SubmitAnswers: [
        {
          QuestionID: {
            type: String,
            required: true,
          },
          Question: {
            type: String,
            required: true,
          },
          Answer: {
            type: String,
            required: true,
          },
        },
      ],
    },
    Score: {
      type: Number,
    },
    Submited_on: {
      type: Date,
      default: Date.now,
    },
    esc_count: {
      type: Number,
      required: true,
    },
  },]
});

const Ans = mongoose.model("answer", answersschems);

module.exports = Ans;
