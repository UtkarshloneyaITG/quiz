import React, { useState, useEffect } from "react";

import { dashboard } from "../servics/api";

const Dashboard = () => {
  const [data, setData] = useState({});

  const [score, setScore] = useState([]);

  const [openIndexes, setOpenIndexes] = useState([]); // ✅ moved here

  const getDashboard = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const userData = await dashboard(user.email);

    console.log(userData.userData);

    setData(userData.userData);

    setScore(userData.userData.scoreHistory);
  };

  useEffect(() => {
    getDashboard();
  }, []);

  const toggleOpen = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="test-wrapper bg-[#2a1e55] w-full min-h-screen">
      <div className="dashboard border-1 border-white min-h-screen rounded-3xl ">
        <div className="box-heading">
          <h2 className="text-4xl text-center font-bold text-white">
            Dashboard
          </h2>
        </div>

        <div className="dash-content">
          <div className="person-details flex gap-20">
            <div className="person-photo h-50 w-50 bg-zinc-500 rounded-3xl "></div>
            <div className="details text-2xl font-semibold text-white flex flex-col gap-5 self-center">
              <div className="person-name">Name : {data.fullName}</div>
              <div className="person-email">Email : {data.email}</div>
              <div className="person-class">Class : {data.userClass}</div>
            </div>
          </div>

          <div className="scores">
            <div className="heading font-bold text-2xl text-white pt-2 pb-2 pr-10 pl-10 border-3 border-fuchsia-200 m-2 mt-10 rounded-3xl flex justify-between">
              Title <span className="pl-15">Points</span> <span>Details</span>
            </div>

            {score.map((s, index) => {
              const isoString = "2025-10-09T08:01:51.128Z";

              const date = new Date(isoString);

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
                    Correct Answers : {s.questionAttempt.correctAnswers} <br />
                    <hr />
                    Date and Time: {date.toLocaleString()} <hr />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
