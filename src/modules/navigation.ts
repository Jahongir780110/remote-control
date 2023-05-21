import { mouse, up, down, right, left } from "@nut-tree/nut-js";
import { WebSocket } from "ws";

export function mouseUp(ws: WebSocket, formattedData: string) {
  const value = Number(formattedData.split("mouse_up ")[1]);
  mouse.move(up(value));

  ws.send(formattedData);
}

export function mouseDown(ws: WebSocket, formattedData: string) {
  const value = Number(formattedData.split("mouse_down ")[1]);
  mouse.move(down(value));

  ws.send(formattedData);
}

export function mouseLeft(ws: WebSocket, formattedData: string) {
  const value = Number(formattedData.split("mouse_left ")[1]);
  mouse.move(left(value));

  ws.send(formattedData);
}

export function mouseRight(ws: WebSocket, formattedData: string) {
  const value = Number(formattedData.split("mouse_right ")[1]);
  mouse.move(right(value));

  ws.send(formattedData);
}

export async function mousePosition(ws: WebSocket) {
  const position = await mouse.getPosition();
  ws.send(`mouse_position ${position.x},${position.y}`);
}
