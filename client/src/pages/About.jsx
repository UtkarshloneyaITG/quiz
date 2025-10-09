// src/components/AboutPage.jsx
import React from 'react';
import AboutSection from '../Components/AboutSection';

const AboutPage = () => {
  return (
    <div className="about-page bg-[#2a1e55] w-full h-screen p-30 flex flex-col gap-5 text-center">
      <header className="about-header text-white text-center">
        <h1 className='font-bold text-3xl'>✨ About Us</h1>
        <p>
          Welcome to <strong>QuizGecho</strong> – your ultimate destination for fun, learning, and a little friendly competition!
        </p>
      </header>

      <AboutSection 
        title="🧠 What We Do"
        content={[
          "We create and curate quizzes across a wide range of topics including:",
          "- General Knowledge",
          "- Pop Culture",
          "- Science & Technology",
          "- History & Geography",
          "- Movies, Music, and TV",
          "- Personality & Just-for-Fun quizzes",
          "From quick daily brain teasers to deep-dive trivia battles, there’s always something new to explore!"
        ]}
      />

      <AboutSection
        title="💡 Why Choose Us?"
        content={[
          "- ✅ Fresh & fun quizzes added regularly",
          "- ✅ Designed for all ages and knowledge levels",
          "Whether you're here to kill time, learn something new, or prove you’re the trivia master among your friends—we’ve got you covered."
        ]}
      />

      <AboutSection
        title="💬 Let’s Connect!"
        content={[
          "Have feedback, quiz ideas, or just want to say hi? We’d love to hear from you!",
          "📧 Email us at: contact@yourdomain.com",
          "🌐 Follow us on social media: @YourQuizWebsite"
        ]}
      />

      <footer className="about-footer">
        <p className='text-white text-center mt-10'>Thank you for being part of our quiz-loving community. Dive in, have fun, and keep those brains buzzing! 🧩🕹️📚</p>
      </footer>
    </div>
  );
};

export default AboutPage;
