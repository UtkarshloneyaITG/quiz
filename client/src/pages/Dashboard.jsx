import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { dashboard } from "../servics/api";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [score, setScore] = useState([]);

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
            {score.map((s, index) => {
              return (
                <div className="heading font-bold text-2xl text-white p-3 border-2">
                  Scores :{s.score}
                </div>
              );
            })}

            <div className="scores-content"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
