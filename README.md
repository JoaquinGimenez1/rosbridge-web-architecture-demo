# ROS Web Scalable Architechture

## Getting Started
This project is it intended to be used as a demo for ...
## How to run it

Terminal 1
- `roslaunch rosbridge_server rosbridge_websocket.launch`

Terminal 2
- 

```bash
cd /directory/to/scalable-web-ros

# Install packages
cd backend-web/
yarn 

cd ../frontend-web/
yarn

# Run all the docker images
yarn start
```

## Installation requirements
- nodejs `v14.17.0`
- docker `v20.10.8`
- docker-compose `v1.25.0`
- yarn `v1.22.10` [optional]
## Cleanup images
```bash
cd /directory/to/scalable-web-ros

yarn clean
```
