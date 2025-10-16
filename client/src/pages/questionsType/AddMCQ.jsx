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
      className=" text-white p-6 rounded-xl shadow-lg w-full mt-5 mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-white mb-4">
        Add a New MCQ
      </h2>

      {/* Question Field */}
      <div>
        <label className="block mb-2 text-lg font-medium text-purple-300">
          Question
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          placeholder="Type your question here..."
        />
      </div>

      {/* Options Fields */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-300 mb-1">Options</h3>
        {options.map((opt, index) => (
          <div key={index}>
            <label className="block mb-1 text-sm">Option {index + 1}</label>
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={`Enter option ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Correct Option */}
      <div>
        <label className="block mb-2 text-lg font-medium text-purple-300">
          Correct Option (1–4)
        </label>
        <input
          type="number"
          value={correctOption[0]}
          onChange={handleCrrOption}
          className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          min="1"
          max="4"
          placeholder="Enter correct option number"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transform transition-transform duration-300 cursor-pointer"
        >
          🎉 Submit Question
        </button>
      </div>
    </form>
  );
}

export default AddMCQ;
