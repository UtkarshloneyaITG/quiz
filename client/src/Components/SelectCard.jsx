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
    <div
      className="w-full min-h-full bg-gradient-to-b from-white via-violet-200 to-purple-400 pb-15 px-4 -mt-20"
      id="cards"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center text-purple-800 mb-12">
        Choose Your Adventure ✨
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <Link key={index} to={card.path}>
            <div className="relative rounded-3xl overflow-hidden shadow-xl group transition-transform transform hover:scale-105 hover:shadow-2xl duration-500">
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
