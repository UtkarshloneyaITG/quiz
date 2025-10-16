import React from "react";

function STQ({ currentQuestion }) {
  return (
    <>
      <div className="options mb-6">
        <div className="flex bg-zinc-500 text-green-400 font-semibold flex-col gap-2 rounded">
          <textarea
            name={`question_${currentQuestion.QuestionID}`}
            id=""
            className="resize-none outline-none rounded p-2 h-[300px]"
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default STQ;
