import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const LiveUser = () => {
  const [liveUsers, setLiveUsers] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onmessage = (event) => {
      setLiveUsers(Number(event.data)); // <-- fix here
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);
  let topWindow = window.innerHeight - 155;
  let rightWindow = window.innerWidth - 200;
  console.log(topWindow);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      drag
      dragConstraints={{
        top: -topWindow,
        left: 10,
        bottom: 1,
        right: rightWindow,
      }}

      className="fixed bottom-3 left-2 py-2 px-3 rounded-3xl z-100 bg-violet-950 text-white liveUser-bar flex items-center gap-2"
    >
      <div className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </div>
      <h2>Active Users : {liveUsers}</h2>
    </motion.div>
  );
};

export default LiveUser;
