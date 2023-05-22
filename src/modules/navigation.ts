import { mouse, up, down, right, left } from "@nut-tree/nut-js";
import { Duplex } from "stream";

export function mouseUp(duplex: Duplex, formattedData: string) {
  const value = Number(formattedData.split("mouse_up ")[1]);
  mouse.move(up(value));

  duplex.write(formattedData);
}

export function mouseDown(duplex: Duplex, formattedData: string) {
  const value = Number(formattedData.split("mouse_down ")[1]);
  mouse.move(down(value));

  duplex.write(formattedData);
}

export function mouseLeft(duplex: Duplex, formattedData: string) {
  const value = Number(formattedData.split("mouse_left ")[1]);
  mouse.move(left(value));

  duplex.write(formattedData);
}

export function mouseRight(duplex: Duplex, formattedData: string) {
  const value = Number(formattedData.split("mouse_right ")[1]);
  mouse.move(right(value));

  duplex.write(formattedData);
}

export async function mousePosition(duplex: Duplex) {
  const position = await mouse.getPosition();
  duplex.write(`mouse_position ${position.x},${position.y}`);
}
