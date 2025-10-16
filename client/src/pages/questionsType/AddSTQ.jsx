import React from "react";

function AddSTQ({ question, setQuestion }) {
  return (
    <from 
    onSubmit={(e) => {
        e.preventDefault();
        setQuestion("");
      }}
      >
      <label>Question:</label>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={3}
        className="w-full p-2 text-white border-2 border-black rounded-2xl outline-none"
      />

      <button
        type="submit"
        className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-800 transition-colors duration-200 text-white"
      >
        Submit Question
      </button>
    </from>
  );
}

export default AddSTQ;
