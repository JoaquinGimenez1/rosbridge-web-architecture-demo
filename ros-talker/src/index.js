#!/usr/bin/env node

const rosnodejs = require("rosnodejs");
const std_msgs = rosnodejs.require("std_msgs").msg;

const talker = () => {
  rosnodejs.initNode("/talker_node").then((rosNode) => {
    let pub = rosNode.advertise("/chatter", std_msgs.String);
    let count = 0;
    const msg = new std_msgs.String();

    setInterval(() => {
      // Construct the message
      msg.data = "hello world " + count;
      // Publish over ROS
      pub.publish(msg);
      // Log through stdout and /rosout
      rosnodejs.log.info("I said: [" + msg.data + "]");
      ++count;
    }, 1000);
  });
};

/* istanbul ignore next */
if (require.main === module) talker();
