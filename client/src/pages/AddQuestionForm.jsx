import React, { useState } from "react";
import AddMCQ from "./questionsType/AddMCQ";
import AddMOQ from "./questionsType/AddMOQ";
import AddSTQ from "./questionsType/AddSTQ";

export function AddQuestionForm({
  question,
  setQuestion,
  options,
  setOptions,
  correctOption,
  setCorrectOption,
  handleOptionChange,
  example,
}) {
  const [questionType, setQuestionType] = useState("mcq");

  return (
    <div>
      <div className="flex items-center  justify-between m-2">
        <h3 className="text-xl text-center font-semibold mb-2">
          Add Questions
        </h3>

        <select
          onChange={(e) => setQuestionType(e.target.value)}
          className="text-white outline-none font-bold p-1 rounded bg-[#4f39f6] w-[200px]"
        >
          <option value="mcq">MCQ</option>
          <option value="moq">MOQ</option>
          <option value="stq">STQ</option>
        </select>
      </div>

      {questionType == "mcq" ? (
        <AddMCQ
          question={question}
          setQuestion={setQuestion}
          options={options}
          setOptions={setOptions}
          correctOption={correctOption}
          setCorrectOption={setCorrectOption}
          handleOptionChange={handleOptionChange}
          example={example}
        />
      ) : questionType == "moq" ? (
        <AddMOQ
          question={question}
          setQuestion={setQuestion}
          options={options}
          setOptions={setOptions}
          correctOption={correctOption}
          setCorrectOption={setCorrectOption}
          handleOptionChange={handleOptionChange}
          example={example}
        />
      ) : (
        <AddSTQ question={question} setQuestion={setQuestion} />
      )}
    </div>
  );
}
