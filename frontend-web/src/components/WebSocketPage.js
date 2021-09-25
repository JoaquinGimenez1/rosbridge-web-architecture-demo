import React, { useState, useCallback, useMemo, useRef } from "react";
import { Button, Typography, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import useWebSocket, { ReadyState } from "react-use-websocket";

const API_HOST = process.env.API_HOST || "localhost";
const API_PORT = process.env.API_PORT || "5000";
const WEB_SOCKET_URL = `ws://${API_HOST}:${API_PORT}`;

const WebSocketPage = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(WEB_SOCKET_URL);
  const messageHistory = useRef([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("Connection Opened"),
    shouldReconnect: (closeEvent) => true,
  });

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(lastMessage),
    [lastMessage]
  );

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl(WEB_SOCKET_URL),
    []
  );

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

      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleClickChangeSocketUrl}>
          Click Me to change Socket Url
        </Button>
        <Button
          variant="contained"
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Click me to send Hello!
        </Button>
      </Stack>
      <br />
      <Typography>The WebSocket is currently {connectionStatus}</Typography>
      <Typography>
        Status: {connectionStatus === "Open" ? <CheckIcon /> : <CloseIcon />}
      </Typography>
      <Typography>Last message: {lastMessage?.data}</Typography>
      <Typography>Passed messages:</Typography>

      <code></code>

      {messageHistory.current.length && (
        <ul>
          {messageHistory.current.map((message, idx) => (
            <li key={idx}>{message?.data}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WebSocketPage;
