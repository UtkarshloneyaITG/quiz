import React, { useEffect, useState } from "react";
import TimerFunc from "../Components/TimeFun";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Testpage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [Questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setShowPopup(true);
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/question/all");
        setQuestions(response.data);
        console.log("Questions fetched:", response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Hide popup and start test
  const handleStart = () => {
    setShowPopup(false);
  };

  // Next Question
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, Questions.length - 1));
  };

  // Previous Question
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // When user selects an answer
  const AnswerSelect = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  // ✅ Submit all selected answers at once
  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user.email;
    console.log(userEmail);
    try {
      // Convert selectedAnswers object → array of objects
      const formattedAnswers = Object.entries(selectedAnswers).map(
        ([QuestionID, AnswerID]) => ({
          QuestionID,
          AnswerID,
        })
      );

      const payload = {
        Email: userEmail,
        SubmitAnswers: formattedAnswers,
      };

      const response = await axios.post(
        "http://localhost:3000/question/submit_answer",
        payload
      );

      console.log("✅ Test submitted successfully:", response.data);
      alert("✅ Test submitted successfully!");
    } catch (error) {
      console.error("❌ Error submitting test:", error);
      alert("❌ Something went wrong while submitting test.");
    }
    navigate("/dashboard");
  };

  const currentQuestion = Questions[currentIndex];

  return (
    <div className="test-wrapper bg-[#2a1e55] w-full min-h-screen p-4">
      {/* If you have popup component, uncomment below line */}
      {/* {showPopup && <PopUp onStart={handleStart} />} */}

      <TimerFunc onTimeUp={handleSubmit}/>

      <div className="test-box max-w-4xl mx-auto bg-[#3a2e6a] p-6 rounded-2xl shadow-lg">
        <div className="box-heading mb-6">
          <h2 className="text-4xl text-center font-bold text-white">
            Start Test
          </h2>
        </div>

        <div className="test-content mt-4">
          {loading ? (
            <p className="text-white text-center">Loading questions...</p>
          ) : Questions.length > 0 && currentQuestion ? (
            <>
              <div className="question-box mb-4">
                <h3 className="text-2xl font-semibold text-white">
                  Question {currentIndex + 1}: {currentQuestion.Question}
                </h3>
              </div>

              <div className="options mb-6">
                <div className="flex flex-col gap-2">
                  {currentQuestion.Answers.map((answer, i) => (
                    <label
                      key={answer.AnswerID}
                      className="options-div text-[18px] font-medium text-white bg-[#4b3f7f] p-2 rounded flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question_${currentQuestion.QuestionID}`}
                        value={answer.AnswerID}
                        checked={
                          selectedAnswers[currentQuestion.QuestionID] ===
                          answer.AnswerID
                        }
                        onChange={() =>
                          AnswerSelect(
                            currentQuestion.QuestionID,
                            answer.AnswerID
                          )
                        }
                        className="mr-2"
                      />
                      {i + 1}. {answer.Answer}
                    </label>
                  ))}
                </div>
              </div>

              <div className="buttons flex justify-between items-center">
                <button
                  className="prev-btn font-bold text-white px-4 py-2 bg-[#443577] rounded disabled:opacity-50"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  ◀ Previous
                </button>

                <button
                  className="sub-btn font-bold px-4 py-2 bg-green-500 text-black rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>

                <button
                  className="next-btn font-bold text-white px-4 py-2 bg-[#443577] rounded disabled:opacity-50"
                  onClick={handleNext}
                  disabled={currentIndex === Questions.length - 1}
                >
                  Next ▶
                </button>
              </div>
            </>
          ) : (
            <p className="text-white text-center">No questions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testpage;
