FROM osrf/ros:noetic-desktop-full-focal

WORKDIR /

RUN apt update

RUN apt install ros-noetic-rosbridge-suite -y

COPY init-rosbridge.sh .

CMD [".", "init-rosbridge.sh"]