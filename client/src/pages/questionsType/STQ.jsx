import React from "react";

function STQ({ currentQuestion, handleSubjectiveChange }) {
  return (
    <div className="options mb-6">
      <textarea
        className="resize-none outline-none rounded p-2 h-[250px] w-full"
        placeholder="Type your answer here..."
        onChange={(e) =>
          handleSubjectiveChange(
            currentQuestion.QuestionID,
            currentQuestion.Question,
            e.target.value
          )
        }
      ></textarea>
    </div>
  );
}

export default STQ;
