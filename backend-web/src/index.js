const express = require("express");
const RosHandler = require("./rosHandler");

const app = express();
const expressWs = require("express-ws")(app);

const HOST = process.env.API_HOST || "localhost";
const port = process.env.API_PORT || 5000;

app.get("/", (req, res) => {
  res.send("Please connect via WS");
});

app.ws("/", (ws, req) => {
  console.log("Client connected");

  const rh = new RosHandler();
  rh.subscribeToChatter((message) => {
    ws.send(`I just heard: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    rh.unsubscribeToChatter();
  });

  ws.on("message", (msg) => {
    console.log("Message received", msg);
    ws.send(`You said: ${msg}`);
  });
});

app.listen(port, () => {
  console.log(`Backend API listening on http://${HOST}:${port}`);
});
