import { io } from "socket.io-client";

export const socket = io();

export const userId = Math.random().toString(36).slice(2); // unique user ID

socket.emit("join", { userId });

socket.on("connect", () => {
  console.log("Connected as user:", userId);
});
