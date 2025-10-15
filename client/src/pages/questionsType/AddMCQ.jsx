import React from "react";

function AddMCQ({
  question,
  setOptions,
  handleOptionChange,
  setQuestion,
  setCorrectOption,
  correctOption,
  options,
  example,
}) {
  const handleCrrOption = (e) => {
    const value = parseInt(e.target.value);

    const updatedOption = [...correctOption];

    updatedOption[0] = value;

    setCorrectOption(updatedOption);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        example();
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectOption([]);
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
        <input
          type="number"
          value={correctOption[0]}
          onChange={handleCrrOption}
          className="w-full p-2 text-white border-2 border-black rounded-2xl outline-none"
          min="0"
          max="3"
        />
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

export default AddMCQ;
