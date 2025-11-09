type RoomData = {
  users: string[];
  history: any[]; // Stores draw events
};

const rooms: Record<string, RoomData> = {};

export function createRoom(roomId: string) {
  if (!rooms[roomId]) {
    rooms[roomId] = { users: [], history: [] };
  }
  return rooms[roomId];
}

export function joinRoom(roomId: string, userId: string) {
  const room = createRoom(roomId);
  if (!room.users.includes(userId)) {
    room.users.push(userId);
  }
  return room;
}

export function leaveRoom(roomId: string, userId: string) {
  const room = rooms[roomId];
  if (!room) return;
  room.users = room.users.filter((id) => id !== userId);
}

export function addEventToRoom(roomId: string, event: any) {
  createRoom(roomId).history.push(event);
}

export function getRoomHistory(roomId: string) {
  return createRoom(roomId).history;
}
