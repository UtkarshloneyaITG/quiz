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
  const navigate = useNavigate();

  const [Questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [tabHiddenCount, setTabHiddenCount] = useState(0);
  const [escapePressed, setEscapePressed] = useState(false);

  // 🟩 Separate states for all question types
  const [tcoAnswers, setTcoAnswers] = useState({});
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState({});

  // -------------------- Effects ----------------------
  useEffect(() => {
    // Track tab changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabHiddenCount((prev) => prev + 1);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    // Track ESC press
    const handleKeyDown = (event) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setEscapePressed(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fullscreen
  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef.current && !document.fullscreenElement) {
      elementRef.current.requestFullscreen().catch((err) => {
        console.error(`${t("Error enabling fullscreen")}: ${err.message}`);
      });
    }
  }, []);

  // Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/question/all");
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // -------------------- Handlers ----------------------

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, Questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  //  For single correct (TCO)
  const handleTcoSelect = (questionId, answerId) => {
    setTcoAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  //  For multiple correct (MCQ)
  const handleMcqSelect = (questionId, answerId) => {
    setMcqAnswers((prev) => {
      const prevAnswers = prev[questionId] || [];
      const isSelected = prevAnswers.includes(answerId);
      return {
        ...prev,
        [questionId]: isSelected
          ? prevAnswers.filter((id) => id !== answerId)
          : [...prevAnswers, answerId],
      };
    });
  };

  //  For Subjective Questions
  const handleSubjectiveChange = (questionId, questionText, answerText) => {
    setSubjectiveAnswers((prev) => ({
      ...prev,
      [questionId]: { Question: questionText, Answer: answerText },
    }));
  };

  // ✅ Submit handler
  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email || "test@example.com";

    const TypeTCO = {
      SubmitAnswers: Object.entries(tcoAnswers).map(
        ([QuestionId, AnswerID]) => ({
          QuestionId,
          AnswerID,
        })
      ),
    };

    const TypeMCQ = {
      SubmitAnswers: Object.entries(mcqAnswers).map(
        ([QuestionId, AnswerID]) => ({
          QuestionId,
          AnswerID,
        })
      ),
    };

    const TypeSubjective = {
      SubmitAnswers: Object.entries(subjectiveAnswers).map(
        ([QuestionId, { Question, Answer }]) => ({
          QuestionId,
          Question,
          Answer,
        })
      ),
    };

    const body = {
      Email: userEmail,
      TypeTCO,
      TypeMCQ,
      TypeSubjective,
      esc_count: tabHiddenCount,
    };

    console.log("Payload:", body);

    try {
      await axios.post("http://localhost:5000/question/submit_answer", body);
      alert(t("Test submitted successfully!"));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting test:", error);
      alert(t("Error submitting test"));
    }
  };

  const currentQuestion = Questions[currentIndex];

  return (
    <div
      className="test-wrapper bg-[#2a1e55] w-full min-h-screen p-4"
      ref={elementRef}
    >
      <TimerFunc onTimeUp={handleSubmit} />

      <div className="flex mb-5 gap-5 justify-center">
        <p className="text-white p-3 rounded-3xl bg-violet-950">
          {t("Tab Change")} : {tabHiddenCount}
        </p>
        <p className="text-white p-3 rounded-3xl bg-violet-950">
          {t("Exit Screen")}: {escapePressed ? "Yes" : "No"}
        </p>
      </div>

      <div className="test-box max-w-4xl mx-auto bg-[#3a2e6a] p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl text-center text-white font-bold mb-6">
          {t("Start Test")}
        </h2>

        {loading ? (
          <p className="text-white text-center">{t("Loading questions...")}</p>
        ) : Questions.length > 0 && currentQuestion ? (
          <>
            <div className="mb-4">
              <h3 className="text-2xl text-white font-semibold">
                {t("Question")} {currentIndex + 1}: {currentQuestion.Question}
              </h3>
            </div>

            {currentQuestion.QuestionType === "tco" ? (
              <MCQ
                currentQuestion={currentQuestion}
                selectedAnswers={tcoAnswers}
                AnswerSelect={handleTcoSelect}
              />
            ) : currentQuestion.QuestionType === "mcq" ? (
              <MOQ
                currentQuestion={currentQuestion}
                mcqAnswers={mcqAnswers}
                setmcqSelectedAnswers={handleMcqSelect}
              />
            ) : (
              <STQ
                currentQuestion={currentQuestion}
                handleSubjectiveChange={handleSubjectiveChange}
              />
            )}

            <div className="buttons flex justify-between mt-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-[#443577] px-4 py-2 rounded text-white font-bold disabled:opacity-50"
              >
                ◀ {t("Previous")}
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-500 px-4 py-2 rounded text-black font-bold"
              >
                {t("Submit")}
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === Questions.length - 1}
                className="bg-[#443577] px-4 py-2 rounded text-white font-bold disabled:opacity-50"
              >
                {t("Next")} ▶
              </button>
            </div>
          </>
        ) : (
          <p className="text-white text-center">{t("No questions found.")}</p>
        )}
      </div>
    </div>
  );
};

export default Testpage;
