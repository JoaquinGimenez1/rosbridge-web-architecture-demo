const express = require("express");
const RosHandler = require("./rosHandler");

const app = express();
const expressWs = require("express-ws")(app);

const HOST = process.env.API_HOST || "localhost";
const port = process.env.API_PORT || 5000;

app.use((req, res, next) => {
  // Adding middleware
  req.newHeader = "New header added by middleware";
  next();
});

app.get("/", (req, res) => {
  res.send("Please connect via WS to /api");
});

app.ws("/api", (ws, req) => {
  console.log("Client connected to backend API");

  const rh = new RosHandler();
  rh.subscribeToChatter((rosMessage) => {
    const message = JSON.stringify({
      extra_field: "Added by Express",
      payload: rosMessage,
    });

    ws.send(message);
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
