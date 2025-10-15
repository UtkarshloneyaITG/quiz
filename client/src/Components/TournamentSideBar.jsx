import React from "react";

function TournamentSideBar() {
  return (
    <div>
      <div className="Tournament-s-de-bar-wrapper">
        <div
          className="w-80 h-160 absolute left-0 top-[-1px]"
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
            <ul className="tournament-side-bar-list text-white flex gap-5 flex-col text-[20px] pl-20 pt-5 pb-5">
              <li>All Tournaments</li>
              <li>New Tournaments</li>
              <li>Weekly Tournaments</li>
              <li>Practise Tournaments</li>
              <li>Participated In</li>
            </ul>
          </div>
        </div>
        <div className="w-62.5 h-[80vh] bg-[#1c1241]"></div>
      </div>
    </div>
  );
}

export default TournamentSideBar;
