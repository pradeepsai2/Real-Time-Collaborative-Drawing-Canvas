"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const drawing_state_1 = require("./drawing-state");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client")));
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    // Send existing drawing to new user
    socket.emit("init", (0, drawing_state_1.getHistory)());
    socket.on("draw", (data) => {
        (0, drawing_state_1.addDrawEvent)(data);
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
