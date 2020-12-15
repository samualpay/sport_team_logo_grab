import puppeteer from "puppeteer";
import { Image } from "../type/image";
import { getExtension } from "../common";
class GrabNBASina {
  url: string;
  constructor(url: string) {
    this.url = url;
  }
  async findImages(): Promise<Image[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(this.url);
    await page.waitForSelector(".team-area-leave2");

    let results = await page.$$eval(".team-area-list_info", (elements) => {
      const arr: Array<Image> = [];
      elements.forEach((elem, index) => {
        const src = elem.querySelector<HTMLImageElement>("img")?.src || "";
        const fileName1 =
          elem.querySelector(".team-area-name_1")?.innerHTML || "";
        const fileName2 =
          elem.querySelector(".team-area-name_2")?.innerHTML || "";
        if (src) {
          arr.push({
            src,
            fileName: `${fileName1}(${fileName2})`,
            extension: "",
          });
        }
      });
      return arr;
    });
    results = results.map((elem) => {
      elem.extension = getExtension(elem.src);
      return elem;
    });
    return results;
  }
}
export default GrabNBASina;
