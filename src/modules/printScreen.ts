import { mouse, Region, screen } from "@nut-tree/nut-js";
import jimp from "jimp";
import { Duplex } from "stream";

export async function printScreen(duplex: Duplex) {
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

  duplex.write(`prnt_scrn ${base64Image}`);
}
