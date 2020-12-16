import fs from "fs";
export function getExtension(url: string): string {
  try {
    return url.substr(url.lastIndexOf(".") + 1);
  } catch (err) {
    return "";
  }
}
export async function createFolderIfNotExist(folder: string): Promise<void> {
  if (!fs.existsSync(folder)) {
    return new Promise<void>((reslove, reject) => {
      fs.mkdir(folder, { recursive: true }, (err) => {
        if (err) {
          reject(err);
        } else {
          reslove();
        }
      });
    });
  }
}
