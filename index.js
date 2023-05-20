import { WebSocketServer } from "ws";

import { httpServer } from "./src/http_server/index.js";

import * as navigationFunctions from "./src/modules/navigation.js";
import * as drawingFunctions from "./src/modules/drawing.js";
import * as printScreenFunctions from "./src/modules/printScreen.js";

const HTTP_PORT = 8181;

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {
  console.log("Client connected!");
  ws.send("Connected!");

  ws.on("error", console.error);

  ws.on("message", async function message(data) {
    const formattedData = data.toString("utf-8");

    if (formattedData.startsWith("mouse_up")) {
      return navigationFunctions.mouseUp(formattedData);
    }

    if (formattedData.startsWith("mouse_down")) {
      return navigationFunctions.mouseDown(formattedData);
    }

    if (formattedData.startsWith("mouse_left")) {
      return navigationFunctions.mouseLeft(formattedData);
    }

    if (formattedData.startsWith("mouse_right")) {
      return navigationFunctions.mouseRight(formattedData);
    }

    if (formattedData.startsWith("mouse_position")) {
      return navigationFunctions.mousePosition();
    }

    if (formattedData.startsWith("draw_circle")) {
      return drawingFunctions.drawCircle(formattedData);
    }

    if (formattedData.startsWith("draw_rectangle")) {
      return drawingFunctions.drawRectangle(formattedData);
    }

    if (formattedData.startsWith("draw_square")) {
      return drawingFunctions.drawSquare(formattedData);
    }

    if (formattedData.startsWith("prnt_scrn")) {
      return printScreenFunctions.printScreen();
    }
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
