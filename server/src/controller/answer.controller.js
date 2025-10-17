//@desc Post answers & and calcluate score correct answers
// route post /submit_answer
// access private
const Ans = require("../model/answerModel");
const Que = require("../model/questionModel");

// this function filter the answers and assign score to email
async function setcorrect_answer(s_ans) {
  let score = 0;

  let TypeTCO = s_ans.TypeTCO || { SubmitAnswers: [] };
  let TypeMCQ = s_ans.TypeMCQ || { SubmitAnswers: [] };
  let TypeSubjective = s_ans.TypeSubjective || { SubmitAnswers: [] };

  const questions = await Que.find({}).lean();
  const MCQ_que = questions.filter((q) => q.QuestionType === "mcq");
  const TCO_que = questions.filter((q) => q.QuestionType === "tco");


  const answersTCO = TypeTCO.SubmitAnswers.filter((submitted) => {
    const question = TCO_que.find((q) => q.QuestionID === submitted.QuestionID);
    if (!question) return false;

    const correctIDs = Array.isArray(question.CorrectAnswerID)
      ? question.CorrectAnswerID
      : [question.CorrectAnswerID].filter(Boolean);

    const isCorrect = correctIDs.includes(submitted.AnswerID);
    if (isCorrect) score += 1;
    return isCorrect;
  });


  const answersMCQ = TypeMCQ.SubmitAnswers.map((userQ) => {
    const question = MCQ_que.find((q) => q.QuestionID === userQ.QuestionID);
    if (!question) return null;

    const correctIDs = Array.isArray(question.CorrectAnswerID)
      ? question.CorrectAnswerID
      : [question.CorrectAnswerID].filter(Boolean);

    const userAnswers = Array.isArray(userQ.Answer)
      ? userQ.Answer
      : [userQ.Answer].filter(Boolean);
    const userCorrectAnswer = [];

    let localScore = 0;
    userAnswers.forEach((ans) => {
      if (correctIDs.includes(ans)) {
        userCorrectAnswer.push(ans);
        localScore += 0.5; 
      } else {
        localScore -= 0.5;
      }
    });

    score += localScore;

    return {
      QuestionID: userQ.QuestionID,
      userAnswers,
      correctAnswers: correctIDs,
      CorrectAnswerText: (question.Answers || [])
        .filter((a) => correctIDs.includes(a.AnswerID))
        .map((a) => a.Answer),
      userCorrectAnswer,
      questionScore: localScore,
    };
  }).filter(Boolean);

  const simpleOBJ = answersMCQ.map((ele) => ({
    QuestionID: ele.QuestionID,
    Answer: ele.userCorrectAnswer,
  }));


  score = Math.max(0, score);

  return {
    Email: s_ans.Email,
    Results: [
      {
        TypeTCO: {
          SubmitAnswers: TypeTCO.SubmitAnswers,
          CorrectAnswers: answersTCO,
        },
        TypeMCQ: {
          SubmitAnswers: TypeMCQ.SubmitAnswers,
          CorrectAnswers: simpleOBJ,
        },
        TypeSubjective: {
          SubmitAnswers: TypeSubjective.SubmitAnswers,
        },
        Score: score,
        esc_count: s_ans.esc_count || 0,
      },
    ],
  };
}

const submitAnswers = async (req, res, next) => {
  try {
    const answerData = await setcorrect_answer(req.body);
    let alreadyExist = await Ans.findOne({ Email: answerData.Email });
    if (alreadyExist) {
      await Ans.updateOne(
        { Email: answerData.Email },
        { $push: { Results: answerData.Results[0] } }
      );
      return res.status(200).json({
        message: "your answer submited successfully",
        Submits:
          req.body.TypeMCQ.SubmitAnswers.length +
          req.body.TypeTCO.SubmitAnswers.length,
      });
    }
    const ans_ = new Ans(answerData);

    const s_ans = await ans_.save();
    res.status(200).json({
      message: "your answer submited successfully",
      Submits:
        req.body.TypeMCQ.SubmitAnswers.length +
        req.body.TypeTCO.SubmitAnswers.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = submitAnswers;
