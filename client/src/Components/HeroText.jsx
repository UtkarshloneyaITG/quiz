import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// One-time fly-in for regular letters
const FlyInText = ({ text }) => {
  return (
    <div className="flex flex-wrap text-8xl font-kids leading-tight text-black">
      {text.split("").map((char, index) => {
        if (char === " ") return <span key={index} className="w-2 md:w-4" />;

        return (
          <motion.span
            key={index}
            className="inline-block"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              rotate: Math.random() * 360,
              opacity: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 16,
              delay: index * 0.07,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};

// Looping animated "fun!"
const AnimatedFun = () => {
  const letters = ["f", "u", "n", "!"];
  const colors = [
    "text-pink-500",
    "text-yellow-400",
    "text-purple-500",
    "text-blue-400",
  ];

  return (
    <motion.div
      drag
      dragConstraints={{ top: -280, right: 1000, left: -280, bottom: 200 }}
      className="flex text-4xl md:text-8xl font-kids leading-tight ml-3 absolute  top-30 left-43"
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${colors[i]} mx-1`}
          animate={{
            rotate: [0, 10, -10, 0],
            y: [0, -10, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.4 + i * 0.1,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const HeroText = () => {
  return (
    <div className="absolute top-60 left-28  w-140">
      <div className="relative">
        <div>
          <FlyInText text="Turn learning into" />
        </div>
        <AnimatedFun />
      </div>

      {/* Animated Button */}
      <div className="flex gap-3">
        <a href="#cards">
          <motion.div
            className="mt-5 inline-block px-6 py-4 rounded-full font-extrabold bg-purple-400 text-white border border-white text-lg md:text-xl shadow-lg cursor-pointer hover:bg-transparent hover:text-black hover:border-black transition-all duration-300"
            animate={{
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 15px rgba(186, 85, 211, 0.7)",
            }}
          >
            🎉 Get Started ▼
          </motion.div>
        </a>
        <Link to={"/codeEditor"}>
          <motion.div
            className="mt-5 inline-block px-6 py-4 rounded-full font-extrabold bg-purple-100 text-purple-400 border border-purple-400 text-lg md:text-xl shadow-lg cursor-pointer hover:bg-transparent hover:text-black hover:border-black transition-all duration-300"
            animate={{
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 15px rgba(186, 85, 211, 0.7)",
            }}
          >
            Practice Now
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default HeroText;
