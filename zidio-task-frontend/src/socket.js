// src/socket.js
import { io } from "socket.io-client";

// Connect to your backend socket server (use 4004 because your backend runs on 4004)
export const socket = io("http://localhost:4004", {
  transports: ["websocket"], // Helps avoid CORS/polling issues
});
