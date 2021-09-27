import React, { useState, useCallback, useEffect } from "react";
import { Button, Typography, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import useWebSocket, { ReadyState } from "react-use-websocket";
const useStyles = makeStyles({
  button: {
    margin: "10px",
  },
  mainInfo: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-end",
    // justifyContent: "left",
    margin: "10px",
  },
  results: {
    display: "flex",
    flexDirection: "column",
  },
});

const API_HOST = process.env.REACT_APP_API_HOST || "localhost";
const API_PORT = process.env.REACT_APP_API_PORT || "5000";
const WEB_SOCKET_URL = `ws://${API_HOST}:${API_PORT}/api`;

const WebSocketPage = () => {
  const classes = useStyles();
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    WEB_SOCKET_URL,
    {
      onOpen: () => console.log("Connection to Backend API opened"),
      shouldReconnect: (closeEvent) => true,
    }
  );

  useEffect(() => {
    setMessageHistory((prevArray) => [lastMessage, ...prevArray]);
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <Typography variant="h4">Frontend of the project</Typography>

      <Divider />

      <Button
        className={classes.button}
        variant="contained"
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click me to send Hello!
      </Button>

      <Divider />

      <div className={classes.mainInfo}>
        <Typography>
          Status: {connectionStatus === "Open" ? <CheckIcon /> : <CloseIcon />}
        </Typography>
        <Typography>The WebSocket is currently {connectionStatus}</Typography>

        <Divider />

        <Typography>Last message: {lastMessage?.data}</Typography>

        <Divider />

        <Typography>Messages list:</Typography>
      </div>

      {messageHistory.length && (
        <>
          {messageHistory.map((message, idx) => (
            <div key={idx}>
              <code>
                Message #{messageHistory.length - idx}, Data: {message?.data}
              </code>
              <br />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default WebSocketPage;
