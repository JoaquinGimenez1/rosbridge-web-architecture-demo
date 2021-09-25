const { Ros, Topic } = require("roslib");

const ROS_PORT = process.env.ROS_PORT || "localhost";
const ROS_HOST = process.env.ROS_HOST || "9090";

module.exports = {
  subscribeToChatter: async () => {
    // Connecting to ROS
    // -----------------
    const ros = new Ros({ url: `ws://${ROS_HOST}:${ROS_PORT}` });

    ros.on("connection", () => {
      console.log("Connected to websocket server.");
    });

    ros.on("error", (error) => {
      console.log("Error connecting to websocket server: ", error);
    });

    ros.on("close", () => {
      console.log("Connection to websocket server closed.");
    });

    // Subscribing to a Topic
    // ----------------------
    const listener = new Topic({
      ros: ros,
      name: "/chatter",
      messageType: "std_msgs/String",
    });

    listener.subscribe((message) => {
      console.log("Received message on " + listener.name + ": " + message.data);
      listener.unsubscribe();
    });
  },
};
