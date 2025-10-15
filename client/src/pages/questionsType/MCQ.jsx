import React from "react";
import { useTranslation } from "react-i18next";

function MCQ({
  currentIndex,
  currentQuestion,
  handlePrev,
  handleSubmit,
  handleNext,
  selectedAnswers,
  Questions,
  AnswerSelect,
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="question-box mb-4">
        <h3 className="text-2xl font-semibold text-white">
          {t("Question")} {currentIndex + 1}: {currentQuestion.Question}{" "}
        </h3>
      </div>

      <div className="options mb-6">
        <div className="flex flex-col gap-2">
          {currentQuestion.Answers.map((answer, i) => (
            <label
              key={answer.AnswerID}
              className="options-div text-[18px] font-medium text-white bg-[#4b3f7f] p-2 rounded flex items-center cursor-pointer"
            >
              <input
                type="radio"
                name={`question_${currentQuestion.QuestionID}`}
                value={answer.AnswerID}
                checked={
                  selectedAnswers[currentQuestion.QuestionID] ===
                  answer.AnswerID
                }
                onChange={() =>
                  AnswerSelect(currentQuestion.QuestionID, answer.AnswerID)
                }
                className="mr-2"
              />
              {i + 1}. {answer.Answer}
            </label>
          ))}
        </div>
      </div>

      <div className="buttons flex justify-between items-center">
        <button
          className="prev-btn font-bold text-white px-4 py-2 bg-[#443577] rounded disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          {t("◀ Previous")} {/* ✅ t() जोड़ा गया */}
        </button>

        <button
          className="sub-btn font-bold px-4 py-2 bg-green-500 text-black rounded"
          onClick={handleSubmit}
        >
          {t("Submit")} {/* ✅ t() जोड़ा गया */}
        </button>

        <button
          className="next-btn font-bold text-white px-4 py-2 bg-[#443577] rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={currentIndex === Questions.length - 1}
        >
          {t("Next ▶")} {/* ✅ t() जोड़ा गया */}
        </button>
      </div>
    </>
  );
}

export default MCQ;
