// src/components/AboutPage.jsx
import React from "react";
import { motion } from "framer-motion";
import aboutHero from "/images/aboutHero.svg";
import teamImg from "/images/team.svg";
import quizPng from "/images/quiz.svg";
import connectPng from "/images/connect.svg";
import brain from "/images/brain.svg";

const fadeIn = (direction = "up", delay = 0) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, delay },
    },
  };
  return variants;
};

const floatingVariants = {
  animate: {
    y: [0, 20, 0],
    x: [0, 10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const AboutPage = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#1c1240] via-[#2a1e55] to-[#3b2a78] text-white min-h-screen overflow-hidden">
      {/* === Animated Gradient Background Orbs === */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-600/40 blur-3xl rounded-full"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-40 right-10 w-80 h-80 bg-pink-500/30 blur-3xl rounded-full"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/30 blur-3xl rounded-full"
        variants={floatingVariants}
        animate="animate"
      />

      {/* === Hero Section === */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn("up")}
        className="relative flex flex-col md:flex-row items-center justify-center gap-10 py-16 px-6 md:px-20 z-10"
      >
        <motion.div
          style={{ zIndex: 1 }}
          className="md:w-1/2 text-center md:text-left"
          variants={fadeIn("right", 0.2)}
        >
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Welcome to QuizGecho ✨
          </h1>
          <p className="text-lg text-gray-200 mb-6 leading-relaxed">
            The fun, brain-boosting platform where learning meets excitement!
            Discover quizzes, challenge friends, and keep your knowledge sharp —
            one question at a time.
          </p>
          <a
            href="/test"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            Start a Quiz 🚀
          </a>
        </motion.div>

        <motion.div
          className="md:w-1/2"
          variants={fadeIn("left", 0.3)}
          drag
          whileDrag={{ color: "red" }}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          <img
            src={aboutHero}
            alt="Quiz Illustration"
            className="w-full max-w-md mx-auto drop-shadow-2xl"
            style={{ pointerEvents: "none", zIndex: 0 }}
          />
        </motion.div>
      </motion.section>

      {/* === What We Do === */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn("up")}
        className="relative py-16 px-6 md:px-20 bg-[#25194b]/60 rounded-3xl mx-5 my-8 shadow-xl backdrop-blur-sm border border-purple-500/20 z-10"
      >
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.img
            src={brain}
            alt="Brain Icon"
            className="w-60 hover:scale-110 transition-all duration-300"
            variants={fadeIn("right")}
          />
          <motion.div variants={fadeIn("left", 0.3)}>
            <h2 className="text-3xl font-bold mb-4 text-purple-300">
              🧠 What We Do
            </h2>
            <p className="text-gray-200 leading-relaxed">
              We create and curate interactive quizzes covering a wide range of
              topics:
            </p>
            <ul className="mt-3 space-y-2 text-gray-300 text-left">
              <li>• General Knowledge & Current Affairs</li>
              <li>• Pop Culture & Entertainment</li>
              <li>• Science, Tech & Innovation</li>
              <li>• History, Geography & Sports</li>
              <li>• Fun & Personality quizzes</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* === Why Choose Us === */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn("up")}
        className="relative py-16 px-6 md:px-20 flex flex-col md:flex-row-reverse items-center gap-10 z-10"
      >
        <motion.img
          src={quizPng}
          alt="Quiz Icon"
          className="w-60 hover:rotate-6 hover:scale-110 transition-all duration-300"
          variants={fadeIn("left")}
        />
        <motion.div variants={fadeIn("right", 0.3)}>
          <h2 className="text-3xl font-bold mb-4 text-pink-300">
            💡 Why Choose QuizGecho?
          </h2>
          <p className="text-gray-200 leading-relaxed">
            We bring fun, knowledge, and community together in one engaging
            experience.
          </p>
          <ul className="mt-3 space-y-2 text-gray-300 text-left">
            <li>✅ New quizzes every week</li>
            <li>✅ Suitable for all ages and interests</li>
            <li>✅ Compete with friends and track your score</li>
            <li>✅ Clean, simple, and mobile-friendly interface</li>
          </ul>
        </motion.div>
      </motion.section>

      {/* === Our Team Section === */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn("up")}
        className="relative py-16 px-6 md:px-20 bg-[#1f153d]/80 flex flex-col md:flex-row items-center gap-10 rounded-3xl mx-5 my-8 z-10"
      >
        <motion.img
          src={teamImg}
          alt="Team Illustration"
          className="w-60 md:w-80 hover:scale-105 transition-all duration-300"
          variants={fadeIn("right")}
        />
        <motion.div variants={fadeIn("left", 0.3)}>
          <h2 className="text-3xl font-bold mb-4 text-blue-300">
            👩‍💻 Meet Our Team
          </h2>
          <p className="text-gray-300 max-w-xl">
            Behind QuizGecho is a passionate group of developers, designers, and
            trivia enthusiasts dedicated to making learning fun and accessible
            for everyone.
          </p>
        </motion.div>
      </motion.section>

      {/* === Connect Section === */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn("up")}
        className="relative py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10 z-10"
      >
        <motion.img
          src={connectPng}
          alt="Connect Illustration"
          className="w-48 md:w-70 hover:scale-110 transition-transform duration-300"
          variants={fadeIn("left")}
        />
        <motion.div
          className="text-center md:text-left"
          variants={fadeIn("right", 0.3)}
        >
          <h2 className="text-3xl font-bold mb-3 text-green-300">
            💬 Let’s Connect!
          </h2>
          <p className="text-gray-300">
            Have ideas, suggestions, or want to collaborate? We’d love to hear
            from you!
          </p>
          <p className="mt-3">
            📧 <strong>contact@quizgecho.com</strong>
          </p>
          <p>🌐 Follow us: @QuizGechoOfficial</p>
        </motion.div>
      </motion.section>

      {/* === Footer === */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={fadeIn("up")}
        className="relative py-10 border-t border-purple-500/20 text-center text-gray-400 z-10"
      >
        <p>Thank you for being part of our quiz-loving community 💜</p>
        <p className="mt-2 text-sm">
          © {new Date().getFullYear()} QuizGecho. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
};

export default AboutPage;
