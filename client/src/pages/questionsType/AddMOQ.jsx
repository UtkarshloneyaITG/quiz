import React from "react";

function AddMOQ({
  question,
  setOptions,
  handleOptionChange,
  setQuestion,
  setCorrectOption,
  correctOption,
  options,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        example();
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectOption(0);
      }}
      className="space-y-4"
    >
      <div>
        <label>Question:</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          className="w-full p-2 text-white border-2 border-black rounded-2xl outline-none"
        />
      </div>

      {options.map((opt, index) => (
        <div key={index}>
          <label>Option {index + 1}:</label>
          <input
            type="text"
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full p-2 text-white border-2 border-black rounded-2xl outline-none"
          />
        </div>
      ))}

      <div>
        <label>Correct Option (1-4):</label>
        <div className="flex gap-2">
          {[...Array(4)].map(() => {
            return (
              <input
                className="h-[20px] w-[20px]"
                type="checkbox"
                name=""
                id=""
              />
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-800 transition-colors duration-200 text-white"
      >
        Submit Question
      </button>
    </form>
  );
}

export default AddMOQ;
