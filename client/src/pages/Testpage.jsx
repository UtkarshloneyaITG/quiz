import TimerFunc from "../Components/TimeFun";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MCQ from "./questionsType/MCQ";
import STQ from "./questionsType/STQ";
import MOQ from "./questionsType/MOQ";

const Testpage = () => {
  const { t } = useTranslation();

  const [showPopup, setShowPopup] = useState(false);
  const [Questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectMcq, setSelectMcq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabHiddenCount, setTabHiddenCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabHiddenCount((prevCount) => prevCount + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const [escapePressed, setEscapePressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setEscapePressed(true);
      } else {
        setEscapePressed(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const elementRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (elementRef.current && !document.fullscreenElement) {
      elementRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullScreen(true);
        })
        .catch((err) => {
          console.error(
            `${t("Error attempting to enable fullscreen")}: ${err.message}` // ✅ t() जोड़ा गया
          );
        });
    } else {
      setEscapePressed(true);
    }
  });

  useEffect(() => {
    setShowPopup(true);
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/question/all");
        setQuestions(response.data);
        console.log(t("Questions fetched:"), response.data);
      } catch (error) {
        console.error(t("Error fetching questions:"), error);
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

  //  Submit all selected answers at once
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
        "http://localhost:5000/question/submit_answer",
        payload
      );

      console.log(t("Test submitted successfully:"), response.data);
      alert(t("Test submitted successfully!"));
    } catch (error) {
      console.error(t("Error submitting test:"), error);
      alert(t("Something went wrong while submitting test."));
    }
    navigate("/dashboard");
  };

  const currentQuestion = Questions[currentIndex];

  return (
    <div
      className="test-wrapper bg-[#2a1e55] w-full min-h-screen p-4"
      ref={elementRef}
    >
      <TimerFunc onTimeUp={handleSubmit} />
      <div className="flex mb-5 gap-5 justify-center">
        <p className="page-tracker text-white p-3 rounded-3xl bg-violet-950 shadow-2xs shadow-black ">
          {t("Tab Change")} :-{tabHiddenCount}
        </p>
        <p className="page-tracker text-white p-3 rounded-3xl bg-violet-950 shadow-2xs shadow-black ">
          {t("Exit Screen")}: {escapePressed ? t("yes") : t("no")}{" "}
        </p>
      </div>

      <div className="test-box max-w-4xl mx-auto bg-[#3a2e6a] p-6 rounded-2xl shadow-lg">
        <div className="box-heading mb-6">
          <h2 className="text-4xl text-center font-bold text-white">
            {t("Start Test")}
          </h2>
        </div>

        <div className="test-content mt-4">
          {loading ? (
            <p className="text-white text-center">
              {t("Loading questions...")}
            </p>
          ) : Questions.length > 0 && currentQuestion ? (
            <>
              {
                <>
                  <div className="question-box h-[100px] mb-4">
                    <h3 className="text-2xl font-semibold text-white">
                      {t("Question")} {currentIndex + 1}:{" "}
                      {currentQuestion.Question}{" "}
                    </h3>
                  </div>
                  {currentQuestion.QuestionType == "tco" ? (
                    <MCQ
                      currentIndex={currentIndex}
                      currentQuestion={currentQuestion}
                      handlePrev={handlePrev}
                      handleSubmit={handleSubmit}
                      handleNext={handleNext}
                      selectedAnswers={selectedAnswers}
                      Questions={Questions}
                      AnswerSelect={AnswerSelect}
                    />
                  ) : currentQuestion.QuestionType == "mcq" ? (
                    <MOQ
                      currentIndex={currentIndex}
                      currentQuestion={currentQuestion}
                      handlePrev={handlePrev}
                      handleSubmit={handleSubmit}
                      handleNext={handleNext}
                      selectMcq={selectMcq}
                      Questions={Questions}
                      AnswerSelect={AnswerSelect}
                    />
                  ) : (
                    <STQ
                      currentIndex={currentIndex}
                      currentQuestion={currentQuestion}
                      handlePrev={handlePrev}
                      handleSubmit={handleSubmit}
                      handleNext={handleNext}
                      selectedAnswers={selectedAnswers}
                      Questions={Questions}
                      AnswerSelect={AnswerSelect}
                    />
                  )}
                </>
              }
            </>
          ) : (
            <p className="text-white text-center">{t("No questions found.")}</p>
          )}

          <div className="buttons flex justify-between items-center">
            <button
              className="prev-btn font-bold text-white px-4 py-2 bg-[#443577] rounded disabled:opacity-50"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              {t("◀ Previous")}
            </button>

            <button
              className="sub-btn font-bold px-4 py-2 bg-green-500 text-black rounded"
              onClick={handleSubmit}
            >
              {t("Submit")}
            </button>

            <button
              className="next-btn font-bold text-white px-4 py-2 bg-[#443577] rounded disabled:opacity-50"
              onClick={handleNext}
              disabled={currentIndex === Questions.length - 1}
            >
              {t("Next ▶")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testpage;
