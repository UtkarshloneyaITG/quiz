import React from "react";
import TournamentSideBar from "../Components/TournamentSideBar";
import TournamentHeroPage from "../Components/TournamentHeroPage";

function TournamentPage() {
  return (
    <>
      <div className="tournamentPage relative flex justify-between overflow-hidden h-[100%]">
        <TournamentSideBar />
        <TournamentHeroPage />
      </div>
    </>
  );
}

export default TournamentPage;
