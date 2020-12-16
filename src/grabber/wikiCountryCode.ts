import puppeteer from "puppeteer";
import { getExtension } from "../common";
import { Country } from "../type/country";
// just for http://info.310win.com

class WikiCountryCode {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }
  //#mw-content-text > div.mw-parser-output > table.wikitable.sortable.jquery-tablesorter
  //#mw-content-text > div.mw-parser-output > table.wikitable.sortable.jquery-tablesorter > tbody > tr:nth-child(1)
  async findDatas(): Promise<Country[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(this.url);
    const table = await page.waitForSelector(
      "#mw-content-text > div.mw-parser-output > table.wikitable.sortable.jquery-tablesorter > tbody"
    );
    let results = await table.$$eval("tr", (elements) => {
      const arr: Array<Country> = [];
      elements.forEach((element) => {
        let name = element.querySelector("td:nth-child(1)")?.innerHTML;
        name = name?.replace("\n", "");
        const code = element.querySelector("td:nth-child(3) > tt")?.innerHTML;
        const nameCN = element.querySelector("td:nth-child(6) > a")?.innerHTML;
        arr.push({ name, code, nameCN });
      });
      return arr;
    });
    return results;
  }
}
export default WikiCountryCode;
