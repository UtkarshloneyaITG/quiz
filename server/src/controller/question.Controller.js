// @desc Get All Questions
// @Route GET /allquestions
// @access Public

const { default: mongoose } = require("mongoose");
const Que = require("../model/questionModel");
const Ans = require("../model/answerModel");

// ===== GET ALL QUESTIONS =====
const getAllQuestions = async (req, res, next) => {
  try {
    const Questions = await Que.find({}, { CorrectAnswerID: 0 });
    res.status(200).json(Questions);
  } catch (error) {
    next(error);
  }
};

// ===== GET QUESTION BY ID =====
const getQuestionByID = async (req, res, next) => {
  try {
    const Q_id = req.params.id;
    if (!Q_id) return res.status(400).json({ message: "Invalid Question ID" });

    const question = await Que.findOne(
      { QuestionID: Q_id },
      { CorrectAnswerID: 0 }
    );
    if (!question)
      return res.status(404).json({ message: "Question Not Found" });

    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
};

// ===== POST QUESTION PROCESS =====
async function postQuestionProcess(que) {
  let questionsLength = await Que.countDocuments();
  while (true) {
    let check = "Q" + String(questionsLength + 1).padStart(3, "0");
    let questionID_unique = await Que.findOne({ QuestionID: check });
    if (!questionID_unique) break;
    questionsLength++;
  }

  const questionID = "Q" + String(questionsLength + 1).padStart(3, "0");
  const A_ID = que.Answers.map(
    (value, index) =>
      "A" + String((questionsLength + 1) * 4 - index).padStart(3, "0")
  ).reverse();

  let C_A_ID = A_ID[+que.CorrectAnswerID];

  return {
    QuestionID: questionID,
    Question: que.Question,
    Answers: A_ID.map((value, index) => ({
      AnswerID: value,
      Answer: que.Answers[index].Answer,
    })),
    CorrectAnswerID: C_A_ID,
  };
}

// ===== POST QUESTION =====
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
        message: "Request body missing required fields",
      });
    } else if (Check_for_Dupli) {
      return res.status(409).json({ message: "Question already exists" });
    } else if (
      !(req.body.CorrectAnswerID <= 3 && req.body.CorrectAnswerID >= 0)
    ) {
      return res
        .status(202)
        .json({ message: "Enter valid CorrectAnswerID 0-3" });
    }

    const newQuestion = await postQuestionProcess(req.body);
    const setQuestion = await Que(newQuestion);
    await setQuestion.save();

    res.status(201).json({ message: "Question set successfully", setQuestion });
  } catch (error) {
    next(error);
  }
};

// ===== DELETE QUESTION =====
const deleteQuestion = async (req, res, next) => {
  try {
    if (!req.body.QuestionID)
      return res.status(400).json({ message: "Provide a QuestionID" });

    const Del_Q = await Que.findOneAndDelete({
      QuestionID: req.body.QuestionID,
    });
    if (!Del_Q) return res.status(404).json({ message: "Question not found" });

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ===== ADD SUBJECTIVE QUESTION =====
const subQuestion = async (req, res, next) => {
  try {
    let questionsLength = await Que.countDocuments();
    let questionID;

    while (true) {
      let check = "Q" + String(questionsLength + 1).padStart(3, "0");
      const exists = await Que.findOne({ QuestionID: check });
      if (!exists) {
        questionID = check;
        break;
      }
      questionsLength++;
    }

    const { Question } = req.body;
    const duplicateQuest = await Que.findOne({ Question });
    if (duplicateQuest)
      return res.status(409).json({ message: "Question already exists!" });

    const newQuestion = new Que({
      Question,
      QuestionID: questionID,
      QuestionType: "subjective",
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json({
      message: "Question added successfully",
      question: savedQuestion,
    });
  } catch (error) {
    next(error);
  }
};

async function getuserhistory_(Email) {
  const allQuestions = await Que.find({}).lean();
  const userSubmitedAnswer = await Ans.findOne({ Email });
  if (!userSubmitedAnswer) return [];

  const result = userSubmitedAnswer.Results || [];
  const arrayOfHistory = [];

  for (const element of result) {
    // ===== TCO =====
    const TypeTCO = element.TypeTCO || { SubmitAnswers: [] };
    const correctTCO = TypeTCO.SubmitAnswers.map((sub) => {
      const question = allQuestions.find(
        (q) => q.QuestionID === sub.QuestionID
      );
      if (!question) return null;

      const correctIDs = Array.isArray(question.CorrectAnswerID)
        ? question.CorrectAnswerID
        : [question.CorrectAnswerID].filter(Boolean);

      const correctText = (question.Answers || [])
        .filter((a) => correctIDs.includes(a.AnswerID))
        .map((a) => a.Answer);

      const isCorrect = correctIDs.includes(sub.AnswerID);

      return {
        ...question,
        QuestionType: "tco",
        UserAnswer: sub.AnswerID,
        UserAnswerText: (question.Answers || [])
          .filter((a) => a.AnswerID === sub.AnswerID)
          .map((a) => a.Answer),
        CorrectAnswerID: correctIDs,
        CorrectAnswerText: correctText,
        Status: isCorrect ? "Correct" : "Wrong",
      };
    }).filter(Boolean);

    // ===== MCQ =====
    const TypeMCQ = element.TypeMCQ || { SubmitAnswers: [] };
    const mcqResults = TypeMCQ.SubmitAnswers.map((sub) => {
      const question = allQuestions.find(
        (q) => q.QuestionID === sub.QuestionID
      );
      if (!question) return null;

      const correctIDs = Array.isArray(question.CorrectAnswerID)
        ? question.CorrectAnswerID
        : [question.CorrectAnswerID].filter(Boolean);

      const userAnswers = Array.isArray(sub.Answer)
        ? sub.Answer
        : sub.Answer
        ? [sub.Answer]
        : [];

      const CorrectAnswerText = (question.Answers || [])
        .filter((a) => correctIDs.includes(a.AnswerID))
        .map((a) => a.Answer);

      const UserAnswerText = (question.Answers || [])
        .filter((a) => userAnswers.includes(a.AnswerID))
        .map((a) => a.Answer);

      let status;
      if (userAnswers.length === 0) {
        status = "Unanswered";
      } else if (
        correctIDs.length > 0 &&
        correctIDs.every((id) => userAnswers.includes(id)) &&
        userAnswers.length === correctIDs.length
      ) {
        status = "Correct";
      } else if (userAnswers.some((id) => correctIDs.includes(id))) {
        status = "Partially Correct";
      } else {
        status = "Wrong";
      }

      return {
        ...question,
        QuestionType: "mcq",
        UserAnswer: userAnswers,
        UserAnswerText,
        CorrectAnswerID: correctIDs,
        CorrectAnswerText,
        Status: status,
      };
    }).filter(Boolean);

    // ===== SUBJECTIVE =====
    const TypeSubjective = element.TypeSubjective || { SubmitAnswers: [] };
    const subjective = TypeSubjective.SubmitAnswers.map((sub) => {
      const question = allQuestions.find(
        (q) => q.QuestionID === sub.QuestionID
      );
      return {
        ...question,
        QuestionType: "subjective",
        UserAnswer: sub.Answer,
        Status: sub.Answer ? "Submitted" : "Unanswered",
      };
    });

    // ===== PUSH INTO HISTORY =====
    arrayOfHistory.push({
      SubmitedOn: element.Submited_on,
      Score: element.Score,
      esc_count: element.esc_count,
      CorrectAnswers: correctTCO.concat(
        mcqResults.filter((q) => q.Status === "Correct")
      ),
      WrongAnswers: mcqResults.filter(
        (q) => q.Status === "Wrong" || q.Status === "Partially Correct"
      ),
      SubjectiveAnswers: subjective,
    });
  }

  return arrayOfHistory;
}
// ===== GET USER HISTORY BY EMAIL =====
const getuserhistoryByEmail = async (req, res, next) => {
  try {
    const { Email } = req.body;
    if (!Email) return res.status(400).json({ message: "Email is required" });

    const finalHistory = await getuserhistory_(Email);
    res.json({ finalHistory });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllQuestions,
  getQuestionByID,
  postQuestion,
  deleteQuestion,
  subQuestion,
  getuserhistoryByEmail,
};
