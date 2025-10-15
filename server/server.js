const http = require("http");
const WebSocket = require("ws");
const errorHandler = require("./src/middleWare/errorHandler");
const { app ,appSetup } = require("./src/index");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoConnect = require("./src/db/db");


dotenv.config();

// Connect MongoDB
mongoConnect();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

let liveUsers = 0;

wss.on("connection", (ws) => {
  liveUsers++;
  broadcastLiveUsers();

  ws.on("close", () => {
    liveUsers--;
    broadcastLiveUsers();
  });
});

function broadcastLiveUsers() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(String(liveUsers));
    }
  });
}

app.use(errorHandler);

appSetup(app);

// Global error handler


// Serve frontend build
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
