const express = require("express");
const RosHandler = require("./rosHandler");

const app = express();
const expressWs = require("express-ws")(app);

const port = process.env.API_PORT || 5000;
const HOST = process.env.API_HOST || "localhost";

app.get("/", (req, res) => {
  // console.log("Get Router", req.testing);

  // console.log("CLIENTS", expressWs.getWss());
  res.send("Please connect via WS");
});

app.ws("/", (ws, req) => {
  console.log("Client connected");
  // try {
  //   RosHandler.subscribeToChatter();
  // } catch (error) {
  //   console.log("Error", error.message);
  // }
  RosHandler.subscribeToChatter((message) => {
    ws.send(`I just heard: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    RosHandler.unsubscribeToChatter();
  });

  ws.on("message", (msg) => {
    console.log("Message received", msg);
    ws.send(`You said: ${msg}`);
  });
  // console.log("socket", req.testing);
});

app.listen(port, () => {
  console.log(`Example app listening at http://${HOST}:${port}`);
});
