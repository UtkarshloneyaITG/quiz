import React from "react";

function AddMOQ({
  question,
  setOptions,
  handleOptionChange,
  setQuestion,
  setCorrectOption,
  correctOption,
  options,
  example,
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
      className=" text-white p-6 rounded-xl shadow-lg w-full  mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-white mb-4">
        Add a New MOQ
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

      {/* Correct Option Checkboxes */}
      <div>
        <label className="block mb-2 text-lg font-medium text-purple-300">
          Select Correct Option(s)
        </label>
        <div className="flex gap-6 flex-wrap">
          {[...Array(4)].map((_, index) => (
            <label
              key={index}
              className="flex items-center gap-2 text-white text-lg"
            >
              <input
                type="checkbox"
                checked={correctOption === index + 1}
                onChange={() => setCorrectOption(index + 1)}
                className="h-5 w-5 text-purple-600 bg-zinc-800 border-gray-600 rounded focus:ring-purple-500"
              />
              {index + 1}
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transform transition-transform duration-300 cursor-pointer"
        >
          🚀 Submit Question
        </button>
      </div>
    </form>
  );
}

export default AddMOQ;
