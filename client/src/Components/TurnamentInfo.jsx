import React from "react";
import { Link } from "react-router-dom";

function TurnamentInfo({ title, tType, date, time, handleClose }) {
  return (
    <div
      onClick={handleClose}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-full h-full bg-red-500/10 backdrop-blur-md border border-white/20 
               rounded-2xl shadow-2xl flex flex-row justify-center  p-4 z-[999] "
    >
      <div className="flex flex-row gap-4 w-[70%] h-[100%]">
        <div className="flex-[0.6] bg-gradient-to-br from-[#2a0845] to-[#6441a5] rounded-xl p-4 shadow-inner flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-center mb-2 md:mb-4">
              Tournament Rules
            </h2>
            <ul className="list-disc pl-4 md:pl-6 space-y-1 text-gray-100 text-sm md:text-base">
              <li>
                Time limit: <span className="font-semibold">1 hr 30 mins</span>
              </li>
              <li>Tab switching is not allowed</li>
              <li>No pauses or restarts</li>
              <li>Do not refresh or close the window</li>
              <li>All questions carry equal marks</li>
              <li>Negative marking may apply</li>
              <li>Submit before time ends</li>
              <li>Full screen recommended</li>
              <li>System activity is monitored</li>
              <li>Answers can’t be changed after submission</li>
            </ul>
          </div>

          <div className="text-center mt-2 md:mt-4">
            <Link
              to={`/user/tournament/${title}/${tType}`}
              className="bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm md:text-lg px-6 py-2 md:px-8 md:py-2 rounded-lg transition-transform duration-300 hover:scale-105"
            >
              Enter Tournament
            </Link>
          </div>
        </div>

        <div className="flex-[0.4] bg-gradient-to-br from-[#093028] to-[#237a57] rounded-xl p-4 flex flex-col items-center justify-center gap-2 md:gap-4 text-center shadow-inner">
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-lg">
            <img
              src="/images/logo.png"
              alt="Tournament Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1 md:space-y-2 text-xs md:text-lg">
            <p>
              <span className="text-amber-300 font-semibold">Start Time:</span>{" "}
              {time}
            </p>
            <p>
              <span className="text-amber-300 font-semibold">End Time:</span>{" "}
              {time}
            </p>
            <p>
              <span className="text-amber-300 font-semibold">Date:</span> {date}
            </p>
            <p>
              <span className="text-amber-300 font-semibold">Language:</span>{" "}
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurnamentInfo;
