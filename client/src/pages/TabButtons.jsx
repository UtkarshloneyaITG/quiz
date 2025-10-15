import React from "react";

export function TabButtons({ activeTab, setActiveTab, fetchAllQuestionForDelete }) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setActiveTab("add-question")}
        className={`px-4 py-2 rounded ${
          activeTab === "add-question" ? "bg-indigo-600" : "bg-gray-700"
        } hover:bg-indigo-800 transition-colors duration-200 text-white`}
      >
        Add Question
      </button>
      <button
        onClick={() => {
          setActiveTab("all-questions");
          fetchAllQuestionForDelete();
        }}
        className={`px-4 py-2 rounded ${
          activeTab === "all-questions" ? "bg-indigo-600" : "bg-gray-700"
        } hover:bg-indigo-800 transition-colors duration-200 text-white`}
      >
        All Questions
      </button>
    </div>
  );
}
