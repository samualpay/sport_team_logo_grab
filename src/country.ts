import WikiCountryCode from "./grabber/wikiCountryCode";
import fs from "fs";
import { createFolderIfNotExist } from "./common";
const folder = `${__dirname}/../dump`;
const filePath = `${folder}/country.json`;
async function main() {
  let grabber = new WikiCountryCode("https://zh.wikipedia.org/wiki/ISO_3166-1");
  let result = await grabber.findDatas();
  await createFolderIfNotExist(folder);
  fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
  console.log("done");
  process.exit(0);
}
main();
