"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = createRoom;
exports.joinRoom = joinRoom;
exports.leaveRoom = leaveRoom;
exports.addEventToRoom = addEventToRoom;
exports.getRoomHistory = getRoomHistory;
const rooms = {};
function createRoom(roomId) {
    if (!rooms[roomId]) {
        rooms[roomId] = { users: [], history: [] };
    }
    return rooms[roomId];
}
function joinRoom(roomId, userId) {
    const room = createRoom(roomId);
    if (!room.users.includes(userId)) {
        room.users.push(userId);
    }
    return room;
}
function leaveRoom(roomId, userId) {
    const room = rooms[roomId];
    if (!room)
        return;
    room.users = room.users.filter((id) => id !== userId);
}
function addEventToRoom(roomId, event) {
    createRoom(roomId).history.push(event);
}
function getRoomHistory(roomId) {
    return createRoom(roomId).history;
}
