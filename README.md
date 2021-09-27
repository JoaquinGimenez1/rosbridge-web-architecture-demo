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
yarn start # --build (if needed)

# Cleanup network & images
yarn clean
```

At this point you can visit the UI using your browser `http://localhost:3000`
