import React from "react";

function AddSTQ({ question, setQuestion, example }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        example && example(); // Optional callback if provided
        setQuestion("");
      }}
      className=" text-white p-6 rounded-xl shadow-lg w-full mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-white mb-4">
        Add a Short Text Question
      </h2>

      <div>
        <label className="block mb-2 text-lg font-medium text-purple-300">
          Question
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          placeholder="Type your short answer question here..."
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transform transition-transform duration-300 cursor-pointer"
        >
          ✏️ Submit Question
        </button>
      </div>
    </form>
  );
}

export default AddSTQ;
