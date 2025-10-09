// @desc Get All Questions
// @Route get /allquestions
//@access public

const Que = require("../model/questionModel");

const getAllQuestions = async (req, res, next) => {
  try {
    const Questions = await Que.find({}, { CorrectAnswerID: 0 });
    res.status(200).json(Questions);
    console.log(Questions);
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
module.exports = { getAllQuestions, getQuestionByID };
