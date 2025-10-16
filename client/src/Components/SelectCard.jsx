import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SelectCard = () => {
  const { t } = useTranslation();

  return (
    <div className="absolute w-full -bottom-100 bg-gradient-to-b from-white via-violet-300 to-purple-400 pt-10 pb-10" id="cards">
      <div className="card-list flex gap-20 justify-center">
        <Link to="/tournament">
          <div className="card w-90 h-80 rounded-3xl relative">
            <div className="bg-image w-full h-full rounded-3xl">
              <img
                className="rounded-3xl w-full h-full"
                src="/images/tournament.png"
              />
            </div>
            <div className="content bg-white rounded-3xl absolute w-full bottom-0">
              <h3 className="text-black font-bold text-3xl text-center">
                {t("📝 Tournament")}
              </h3>
            </div>
          </div>
        </Link>
        <Link to="/test">
          <div className="card w-90 h-80 rounded-3xl relative">
            <div className="bg-image w-full h-full rounded-3xl">
              <img
                className="rounded-3xl w-full h-full"
                src="/images/5690878.jpg"
              />
            </div>
            <div className="content bg-white rounded-3xl absolute w-full bottom-0">
              <h3 className="text-black font-bold text-3xl text-center">
                {t("📝 Practise Quiz")}
              </h3>
            </div>
          </div>
        </Link>
        <Link to={"/dashboard"}>
          <div className="card w-90 h-80 rounded-3xl relative">
            <div className="bg-image w-full h-80 ">
              <img
                className="rounded-3xl h-full w-full"
                src="/images/59254.jpg"
              />
            </div>
            <div className="content  bg-white rounded-3xl absolute w-full bottom-0">
              <h3 className="text-black font-bold text-3xl text-center">
                {t("📊 Dashboard")}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SelectCard;