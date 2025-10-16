import React, { useState, useEffect } from "react";
import { dashboard, deleteByEmail } from "../servics/api";
import { useTranslation } from "react-i18next";
import Loading from "../sharedComponents/Loding";
import { useMyFunctions } from "../provider/MyAuthProvider";
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [score, setScore] = useState([]);
  const [openIndexes, setOpenIndexes] = useState([]);
  const { loding, setLoding } = useMyFunctions();
  const { t } = useTranslation();

  const getDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const userData = await dashboard(user.email);

      console.log("userdata", userData);
      setData(userData.userData);
      setScore(userData.userData.scoreHistory);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoding(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  const toggleOpen = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleDeleteHistory = async () => {
    try {
      await deleteByEmail(data.email);
      setScore([]);
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };

  // Fallback initials for avatar
  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const profileCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a1e55] to-[#1f163d] px-6 py-12">
      <AnimatePresence>
        {loding ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loading />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Heading */}
            <motion.h2
              className="text-4xl font-extrabold text-white text-center mb-14 tracking-wide select-none"
              variants={headingVariants}
            >
              {t("📊 Dashboard")}
            </motion.h2>

            {/* User Profile Card */}
            <motion.div
              className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16"
              variants={profileCardVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-white/30 shadow-lg flex items-center justify-center bg-white/10 text-4xl font-extrabold text-white/70 select-none">
                {data.avatarUrl ? (
                  <img
                    src={data.avatarUrl}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(data.fullName) || "U"
                )}
              </div>
              <div className="flex-1 text-white space-y-2 mt-5">
                <h3 className="text-3xl font-semibold">{data.fullName || "Unknown User"}</h3>
                <p className="text-lg opacity-80">Email: {data.email || "N/A"}</p>
                <p className="text-lg opacity-80">Class: {data.userClass || "N/A"}</p>
              </div>
              <motion.button
                onClick={handleDeleteHistory}
                whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(220, 38, 38, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center cursor-pointer gap-3 bg-red-600 hover:bg-red-700 rounded-xl px-6 py-3 shadow-lg text-white font-semibold text-lg"
                title="Delete Score History"
              >
                <MdDelete className="text-3xl" />
                Delete History
              </motion.button>
            </motion.div>

            {/* Score History */}
            <div className="space-y-6">
              <div className="grid grid-cols-3 font-semibold text-white text-xl border-b border-white/30 pb-3 tracking-wide">
                <p className="text-left pl-6">Title</p>
                <p className="text-center">Score</p>
                <p className="text-right pr-6">Details</p>
              </div>
              {/* {score.map((s, index) => {
                const dateObj = new Date(s.submitedON);

              {score.length === 0 ? (
                <motion.p
                  className="text-center text-white/60 mt-6 text-lg italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  No score history available.
                </motion.p>
              ) : (
                score.map((s, index) => {
                  const dateObj = new Date(s.submitedON);
                  const date = dateObj.toLocaleDateString();
                  const time = dateObj.toLocaleTimeString();
                  const isOpen = openIndexes.includes(index);

                return (
                  <div
                    key={index}
                    className={`heading font-bold text-2xl text-white pt-2 pb-2 pr-15 pl-10  m-2 rounded-2xl hover:bg-[#41317a] transition duration-300 score-holder ${
                      isOpen ? "open" : ""
                    }`}
                  >
                    <div className="flex justify-between">
                      Scores : <span>{s.score}</span>
                      <span
                        className="detailScoreOpener"
                        onClick={() => toggleOpen(index)}
                      >
                        •••
                      </span>
                    </div>
                    <br />
                    <div className="detail-page-score">
                      Attempt Questions : {s.questionAttempt.attempt} <br />
                      <hr />
                      Correct Answers : {s.questionAttempt.correctAnswers}{" "}
                      <br />
                      <hr />
                      Date and Time: {date} , {time}
                      <hr />
                    </div>
                  </div>
                );
              })} */}
              <div className="scores-content"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
