import React, { useState } from "react";

export function QuestionsList({ questions, delete_question }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = async (id) => {
    await delete_question(id);

    // ✅ Show popup
    setShowPopup(true);

    // ⏳ Hide after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">All Questions</h3>
      <ul>
        {questions.map((q) => (
          <li
            key={q.QuestionID}
            className="bg-gray-800 p-4 mb-3 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <p className="font-bold text-white text-lg">{q.Question}</p>

            <ul className="ml-4 mt-2 space-y-1">
              {q.Answers.map((a, index) => (
                <li
                  key={index}
                  className="px-2 py-1 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 cursor-pointer transition-colors duration-200"
                >
                  {a.Answer}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleDelete(q.QuestionID)}
              className="mt-3 ml-3.5 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {showPopup && (
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             bg-green-600 text-white text-lg text-center
             px-6 py-4 w-full max-w-sm rounded-xl shadow-xl
             animate-fade-in-out
             flex flex-col items-center space-y-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-white border-2 rounded-full p-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h4 className="font-bold text-white text-lg">Question Deleted!</h4>
          <p className="text-sm text-white">
            The selected question has been successfully removed from the
            database. ✅
          </p>
        </div>
      )}
    </div>
  );
}
