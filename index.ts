import { WebSocketServer, createWebSocketStream } from "ws";

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

  const duplex = createWebSocketStream(ws, { decodeStrings: false });

  duplex.on("data", async (data) => {
    const formattedData = data.toString("utf8");

    if (formattedData.startsWith("mouse_up")) {
      return navigationFunctions.mouseUp(duplex, formattedData);
    }

    if (formattedData.startsWith("mouse_down")) {
      return navigationFunctions.mouseDown(duplex, formattedData);
    }

    if (formattedData.startsWith("mouse_left")) {
      return navigationFunctions.mouseLeft(duplex, formattedData);
    }

    if (formattedData.startsWith("mouse_right")) {
      return navigationFunctions.mouseRight(duplex, formattedData);
    }

    if (formattedData.startsWith("mouse_position")) {
      return navigationFunctions.mousePosition(duplex);
    }

    if (formattedData.startsWith("draw_circle")) {
      return drawingFunctions.drawCircle(duplex, formattedData);
    }

    if (formattedData.startsWith("draw_rectangle")) {
      return drawingFunctions.drawRectangle(duplex, formattedData);
    }

    if (formattedData.startsWith("draw_square")) {
      return drawingFunctions.drawSquare(duplex, formattedData);
    }

    if (formattedData.startsWith("prnt_scrn")) {
      return printScreenFunctions.printScreen(duplex);
    }
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
