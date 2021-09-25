const express = require("express");
const RosHandler = require("./rosHandler");

const app = express();
const port = process.env.API_PORT || 5000;
const HOST = process.env.API_HOST || "localhost";

app.get("/", (req, res) => {
  RosHandler.subscribeToChatter();

  res.send("Hello World!");
});

app.listen(port, () => {
  RosHandler.subscribeToChatter();

  console.log(`Example app listening at http://${HOST}:${port}`);
});
