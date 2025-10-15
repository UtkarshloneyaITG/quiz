// @desc Get All Questions
// @Route get /allquestions
//@access public

const { default: mongoose } = require("mongoose");
const Que = require("../model/questionModel");
//const Attempt = require("../models/Attempt");

const getAllQuestions = async (req, res, next) => {
  try {
    const Questions = await Que.find({}, { CorrectAnswerID: 0 });
    res.status(200).json(Questions);
  } catch (error) {
    next(error);
  }
};

//@desc get all question by id
//route /id/<Q001> method get
const getQuestionByID = async (req, res, next) => {
  try {
    const Q_id = req.params.id;

    if (!Q_id) {
      return res.status(400).json({
        message: "Invalid Question ID",
      });
    }
    const ans_id = await Que.findOne(
      { QuestionID: Q_id },
      { CorrectAnswerID: 0 }
    );
    if (!ans_id) {
      return res.status(404).json({
        message: "Question Not Found",
      });
    }
    return res.status(200).json(ans_id);
  } catch (error) {
    next(error);
  }
};

// @desc post question
//@route POST /post/new-question
//@req Body
// {
// Question : "Whate is example ?",
// Answers : [
//   {Answer : "example 1"},
//   {Answer : "example 2"},
//   {Answer : "example 3"},
//   {Answer : "example 4"}
// ],
// CorrectAnswerID : "0-3"
// }
async function postQuestionProcess(que) {
  let questionsLength = await Que.countDocuments();

  while (true) {
    let check = "Q" + String(questionsLength + 1).padStart(3, "0");
    let questionID_unique = await Que.findOne({
      QuestionID: check,
    });
    if (!questionID_unique) break;
    questionsLength += 1;
  }
  const questionID = "Q" + String(questionsLength + 1).padStart(3, "0");

  const A_ID = que.Answers.map(
    (value, index) =>
      "A" + String((questionsLength + 1) * 4 - index).padStart(3, "0")
  );
  A_ID.reverse();
  let C_A_ID = A_ID[+que.CorrectAnswerID];
  let FinalQuestionOBJ = {
    QuestionID: questionID,
    Question: que.Question,
    Answers: A_ID.map((value, index) => ({
      AnswerID: value,
      Answer: que.Answers[index].Answer,
    })),
    CorrectAnswerID: C_A_ID,
  };
  return FinalQuestionOBJ;
}

const postQuestion = async (req, res, next) => {
  try {
    const Check_for_Dupli = await Que.findOne({ Question: req.body.Question });
    if (
      !req.body ||
      !req.body.Question ||
      !req.body.Answers ||
      req.body.Answers.length <= 3
    ) {
      return res.status(400).json({
        message:
          "dosn't understant the req body or the body have some missing filld's",
      });
    } else if (Check_for_Dupli) {
      return res.status(409).json({ message: "Question already exists" });
    } else if (
      !(req.body.CorrectAnswerID <= 3 && req.body.CorrectAnswerID >= 0)
    ) {
      return res
        .status(202)
        .json({ message: "enter valid answer id 0=> & <=3" });
    }
    const newQuestion = await postQuestionProcess(req.body);
    const setQuestion = await Que(newQuestion);
    const response = await setQuestion.save();
    res.status(201).json({ message: "Question set successfully", setQuestion });
  } catch (error) {
    next(error);
  }
};
// const editQuestion = async(req, res, next) => {
//     try {

const deleteQuestion = async (req, res, next) => {
  try {
    if (!req.body.QuestionID) {
      return res.status(400).json({ message: "Provide a QuestionID" });
    }
    const Del_Q = await Que.findOneAndDelete({
      QuestionID: req.body.QuestionID,
    });
    if (!Del_Q) {
      return res.status(404).json({ message: "question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// const questionAttempt = async (req, res, next) => {
//     const { userId , QuestionID } = req.body;

//     try {
//         const attempts = await Attempt.find({ userId }).lean();

//         const questionIds = attempts.map(a => a.questionId);
//         const Quest = await Que.find({
//             QuestID: QuestionID
//         }).lean();

//         const questionMap = {};

//         Quest.forEach(q => {
//             questionMap[q._id.toString()] = q;
//         });

//         // const mcq_single = [];
//         // const mcq_multiple = [];
//         // const subjective = [];

//         for (const attempt of attempts) {
//             const q = questionMap[attempt.questionId];

//             if (!q) continue;

//             let isCorrect = null;

//             if (q.type === 'mcq_single') {
//                 isCorrect = attempt.answer === q.correctAnswer;
//                 result.mcq_single.push({ ...attempt, isCorrect });
//             }

//             else if (q.type === 'mcq_multiple') {

//                 const a1 = Array.isArray(attempt.answer) ? attempt.answer.sort() : [];
//                 const a2 = Array.isArray(q.correctAnswer) ? q.correctAnswer.sort() : [];
//                 isCorrect = JSON.stringify(a1) === JSON.stringify(a2);
//                 result.mcq_multiple.push({ ...attempt, isCorrect });
//             }

//             else if (q.type === 'subjective') {

//                 isCorrect = null;
//                 result.subjective.push({ ...attempt, isCorrect });
//             }
//         }

//         res.status(200).json({
//             msg: "Answer submitted successfully !"
//         });

//     } catch (err) {
//         next(err)
//     }
// }

module.exports = {
  getAllQuestions,
  getQuestionByID,
  postQuestion,
  deleteQuestion,
  // questionAttempt
};
