import TimerFunc from "../Components/TimeFun";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MCQ from "./questionsType/MCQ";
import STQ from "./questionsType/STQ";
import MOQ from "./questionsType/MOQ";
import { useAlert } from "../servics/ApiChanger";
import { motion, AnimatePresence } from "framer-motion";

const Testpage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [Questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [tabHiddenCount, setTabHiddenCount] = useState(0);
  const [escapePressed, setEscapePressed] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const [tcoAnswers, setTcoAnswers] = useState({});
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState({});

  const elementRef = useRef(null);

  // Tab hidden count
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) setTabHiddenCount(prev => prev + 1);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Escape key detection
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" || event.keyCode === 27) setEscapePressed(true);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fullscreen
  useEffect(() => {
    if (elementRef.current && !document.fullscreenElement) {
      elementRef.current.requestFullscreen().catch(err => {
        console.error(`${t("Error enabling fullscreen")}: ${err.message}`);
      });
    }
  }, []);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/question/all");
        setQuestions(res.data);

        // Initialize MCQ answers with empty arrays
        const initialMCQ = {};
        res.data.forEach(q => {
          if (q.QuestionType === "mcq") initialMCQ[q.QuestionID] = [];
        });
        setMcqAnswers(initialMCQ);

      } catch (err) {
        showAlert(`Error fetching questions: ${err}`, "#e31814");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Navigation
  const handleNext = () => { if (currentIndex < Questions.length - 1) { setDirection(1); setCurrentIndex(prev => prev + 1); } };
  const handlePrev = () => { if (currentIndex > 0) { setDirection(-1); setCurrentIndex(prev => prev - 1); } };

  // TCO select
  const handleTcoSelect = (questionId, answerId) => {
    setTcoAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  // MCQ select
  const handleMcqSelect = (questionId, answerId) => {
    setMcqAnswers(prev => {
      const prevAnswers = prev[questionId] || [];
      const isSelected = prevAnswers.includes(answerId);
      return { 
        ...prev, 
        [questionId]: isSelected 
          ? prevAnswers.filter(id => id !== answerId)
          : [...prevAnswers, answerId] 
      };
    });
  };

  // Subjective change
  const handleSubjectiveChange = (questionId, questionText, answerText) => {
    setSubjectiveAnswers(prev => ({
      ...prev,
      [questionId]: { Question: questionText, Answer: answerText }
    }));
  };

  // Submit
  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email || "test@example.com";

    const TypeTCO = { SubmitAnswers: Object.entries(tcoAnswers).map(([QuestionID, AnswerID]) => ({ QuestionID, AnswerID })) };
    const TypeMCQ = { SubmitAnswers: Object.entries(mcqAnswers).map(([QuestionID, AnswerIDs]) => ({ QuestionID, Answer: AnswerIDs })) };
    const TypeSubjective = { SubmitAnswers: Object.entries(subjectiveAnswers).map(([QuestionID, { Question, Answer }]) => ({ QuestionID, Question, Answer })) };

    const body = { Email: userEmail, TypeTCO, TypeMCQ, TypeSubjective, esc_count: tabHiddenCount };

    console.log("Payload:", body);

    try {
      await axios.post("http://localhost:5000/question/submit_answer", body);
      showAlert("Test submitted successfully!", "#14e32c");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting test:", error);
      showAlert(`Error submitting test: ${error}`, "#e31814");
    }
  };

  const currentQuestion = Questions[currentIndex];

  // Animation variants
  const questionVariants = {
    initial: (direction) => ({ opacity: 0, x: direction > 0 ? 50 : -50 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: (direction) => ({ opacity: 0, x: direction < 0 ? -50 : 50, transition: { duration: 0.3 } }),
  };

  return (
    <div className="test-wrapper bg-[#2a1e55] w-full min-h-screen p-4" ref={elementRef}>
      <TimerFunc onTimeUp={handleSubmit} />

      <div className="flex mb-5 gap-5 justify-center">
        <p className="text-white p-3 rounded-3xl bg-violet-950">{t("Tab Change")} : {tabHiddenCount}</p>
        <p className="text-white p-3 rounded-3xl bg-violet-950">{t("Exit Screen")}: {escapePressed ? "Yes" : "No"}</p>
      </div>

      <div className="test-box max-w-4xl mx-auto bg-[#3a2e6a] p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl text-center text-white font-bold mb-6">{t("Start Test")}</h2>

        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.p key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white text-center">{t("Loading questions...")}</motion.p>
          ) : Questions.length > 0 && currentQuestion ? (
            <motion.div key={currentQuestion._id || currentIndex} custom={direction} variants={questionVariants} initial="initial" animate="animate" exit="exit" className="question-content">
              <div className="mb-4 h-[100px]">
                <h3 className="text-2xl text-white font-semibold">{t("Question")} {currentIndex + 1}: {currentQuestion.Question}</h3>
              </div>

              {currentQuestion.QuestionType === "tco" ? (
                <MCQ currentQuestion={currentQuestion} selectedAnswers={tcoAnswers} AnswerSelect={handleTcoSelect} />
              ) : currentQuestion.QuestionType === "mcq" ? (
                <MOQ currentQuestion={currentQuestion} mcqAnswers={mcqAnswers} setmcqSelectedAnswers={handleMcqSelect} />
              ) : (
                <STQ currentQuestion={currentQuestion} handleSubjectiveChange={handleSubjectiveChange} />
              )}
            </motion.div>
          ) : (
            <motion.p key="no-questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white text-center">{t("No questions found.")}</motion.p>
          )}
        </AnimatePresence>

        <div className="buttons flex justify-between mt-4">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="bg-[#443577] px-4 py-2 rounded text-white font-bold disabled:opacity-50">◀ {t("Previous")}</button>
          <button onClick={handleSubmit} className="bg-green-500 px-4 py-2 rounded text-black font-bold">{t("Submit")}</button>
          <button onClick={handleNext} disabled={currentIndex === Questions.length - 1} className="bg-[#443577] px-4 py-2 rounded text-white font-bold disabled:opacity-50">{t("Next")} ▶</button>
        </div>
      </div>
    </div>
  );
};

export default Testpage;
