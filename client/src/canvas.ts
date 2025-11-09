import { socket, userId } from "./socket";

const canvas = document.getElementById("main") as HTMLCanvasElement;
const cursorCanvas = document.getElementById("cursors") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const cursorCtx = cursorCanvas.getContext("2d")!;

let drawing = false;
let color = "#000000";
let size = 4;
let tool = "brush";

function resize() {
  canvas.width = cursorCanvas.width = window.innerWidth;
  canvas.height = cursorCanvas.height = window.innerHeight - 48;
}
window.addEventListener("resize", resize);
resize();


canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  drawPoint(e);
});

canvas.addEventListener("mousemove", (e) => {
  sendCursor(e);
  if (drawing) drawPoint(e);
});

canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseleave", () => (drawing = false));

function drawPoint(e: MouseEvent) {
  const x = e.offsetX;
  const y = e.offsetY;

  ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
  ctx.lineWidth = size;
  ctx.lineCap = "round";

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);

  socket.emit("draw", { userId, x, y, color, size, tool });
}

function sendCursor(e: MouseEvent) {
  socket.emit("cursor", { userId, x: e.offsetX, y: e.offsetY });
}


socket.on("draw", (data) => {
  const { x, y, color, size, tool } = data;
  ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
});

const userCursors: Record<string, { x: number; y: number }> = {};

socket.on("cursor", (data) => {
  userCursors[data.userId] = { x: data.x, y: data.y };
  renderCursors();
});

function renderCursors() {
  cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
  for (const id in userCursors) {
    const { x, y } = userCursors[id];
    cursorCtx.fillStyle = "red";
    cursorCtx.beginPath();
    cursorCtx.arc(x, y, 4, 0, Math.PI * 2);
    cursorCtx.fill();
  }
}


(document.getElementById("color") as HTMLInputElement).oninput = (e) =>
  (color = (e.target as HTMLInputElement).value);

(document.getElementById("size") as HTMLInputElement).oninput = (e) =>
  (size = +(e.target as HTMLInputElement).value);

document.getElementById("brush")!.onclick = () => (tool = "brush");
document.getElementById("eraser")!.onclick = () => (tool = "eraser");
