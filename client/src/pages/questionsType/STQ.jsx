import React from "react";
import { useTranslation } from "react-i18next";

function STQ({
  currentIndex,
  currentQuestion,
  handlePrev,
  handleSubmit,
  handleNext,
  Questions,
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
          <textarea
            name={`question_${currentQuestion.QuestionID}`}
            id=""
          ></textarea>
        </div>
      </div>

      <div className="buttons flex justify-between items-center">
        <button
          className="prev-btn font-bold text-white px-4 py-2 bg-[#443577] rounded disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          {t("◀ Previous")}
        </button>

        <button
          className="sub-btn font-bold px-4 py-2 bg-green-500 text-black rounded"
          onClick={handleSubmit}
        >
          {t("Submit")}
        </button>

        <button
          className="next-btn font-bold text-white px-4 py-2 bg-[#443577] rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={currentIndex === Questions.length - 1}
        >
          {t("Next ▶")}
        </button>
      </div>
    </>
  );
}

export default STQ;
