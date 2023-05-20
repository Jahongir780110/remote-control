import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer } from "ws";
import {
  mouse,
  left,
  right,
  up,
  down,
  Button,
  screen,
  Region,
} from "@nut-tree/nut-js";
import jimp from "jimp";

const HTTP_PORT = 8181;

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {
  console.log("Client connected!");
  ws.send("Connected!");

  ws.on("error", console.error);

  ws.on("message", async function message(data) {
    const formattedData = data.toString("utf-8");

    if (formattedData.startsWith("mouse_up")) {
      const value = Number(formattedData.split("mouse_up ")[1]);
      return mouse.move(up(value));
    }

    if (formattedData.startsWith("mouse_down")) {
      const value = Number(formattedData.split("mouse_down ")[1]);
      return mouse.move(down(value));
    }

    if (formattedData.startsWith("mouse_left")) {
      const value = Number(formattedData.split("mouse_left ")[1]);
      return mouse.move(left(value));
    }

    if (formattedData.startsWith("mouse_right")) {
      const value = Number(formattedData.split("mouse_right ")[1]);
      return mouse.move(right(value));
    }

    if (formattedData.startsWith("mouse_position")) {
      const position = await mouse.getPosition();
      return ws.send(`mouse_position ${position.x},${position.y}`);
    }

    if (formattedData.startsWith("draw_circle")) {
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
        await mouse.move([{ x, y }]);
      }

      return mouse.releaseButton(Button.LEFT);
    }

    if (formattedData.startsWith("draw_rectangle")) {
      const width = Number(
        formattedData.split("draw_rectangle ")[1].split(" ")[0]
      );
      const height = Number(
        formattedData.split("draw_rectangle ")[1].split(" ")[1]
      );

      await mouse.pressButton(Button.LEFT);

      await mouse.move(right(width));
      await mouse.move(down(height));
      await mouse.move(left(width));
      await mouse.move(up(height));

      return mouse.releaseButton(Button.LEFT);
    }

    if (formattedData.startsWith("draw_square")) {
      const length = Number(formattedData.split("draw_square ")[1]);
      await mouse.pressButton(Button.LEFT);

      await mouse.move(right(length));
      await mouse.move(down(length));
      await mouse.move(left(length));
      await mouse.move(up(length));

      return mouse.releaseButton(Button.LEFT);
    }

    if (formattedData.startsWith("prnt_scrn")) {
      const size = 200;
      const position = await mouse.getPosition();
      const x = position.x;
      const y = position.y;

      const region = new Region(x - size / 2, y - size / 2, size, size);

      await screen.highlight(region);

      const image = await screen.grabRegion(region);

      const imgRGB = await image.toRGB();

      const jimpImg = new jimp(imgRGB, (err) => {
        if (err) {
          console.log(err);
        }
      });

      const buffer = await jimpImg.getBufferAsync(jimp.MIME_PNG);
      const base64Image = buffer.toString("base64");

      return ws.send(`prnt_scrn ${base64Image}`);
    }
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
