const http = require('http');
const WebSocket = require('ws');
const mongoConnect = require("./src/db/db");
const errorHandler = require("./src/middleWare/errorHandler");
const app = require('./src/index');

mongoConnect();

const PORT = 5000;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

let liveUsers = 0;

wss.on('connection', (ws) => {
  liveUsers++;
  broadcastLiveUsers();

  ws.on('close', () => {
    liveUsers--;
    broadcastLiveUsers();
  });
});

function broadcastLiveUsers() {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(String(liveUsers));
    }
  });
}

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
