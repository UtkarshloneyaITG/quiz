import React from "react";
import { Link } from "react-router-dom";

function TournamentSideBar() {
  return (
    <div className=" bg-purple-800 " style={{ background: "#1C1241" }}>
      <div className="Tournament-s-de-bar-wrapper ">
        <div
          className="w-80 h-160 absolute left-0 top-[-1px] "
          style={{
            clipPath:
              " polygon(100% 0, 100% 45%, 78% 59%, 78% 100%, 0 100%, 0 69%, 0 0)",
            background: "#1c1241",
          }}
        >
          <div className="heading text-white text-[25px] text-center border-b-2 white">
            <h2>TOURNAMENT</h2>
          </div>
          <div>
            <ul className="tournament-side-bar-list text-white flex gap-4 flex-col text-[22px] pl-15 pt-3 pb-3">
              <li>
                <a href="#weekly-tournament">All Tournaments</a>
              </li>
              <li>
                <a href="#new-tournament">New Tournaments</a>
              </li>
              <li>
                {" "}
                <a href="#weekly-tournament">Weekly Tournaments</a>
              </li>
              <li>Practise Tournaments</li>
              <li>Participated In</li>
            </ul>
          </div>
          <div className="p-15 text-white other-tournament-side-bar-list">
            <ul className="flex gap-2 flex-col ">
              <Link to="/leaderboard">
                <li>Leader Board</li>
              </Link>
              <li>Your Rank</li>
              <li>History</li>
            </ul>
          </div>
        </div>
        <div className="w-62.5 h-[100%)] bg-[#1c1241]"></div>
      </div>
    </div>
  );
}

export default TournamentSideBar;
