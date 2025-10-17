const Ans = require("../model/answerModel");
const Que = require("../model/questionModel");

async function setcorrect_answer(s_ans) {
  let score = 0;

  const TypeTCO = s_ans.TypeTCO || { SubmitAnswers: [] };
  const TypeMCQ = s_ans.TypeMCQ || { SubmitAnswers: [] };
  const TypeSubjective = s_ans.TypeSubjective || { SubmitAnswers: [] };

  const questions = await Que.find({}).lean();

  const MCQ_que = questions.filter((q) => q.QuestionType === "mcq");
  const TCO_que = questions.filter((q) => q.QuestionType === "tco");

  // ======================= 🟩 TCO Section =======================
  const answersTCO = TypeTCO.SubmitAnswers.map((submitted) => {
    const question = TCO_que.find((q) => q.QuestionID === submitted.QuestionID);
    if (!question) return null;

    const correctIDs = Array.isArray(question.CorrectAnswerID)
      ? question.CorrectAnswerID
      : [question.CorrectAnswerID].filter(Boolean);

    const isCorrect = correctIDs.includes(submitted.AnswerID);
    if (isCorrect) score += 1;

    return {
      QuestionID: submitted.QuestionID,
      AnswerID: correctIDs[0], // match schema
    };
  }).filter(Boolean);

  // ======================= 🟨 MCQ Section =======================
  const answersMCQ = TypeMCQ.SubmitAnswers.map((userQ) => {
    const question = MCQ_que.find((q) => q.QuestionID === userQ.QuestionID);
    if (!question) return null;

    const correctIDs = Array.isArray(question.CorrectAnswerID)
      ? question.CorrectAnswerID
      : [question.CorrectAnswerID].filter(Boolean);

    const userAnswers = Array.isArray(userQ.Answer)
      ? userQ.Answer.filter(Boolean)
      : [userQ.Answer].filter(Boolean);

    const userCorrectAnswers = userAnswers.filter((ans) =>
      correctIDs.includes(ans)
    );
    const userWrongAnswers = userAnswers.filter(
      (ans) => !correctIDs.includes(ans)
    );

    // ✅ Update score: +0.5 per correct, -0.5 per wrong
    score += userCorrectAnswers.length * 0.5;
    score -= userWrongAnswers.length * 0.5;

    const status =
      userCorrectAnswers.length === correctIDs.length &&
      userAnswers.length === correctIDs.length
        ? "Correct"
        : userCorrectAnswers.length > 0
        ? "Partially Correct"
        : "Wrong";

    return {
      QuestionID: userQ.QuestionID,
      Answer: userAnswers,
      CorrectAnswer: correctIDs,
      Status: status,
    };
  }).filter(Boolean);

  // ======================= 🟦 SUBJECTIVE Section =======================
  const answersSubjective = TypeSubjective.SubmitAnswers.map((sub) => ({
    QuestionID: sub.QuestionID,
    Question: sub.Question,
    Answer: sub.Answer,
  }));

  // ======================= 🟪 Final Data =======================
  score = Math.max(0, score); // no negative score

  return {
    Email: s_ans.Email,
    Results: [
      {
        TypeTCO: {
          SubmitAnswers: TypeTCO.SubmitAnswers.map((a) => ({
            QuestionID: a.QuestionID,
            AnswerID: a.AnswerID,
          })),
          CorrectAnswers: answersTCO,
        },
        TypeMCQ: {
          SubmitAnswers: TypeMCQ.SubmitAnswers.map((a) => ({
            QuestionID: a.QuestionID,
            Answer: Array.isArray(a.Answer) ? a.Answer : [a.Answer],
          })),
          CorrectAnswers: answersMCQ,
        },
        TypeSubjective: {
          SubmitAnswers: answersSubjective,
        },
        Score: score,
        esc_count: s_ans.esc_count || 0,
      },
    ],
  };
}

// ======================= 🧩 Submit API =======================
const submitAnswers = async (req, res, next) => {
  try {
    const answerData = await setcorrect_answer(req.body);
    const existing = await Ans.findOne({ Email: answerData.Email });

    if (existing) {
      await Ans.updateOne(
        { Email: answerData.Email },
        { $push: { Results: answerData.Results[0] } }
      );
    } else {
      const newAns = new Ans(answerData);
      await newAns.save();
    }

    const totalSubmits =
      (req.body.TypeMCQ?.SubmitAnswers?.length || 0) +
      (req.body.TypeTCO?.SubmitAnswers?.length || 0);

    res.status(200).json({
      message: "Your answers were submitted successfully!",
      Submits: totalSubmits,
    });
  } catch (error) {
    console.error("❌ Error in submitAnswers:", error);
    next(error);
  }
};

module.exports = submitAnswers;
