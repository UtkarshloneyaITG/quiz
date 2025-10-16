import { motion } from "framer-motion";
import React from "react";

function TournamentPageHeader() {
  let Notification = false; // use for notification if the notification is true then bell animetion triggers
  return (
    <div>
      <div className="Tournament-page-header absolute top-0 right-0">
        <div className="flex align-center justify-end">
          <div className="flex align-center justify-end bg-[#1c1241] w-fit rounded-bl-3xl">
            <div className="notification w-10 h-10 bg-[#1c1241] p-2 rounded-bl-3xl border-l-2 border-white">
              <motion.img
                src="/images/notification-ring-svgrepo-com.svg"
                alt="notification "
                className="w-[100%] h-[100%]"
                initial={{ rotate: 0 }}
                animate={{ rotate: [10, -10, 0] }}
                transition={{
                  duration: 0.3,
                  repeat: Notification ? Infinity : 0,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="tournamentPage-rank bg-[#1c1241] p-2 border-l-2 border-white rounded-bl-3xl text-white">
              #01
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TournamentPageHeader;
