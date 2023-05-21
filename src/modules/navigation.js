import { mouse, up, down, right, left } from "@nut-tree/nut-js";

export function mouseUp(ws, formattedData) {
  const value = Number(formattedData.split("mouse_up ")[1]);
  mouse.move(up(value));

  ws.send(formattedData);
}

export function mouseDown(ws, formattedData) {
  const value = Number(formattedData.split("mouse_down ")[1]);
  mouse.move(down(value));

  ws.send(formattedData);
}

export function mouseLeft(ws, formattedData) {
  const value = Number(formattedData.split("mouse_left ")[1]);
  mouse.move(left(value));

  ws.send(formattedData);
}

export function mouseRight(ws, formattedData) {
  const value = Number(formattedData.split("mouse_right ")[1]);
  mouse.move(right(value));

  ws.send(formattedData);
}

export async function mousePosition(ws) {
  const position = await mouse.getPosition();
  ws.send(`mouse_position ${position.x},${position.y}`);
}
