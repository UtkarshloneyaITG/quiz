import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getUserDetailsById } from "../servics/api";

function UserDetail() {
  const [arrHistory, setArrHistory] = useState([]);
  const [crrUser, setCrrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await getUserDetailsById(userId);
        const user = userData.user;

        const response = await axios.post(
          "http://localhost:5000/question/getuserhistory",
          { Email: user.email }
        );

        const historyData = response.data.finalHistory || [];
        // Reverse so latest submission comes first
        user.scoreHistory = historyData.reverse();

        setCrrUser(user);
        setArrHistory(historyData.reverse());
      } catch (error) {
        console.error("Error fetching user details or history:", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-b-4 border-purple-200"></div>
      </div>
    );
  }

  if (!crrUser) {
    return (
      <div className="text-center text-white min-h-screen flex items-center justify-center">
        User not found.
      </div>
    );
  }

  // Render TCO/MCQ/Subjective questions
  const renderQuestion = (q) => {
    if (q.Answers && q.CorrectAnswerID) {
      const userAnswerIDs = Array.isArray(q.UserAnswer)
        ? q.UserAnswer
        : [q.UserAnswer].filter(Boolean);
      const correctIDs = Array.isArray(q.CorrectAnswerID)
        ? q.CorrectAnswerID
        : [q.CorrectAnswerID].filter(Boolean);

      // Determine status
      const isFullyCorrect =
        userAnswerIDs.length === correctIDs.length &&
        correctIDs.every((id) => userAnswerIDs.includes(id));
      const isPartiallyCorrect =
        !isFullyCorrect && userAnswerIDs.some((id) => correctIDs.includes(id));

      return (
        <div className="mb-4 p-4 bg-zinc-700 rounded-xl shadow-md hover:shadow-xl transition-all">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-semibold">{q.Question}</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-600 text-white">
              {q.QuestionType?.toUpperCase()}
            </span>
          </div>
          <ul className="ml-6 space-y-1">
            {(q.Answers || []).map((ans) => {
              const isUserSelected = userAnswerIDs.includes(ans.AnswerID);
              const isCorrect = correctIDs.includes(ans.AnswerID);

              let bg = "bg-zinc-800 text-white"; // default

              if (isCorrect && isUserSelected && isFullyCorrect)
                bg = "bg-green-600 text-white font-semibold"; // ✅ fully correct
              else if (isCorrect && !isUserSelected && isPartiallyCorrect)
                bg = "bg-yellow-500 text-white"; // ⚠️ unselected correct
              else if (isUserSelected && !isCorrect)
                bg = "bg-red-500 text-white"; // ❌ wrong
              else if (isCorrect && isUserSelected && isPartiallyCorrect)
                bg = "bg-green-400 text-white"; // partially correct selected

              return (
                <li
                  key={ans.AnswerID}
                  className={`p-1 rounded transition-all hover:bg-purple-700/30 ${bg}`}
                >
                  {ans.Answer} {isUserSelected ? "(Your choice)" : ""}
                  {!isUserSelected && isCorrect && isPartiallyCorrect
                    ? " (Correct)"
                    : ""}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    // Subjective question
    return (
      <div className="mb-4 p-4 bg-zinc-700 rounded-xl shadow-md hover:shadow-xl transition-all">
        <h3 className="text-white font-semibold mb-2">
          {q.Question || q.QuestionText}
        </h3>
        <p className="text-purple-400">
          <span className="font-semibold">Your answer:</span> {q.Answer}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-zinc-900 p-6">
      <div className="max-w-6xl mx-auto bg-zinc-800 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-12">
        {/* User Profile */}
        <div className="flex-shrink-0">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              crrUser.fullName
            )}`}
            alt={crrUser.fullName}
            className="w-48 h-48 rounded-full object-cover border-4 border-purple-600 shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-white overflow-y-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2">{crrUser.fullName}</h1>
            <p className="text-xl">
              <span className="text-purple-400 font-semibold">Email:</span>{" "}
              {crrUser.email}
            </p>
          </div>

          {/* Score History */}
          <div>
            <h2 className="text-3xl font-bold text-purple-400 mb-4 border-b-2 border-purple-500 pb-2">
              Score History
            </h2>

            {arrHistory.length === 0 ? (
              <p className="text-zinc-400 italic">No history available.</p>
            ) : (
              arrHistory.map((session, index) => (
                <div key={index} className="mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                    <p>
                      <span className="text-purple-300 font-semibold">
                        Submitted:
                      </span>{" "}
                      {new Date(session.SubmitedOn).toLocaleString()}
                    </p>
                    <p>
                      <span className="text-purple-300 font-semibold">
                        Score:
                      </span>{" "}
                      {session.Score}
                    </p>
                    <p>
                      <span className="text-purple-300 font-semibold">
                        ESC Count:
                      </span>{" "}
                      {session.esc_count}
                    </p>
                  </div>

                  {[...(session.CorrectAnswers || []),
                    ...(session.WrongAnswers || []),
                    ...(session.SubjectiveAnswers || [])].map((q, idx) => (
                    <div key={idx}>{renderQuestion(q)}</div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
