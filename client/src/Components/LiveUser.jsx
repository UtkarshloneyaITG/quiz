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

  return (
    <div className="fixed bottom-3 left-2 py-2 px-3 rounded-3xl z-40 bg-violet-950 text-white liveUser-bar">
      <h2>Live Users Online: {liveUsers}</h2>
    </div>
  );
};

export default LiveUser;
