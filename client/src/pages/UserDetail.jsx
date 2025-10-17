import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetailsById } from "../servics/api";
import Loading from "../sharedComponents/Loding.jsx";
import axios from "axios";

function UserDetail() {
  const [arrHistory, setArrHistory] = useState([]);
  const [crrUser, setCrrUser] = useState(null);
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
        const historyData = response.data;
        console.log(historyData)

        user.scoreHistory = historyData.finalHistory || [];

        setCrrUser(user);
        setArrHistory(user.scoreHistory);
      } catch (error) {
        console.error("Error fetching user details or history:", error);
      }
    };
    getUser();
  }, [userId]);

  if (!crrUser) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-zinc-900 p-6">
      <div className="max-w-6xl mx-auto bg-zinc-800 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-12">
        {/* User Image */}
        <div className="flex-shrink-0">
          <img
            src={"https://ui-avatars.com/api/?name=" + encodeURIComponent(crrUser.fullName)}
            alt={crrUser.fullName}
            className="w-48 h-48 rounded-full object-cover border-4 border-purple-600 shadow-lg"
          />
        </div>

        {/* User Info & Score History */}
        <div className="flex-1 text-white overflow-y-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">{crrUser.fullName}</h1>
            <p className="text-xl">
              <span className="text-purple-400 font-semibold">Email:</span> {crrUser.email}
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-purple-400 mb-4 border-b-2 border-purple-500 pb-2">
              Score History
            </h2>
            {arrHistory.length === 0 ? (
              <p className="text-zinc-400 italic">No history available.</p>
            ) : (
              <div className="space-y-6">
                {arrHistory.map((score, index) => (
                  <div
                    key={index}
                    className="bg-zinc-700 rounded-xl p-6 shadow-md hover:shadow-lg hover:bg-purple-700/30 transition-all"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <p>
                        <span className="text-purple-300 font-semibold">Submitted:</span>{" "}
                        {new Date(score.SubmitedOn).toLocaleString()}
                      </p>
                      <p>
                        <span className="text-purple-300 font-semibold">Score:</span>{" "}
                        {score.Score}
                      </p>
                      <p>
                        <span className="text-purple-300 font-semibold">ESC:</span>{" "}
                        {score.esc_count}
                      </p>
                    </div>

                    {/* Correct Answers */}
                    <div className="mb-4">
                      <h3 className="text-green-400 font-semibold mb-1">✅ Correct Answers</h3>
                      {score.CorrectAnswers.length === 0 ? (
                        <p className="text-zinc-400 italic">None</p>
                      ) : (
                        <ul className="list-disc ml-6 space-y-1">
                          {score.CorrectAnswers.map((q, i) => (
                            <li key={i}>
                              <span className="text-white">{q.Question}</span>{" "}
                              <span className="text-green-400">:- ({q.UserAnswerText?.join(", ")})</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Wrong Answers */}
                    <div>
                      <h3 className="text-red-400 font-semibold mb-1">❌ Wrong Answers</h3>
                      {score.WrongAnswers.length === 0 ? (
                        <p className="text-zinc-400 italic">None</p>
                      ) : (
                        <ul className="list-disc ml-6 space-y-1">
                          {score.WrongAnswers.map((q, i) => (
                            <li key={i}>
                              <span className="text-white">{q.Question}</span>{" "}
                              <span className="text-red-400">
                                ({q.UserAnswerText?.join(", ") || "wrong Answer"})
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
