//@desc Post answers & and calcluate score correct answers
// route post /submit_answer
// access private
const Ans = require("../model/answerModel");
const UserModel = require("../model/authModel");
const Que = require("../model/questionModel");

// this function filter the answers and assign score to email
async function setcorrect_answer(s_ans) {
  let score = 0;
  let TypeTCO = s_ans.TypeTCO;
  let TypeMCQ = s_ans.TypeMCQ;
  const array_of_questions = questions;
  const MCQ_que = array_of_questions.filter(
    (value) => value.QuestionType == "mcq"
  );
  const TOC_que = array_of_questions.filter(
    (value) => value.QuestionType == "tcq"
  );
  let answersTCO = TypeTCO.SubmitAnswers.filter((first_arr) =>
    TOC_que.some(
      (sec_arr) =>
        first_arr.QuestionID == sec_arr.QuestionID &&
        first_arr.AnswerID == sec_arr.CorrectAnswerID
    )
  );
  const answersMCQ = TypeMCQ.SubmitAnswers.map((userQ) => {
    const question = MCQ_que.find((q) => q.QuestionID === userQ.QuestionID);
    if (!question) return null;
    const correctAnswers = question.CorrectAnswerID;
    const userAnswers = userQ.Answer;
    let localScore = 0;
    userAnswers.forEach((ans) => {
      if (correctAnswers.includes(ans)) localScore += 0.5;
      else localScore -= 0.5;
    });

    score += localScore;

    return {
      QuestionID: userQ.QuestionID,
      userAnswers,
      correctAnswers,
      questionScore: localScore,
    };
  }).filter(Boolean);

const simpleOBJ = answersMCQ.map((ele)=>{
    return {
        QuestionID : ele.QuestionID,
        AnswerID : ele.correctAnswers
    }
})

  score = score < 0 ? 0 + answersTCO.length : score + answersTCO.length;

  if (score < 0) score = 0;
  const saveScore = await UserModel.updateOne(
    { email: s_ans.Email },
    {
      $push: {
        scoreHistory: {
          questionAttempt: {
            correctAnswers: answersTCO.length + simpleOBJ.length,
            attempt: s_ans.SubmitAnswers.length,
          },
          score: score,
          esc_count: s_ans.esc_count,
        },
      },
    }
  );
  return {
    Email: s_ans.Email,
    TypeTCO: {
      SubmitAnswers: TypeTCO.SubmitAnswers,
      CorrectAnswer: answersTCO,
    },
    TypeMCQ: {
      SubmitAnswers: TypeMCQ.SubmitAnswers,
      CorrectAnswer: simpleOBJ,
    },
    Score: score,
    esc_count : s_ans.esc_count,
  };
}
const submitAnswers = async (req, res, next) => {
  try {
    const answerData = await setcorrect_answer(req.body);
    const ans_ = new Ans(answerData);
    const s_ans = await ans_.save();
    res.status(200).json({
      message: "your answer submited successfully",
      Submits: req.body.SubmitAnswers.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = submitAnswers;
