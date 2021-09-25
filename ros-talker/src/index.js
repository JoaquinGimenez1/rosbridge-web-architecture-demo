#!/usr/bin/env node
const rosnodejs = require("rosnodejs");
const stdMsgs = rosnodejs.require("std_msgs").msg;

const ROS_HOST = process.env.ROS_HOST || "localhost";
const ROS_PORT = process.env.ROS_PORT || "11311";

const startTalker = () => {
  rosnodejs
    .initNode("/talker_node", {
      rosMasterUri: `http://${ROS_HOST}:${ROS_PORT}`,
      // onTheFly allows to generate message without catkin?
      onTheFly: true,
    })
    .then((rosNode) => {
      let pub = rosNode.advertise("/chatter", stdMsgs.String);
      const msg = new stdMsgs.String();

      setInterval(() => {
        // Construct the message
        msg.data = `Right now it is ${new Date().toISOString()}`;
        // Publish over ROS
        pub.publish(msg);
        // Log through stdout and /rosout
        rosnodejs.log.info("I said: [" + msg.data + "]");
      }, 2000);
    })
    .catch((error) => {
      rosnodejs.log.error("Error!", error.message);
      console.log("Some error occured!", error.message);
    });
};

/* istanbul ignore next */
if (require.main === module) startTalker();
