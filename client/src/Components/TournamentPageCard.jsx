import React from "react";

function TournamentPageCard({ title, type, date, time }) {
  return (
    <div>
      <div className="weekly-tournaments-page-card bg-gradient-to-r from-purple-500 to-purple-900 w-fit p-5 rounded-2xl relative shadow-[#0007] shadow-2xl border-2 border-purple-600">
        <div className="w-50 h-50">
          <img
            src="/images/Questions-bro.svg"
            alt="weekly tournament card-image"
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div className="weekly-tournaments-page-card-title  w-[100%] p-3 absolute left-0 bottom-0 rounded-b-xl text-center z-10 bg-gradient-to-r from-emerald-500 to-emerald-900">
          {type == "wt" ? `Tournament : #01 ${title} ` : title}
          <div className="weekly-tournaments-page-card-rules pt-3 text-[10px] ">
            <h3>RULES</h3>
            {type == "wt" ? (
              <ul className="text-left text-white">
                <li>Time limit: 1 hr 30 mins</li>
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
            ) : (
              <ul className="text-left text-white">
                <li>You have only one attempt to participate.</li>
                <li>
                  Once started, the attempt cannot be paused or restarted.
                </li>
                <li>
                  Follow all on-screen and organizer instructions carefully.
                </li>
                <li>
                  Unfair means or multiple logins will lead to disqualification.
                </li>
                <li>Do not share or leak tournament content.</li>
                <li>Report any technical issue to organizers immediately.</li>
              </ul>
            )}
          </div>
        </div>
        {type == "wt" ? (
          <div className="time absolute top-[50%] left-[50%] text-white text-2xl text-bold transform translate-[-50%] bg-[#0005] rounded-xl w-fit">
            <div>
              <span>{date}</span>
              <p> at :- {time}</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TournamentPageCard;
