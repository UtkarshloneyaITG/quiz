import React from "react";

function MOQ({ currentQuestion, selectedAnswers, AnswerSelect }) {
  return (
    <>
      <div className="options mb-6">
        <div className="flex flex-col gap-2">
          {currentQuestion.Answers.map((answer, i) => (
            <label
              key={answer.AnswerID}
              className="options-div text-[18px] font-medium text-white bg-[#4b3f7f] p-2 rounded flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name={`question_${currentQuestion.QuestionID}`}
                value={answer.AnswerID}
                // checked={
                //   selectedAnswers[currentQuestion.QuestionID] ===
                //   answer.AnswerID
                // }
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
    </>
  );
}

export default MOQ;
