import { resolve } from "path";
import { Image } from "./type/image";
import fs = require("fs");
import Axios from "axios";
import { Readable } from "stream";
class Downloader {
  images: Image[];
  folder: string;
  constructor(images: Image[], folder: string) {
    this.images = images;
    this.folder = `${__dirname}/../images/${folder}`;
    fs.createReadStream;
  }
  async run() {
    this.images.map(async (image) => {
      if (!fs.existsSync(this.folder)) {
        fs.mkdirSync(this.folder, { recursive: true });
      }
      const path = resolve(this.folder, `${image.fileName}.${image.extension}`);
      const writer = fs.createWriteStream(path);
      const response = await Axios.get<Readable>(image.src, {
        responseType: "stream",
      });
      response.data.pipe(writer);
      return new Promise((res, rej) => {
        writer.on("finish", res);
        writer.on("error", rej);
      });
    });
  }
}
export default Downloader;
