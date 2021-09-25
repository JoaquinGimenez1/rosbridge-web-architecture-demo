# ROS Web Scalable Architechture

## Getting Started
This project is intended to be used as a demo for a proposed architecture when 

## Installation requirements
- ros-noetic-desktop-full `v14.17.0` [installation](http://wiki.ros.org/noetic/Installation/Ubuntu)
- rosbridge-server [installation](http://wiki.ros.org/rosbridge_suite/Tutorials/RunningRosbridge)
- nodejs `v14.17.0` [installation](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
- yarn `v1.22.10` [isntallation](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

## How to run it
**Note:** This project needs **four** terminals to run sucessfully.

### Terminal 1 - Rosbridge server
```bash
source /opt/ros/noetic/setup.bash
# Launch rosbridge_server
roslaunch rosbridge_server rosbridge_websocket.launch
```
> Check for the following messages in the console 
> `Rosbridge WebSocket server started at ws://0.0.0.0:9090`

### Terminal 2 - Rosnodejs talker
```bash
cd /directory/to/scalable-web-ros
cd ros-talker/
# Install packages
yarn
# Run the ros node
yarn start
```
> Check for the following messages in the console
> `(ros): Connected to master at http://localhost:11311!`

### Terminal 3 - Express backend
```bash
cd /directory/to/scalable-web-ros
cd backend-web/
# Install packages
yarn
# Run the API backend
yarn start
```
> Check for the following messages in the console
> `Backend API listening on http://localhost:5000` 

### Terminal 4 - React frontend
```bash
cd /directory/to/scalable-web-ros
cd frontend-web/
# Install packages
yarn
# Run the frontend
yarn start
```
> Succesfull start of the frontend project will result with a new open window in your browser
