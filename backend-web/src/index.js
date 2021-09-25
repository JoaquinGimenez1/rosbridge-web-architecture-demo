const express = require("express");
const RosHandler = require("./rosHandler");

const app = express();
const expressWs = require("express-ws")(app);

const port = process.env.API_PORT || 5000;
const HOST = process.env.API_HOST || "localhost";

app.use((req, res, next) => {
  console.log("Middleware");
  req.testing = "testing";
  return next();
});

app.get("/", (req, res) => {
  console.log("Get Router", req.testing);

  console.log("CLIENTS", expressWs.getWss().clients);

  res.send("Hello World!");
});

app.ws("/", (ws, req) => {
  ws.on("connection", () => {
    console.log("someone conected");
  });

  ws.on("message", (msg) => {
    try {
      RosHandler.subscribeToChatter();
    } catch (error) {
      console.log("Error", error.message);
    }

    console.log("msg", msg);
  });
  console.log("socket", req.testing);
});

app.listen(port, () => {
  console.log(`Example app listening at http://${HOST}:${port}`);
});
