import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { dashboard } from "../servics/api";

import { useTranslation } from "react-i18next";
import Loading from "../sharedComponents/Loding";
import { useMyFunctions } from "../provider/MyAuthProvider";

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
      setData(userData.userData);
      setScore(userData.userData.scoreHistory);
    } catch (error) {
      console.log("Error fetching dashboard data:", error);
    } finally {
      setLoding(false);
    }
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
    <div className="test-wrapper relative bg-[#2a1e55] w-full min-h-screen">
      {loding ? (
        <Loading />
      ) : (
        <div className="dashboard border-1 border-white min-h-screen rounded-3xl ">
          <div className="box-heading">
            <h2 className="text-4xl text-center font-bold text-white">
              {t("Dashboard")}
            </h2>
          </div>
          <div className="dash-content">
            <div className="person-details flex gap-20">
              <div>
                <div className="person-photo h-50 w-50 bg-zinc-500 rounded-3xl ">
                  <img
                    className="object-cover rounded-3xl w-full h-full"
                    src="data:image/jpeg;base64,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"
                    alt=""
                  />
                </div>
              </div>
              <div className="details text-2xl font-semibold text-white flex flex-col gap-5 self-center">
                <div className="person-name">Name : {data.fullName}</div>
                <div className="person-email">Email : {data.email}</div>
                <div className="person-class">Class : {data.userClass}</div>
              </div>
            </div>
            <div className="scores">
              <div className="heading grid grid-cols-3 font-bold text-2xl text-white">
                <p className="pl-[50px]  text-left">Title</p>
                <p className="text-center">Score</p>

                <p className="pr-[50px] text-right">Detail</p>
              </div>
              {score.map((s, index) => {
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
              })}
              <div className="scores-content"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
