#!/usr/bin/env node
const rosnodejs = require("rosnodejs");

const ROS_HOST = process.env.ROS_HOST || "localhost";
const ROS_PORT = process.env.ROS_PORT || "11311";

const talker = () => {
  rosnodejs
    .initNode("/talker_node", {
      rosMasterUri: `http://${ROS_HOST}:${ROS_PORT}`,
      // onTheFly allows to generate message without catkin?
      onTheFly: true,
    })
    .then((rosNode) => {
      // rosnodejs.loadAllPackages();
      // Need to require message AFTER the node has been initialized
      // Ref: https://github.com/RethinkRobotics-opensource/rosnodejs#generating-messages
      const stdMsgs = rosnodejs.require("std_msgs");

      let pub = rosNode.advertise("/chatter", stdMsgs.String);
      // let count = 0;
      const msg = new stdMsgs.String();

      setInterval(() => {
        // Construct the message
        msg.data = `Today is ${new Date().toISOString()}`;
        // Publish over ROS
        pub.publish(msg);
        // Log through stdout and /rosout
        rosnodejs.log.info("I said: [" + msg.data + "]");
        // ++count;
      }, 2000);
    })
    .catch((error) => {
      console.log("Some error occured!", error.message);
    });
};

/* istanbul ignore next */
if (require.main === module) talker();
