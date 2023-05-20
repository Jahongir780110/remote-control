import { mouse, Button } from "@nut-tree/nut-js";

export async function drawCircle(formattedData) {
  const radius = Number(formattedData.split("draw_circle ")[1]);
  const position = await mouse.getPosition();
  const centerX = position.x;
  const centerY = position.y;

  mouse.setPosition({ x: centerX + radius, y: centerY });
  await mouse.pressButton(Button.LEFT);

  for (let angle = 0; angle < 360; angle++) {
    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((angle * Math.PI) / 180);

    mouse.config.mouseSpeed = 800;
    await mouse.move({ x, y });
  }

  mouse.releaseButton(Button.LEFT);
  return ws.send(formattedData);
}

export async function drawRectangle(formattedData) {
  const width = Number(formattedData.split("draw_rectangle ")[1].split(" ")[0]);
  const height = Number(
    formattedData.split("draw_rectangle ")[1].split(" ")[1]
  );

  await mouse.pressButton(Button.LEFT);

  await mouse.move(right(width));
  await mouse.move(down(height));
  await mouse.move(left(width));
  await mouse.move(up(height));

  mouse.releaseButton(Button.LEFT);
  return ws.send(formattedData);
}

export async function drawSquare(formattedData) {
  const length = Number(formattedData.split("draw_square ")[1]);
  await mouse.pressButton(Button.LEFT);

  await mouse.move(right(length));
  await mouse.move(down(length));
  await mouse.move(left(length));
  await mouse.move(up(length));

  mouse.releaseButton(Button.LEFT);
  return ws.send(formattedData);
}
