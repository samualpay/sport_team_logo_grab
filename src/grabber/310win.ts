import puppeteer from 'puppeteer'
import { getExtension } from '../common';
import { Image } from '../type/image';
// just for http://info.310win.com

class Grab310win {
    private url: string;
    constructor(url: string) {
        this.url = url
    }
    async findImages(): Promise<Image[]> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(this.url)
        const table = await page.waitForSelector("#div_Table1")
        let results = await table.$$eval("table a", elements => {
            const arr: Array<Image> = []
            for (let i = 0; i < elements.length; i += 2) {
                const src = elements[i].querySelector("img")?.src || ''
                const fileName = elements[i + 1].innerHTML
                if (src !== undefined) {
                    arr.push({ src, fileName, extension: '' })
                }
            }
            return arr
        })
        results = results.map(elem => {
            elem.extension = getExtension(elem.src)
            return elem
        })
        return results
    }
}
export default Grab310win