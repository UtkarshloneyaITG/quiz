import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SelectCard = () => {
  const { t } = useTranslation();

  const cards = [
    {
      path: "/tournament",
      title: t("📝 Tournament"),
      image: "/images/tournament.png",
    },
    {
      path: "/test",
      title: t("📝 Practice Quiz"),
      image: "/images/5690878.jpg",
    },
    {
      path: "/dashboard",
      title: t("📊 Dashboard"),
      image: "/images/59254.jpg",
    },
  ];

  return (
    <div className="absolute w-full -bottom-100 bg-gradient-to-b from-white via-violet-300 to-purple-400 pt-10 pb-10" id="cards">
      <div className="card-list flex gap-20 justify-center">
        <Link to="/tournament">
          <div className="card w-90 h-80 rounded-3xl relative">
            <div className="bg-image w-full h-full rounded-3xl">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-md p-5 rounded-b-3xl">
                <h3 className="text-xl md:text-2xl font-extrabold text-purple-800 text-center">
                  {card.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SelectCard;
