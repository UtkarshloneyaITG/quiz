import React from "react";
import TournamentPageHeader from "./TournamentPageHeader";
import TournamentPageCard from "./TournamentPageCard";
import TurnamentInfo from "./TurnamentInfo";

function TournamentHeroPage() {
  return (
    <>
      <div className="Tournament-page-wrapper w-[100%] h-[100%] bg-[#c27aff] pl-20 ">
        <div className="h-[calc(100vh_-_60px)] overflow-auto no-scrollbar">
          <TournamentPageHeader />
          <div
            className="weekly-tournaments-page p-10  border-b-2 rounded-2xl"
            id="weekly-tournament"
          >
            <div className="tournament-page-heading text-center font-bold text-2xl">
              <h2>Weekly Tournamnets</h2>
            </div>
            <div className="pt-10 pb-10 p-20 grid grid-cols-3 text-white ">
              <TournamentPageCard
                type="wt"
                date="17/10/2025"
                time="2:30"
                title="html"
                tType="wt"
              />
              <TournamentPageCard
                type="wt"
                date="17/10/2025"
                time="2:30"
                title="html"
                tType="wt"
              />
              <TournamentPageCard
                type="wt"
                date="17/10/2025"
                time="2:30"
                title="html"
                tType="wt"
              />
            </div>
          </div>
          <div
            className="weekly-tournaments-page p-10  border-b-2 rounded-2xl"
            id="new-tournament"
          >
            <div className="tournament-page-heading text-center font-bold text-2xl">
              <h2>New Tournamnets</h2>
            </div>
            <div className="pt-10 pb-10 p-20 grid grid-cols-3 text-white ">
              <TournamentPageCard
                type="nt"
                date="17/10/2025"
                time="2:30"
                title="html"
                tType="nt"
              />
              <TournamentPageCard
                type="nt"
                date="17/10/2025"
                time="2:30"
                title="css"
                tType="nt"
              />
              <TournamentPageCard
                type="nt"
                date="17/10/2025"
                time="2:30"
                title="js"
                tType="nt"
              />
            </div>
            <div className="Tournament-page-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TournamentHeroPage;
