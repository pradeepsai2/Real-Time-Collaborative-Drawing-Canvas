import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { addDrawEvent, getHistory } from "./drawing-state";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "../../client")));

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send existing drawing to new user
  socket.emit("init", getHistory());

  socket.on("draw", (data) => {
    addDrawEvent(data);
    socket.broadcast.emit("draw", data);
  });

  socket.on("cursor", (data) => {
    socket.broadcast.emit("cursor", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
