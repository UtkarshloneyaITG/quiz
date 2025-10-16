import React from "react";

function MOQ({ currentQuestion, mcqAnswers, setmcqSelectedAnswers }) {
  return (
    <div className="options mb-6">
      <div className="flex flex-col gap-2">
        {currentQuestion.Answers.map((answer, i) => {
          const selected =
            mcqAnswers[currentQuestion.QuestionID]?.includes(answer.AnswerID) ||
            false;
          return (
            <label
              key={answer.AnswerID}
              className="text-white bg-[#4b3f7f] p-2 rounded flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() =>
                  setmcqSelectedAnswers(
                    currentQuestion.QuestionID,
                    answer.AnswerID
                  )
                }
                className="mr-2"
              />
              {i + 1}. {answer.Answer}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default MOQ;
