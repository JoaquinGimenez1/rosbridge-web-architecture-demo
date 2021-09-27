const { Ros, Topic } = require("roslib");

const ROS_HOST = process.env.ROS_HOST || "localhost";
const ROS_PORT = process.env.ROS_PORT || "9090";

class RosHandler {
  constructor() {
    this.ros = null;
    this.listener = null;
  }

  connect = () => {
    // Connecting to ROS
    // -----------------
    this.ros = new Ros({ url: `ws://${ROS_HOST}:${ROS_PORT}` });

    this.ros.on("connection", () => {
      console.log("Connected to websocket server.");
    });

    this.ros.on("error", (error) => {
      console.log("Error connecting to websocket server: ", error);
    });

    this.ros.on("close", () => {
      console.log("Connection to websocket server closed.");
    });
  };

  unsubscribeToChatter = () => {
    this.listener.unsubscribe();
    this.listener = null;
  };

  subscribeToChatter = (callback) => {
    // Subscribing to a Topic
    // ----------------------

    this.connect();

    this.listener = new Topic({
      ros: this.ros,
      name: "/chatter",
      messageType: "std_msgs/String",
    });

    this.listener.subscribe((message) => {
      console.log(
        "Received message on " + this.listener.name + ": " + message.data
      );
      callback(message.data);
    });
  };
}

module.exports = RosHandler;
