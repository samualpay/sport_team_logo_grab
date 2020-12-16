import { OpenCC } from "opencc";
import fs from "fs";
import { Country } from "./type/country";
import { createFolderIfNotExist } from "./common";
const converter: OpenCC = new OpenCC("t2s.json");
const countryJsonPath = `${__dirname}/../dump/country.json`;
const writeFolder = `${__dirname}/../dump`;
const writePath = `${writeFolder}/country-simple.json`;
async function readCountry(): Promise<Country[]> {
  let result: Country[] = [];
  let str: string = await new Promise<string>((reslove, reject) => {
    fs.readFile(countryJsonPath, { encoding: "utf8" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        reslove(data);
      }
    });
  });
  result = JSON.parse(str);
  return result;
}
async function transfer(countrys: Country[]): Promise<Country[]> {
  let result: Country[] = [];
  result = countrys.map((elem) => {
    if (elem.nameCN) elem.nameCN = converter.convertSync(elem.nameCN);
    return elem;
  });
  return result;
}
async function save(countrys: Country[]) {
  await createFolderIfNotExist(writeFolder);
  return new Promise<void>((reslove, rejects) => {
    fs.writeFile(
      writePath,
      JSON.stringify(countrys, null, 2),
      { encoding: "utf8" },
      (err) => {
        if (err) {
          rejects(err);
        } else {
          reslove();
        }
      }
    );
  });
}
async function main() {
  let countrys = await readCountry();
  countrys = await transfer(countrys);
  await save(countrys);
  console.log("done");
  process.exit(0);
}
main();
