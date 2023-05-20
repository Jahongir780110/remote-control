import { mouse, up, down, right, left } from "@nut-tree/nut-js";

export function mouseUp(formattedData) {
  const value = Number(formattedData.split("mouse_up ")[1]);
  mouse.move(up(value));

  ws.send(formattedData);
}

export function mouseDown(formattedData) {
  const value = Number(formattedData.split("mouse_down ")[1]);
  mouse.move(down(value));

  return ws.send(formattedData);
}

export function mouseLeft(formattedData) {
  const value = Number(formattedData.split("mouse_left ")[1]);
  mouse.move(left(value));

  return ws.send(formattedData);
}

export function mouseRight(formattedData) {
  const value = Number(formattedData.split("mouse_right ")[1]);
  mouse.move(right(value));

  return ws.send(formattedData);
}

export async function mousePosition() {
  const position = await mouse.getPosition();
  return ws.send(`mouse_position ${position.x},${position.y}`);
}
