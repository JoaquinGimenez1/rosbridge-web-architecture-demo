# ROS Web Scalable Architechture

## Getting Started
This project is intended to be used as a demo for a proposed architecture when 

## Installation requirements
- docker `v20.10.8` [installation](https://docs.docker.com/engine/install/ubuntu/)
- docker-compose `v1.25.0` [installation](https://docs.docker.com/compose/install/)
- nodejs `v14.17.0` [installation](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
- yarn `v1.22.10` [isntallation](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

### Install Instructions
```bash
cd /directory/to/scalable-web-ros
# Install frontend-web packages
cd frontend-web/
yarn

# Install backend-api packages
cd ../backend-api/
yarn
```

## How to run it
```bash
cd /directory/to/scalable-web-ros

# Start project
docker-compose up # --build (if needed)
```
### Summary
At this point you should have: 
- Rosbridge server running on `ws://localhost:9090`
- ROS node by rosnodejs publishing messages to the topic `/chatter`
- Express.js API backend ready to accept websocket connections on `ws://localhost:5000` and listen to ros topics on port `9090`
- React frontend connecting via websocket to the API backend on port `5000` (not directly connected to ROS)
