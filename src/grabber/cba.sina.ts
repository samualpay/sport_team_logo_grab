import puppeteer from 'puppeteer'
import { Image } from '../type/image';
import { getExtension } from '../common'
class GrabCBASina {
    url: string;
    constructor(url: string) {
        this.url = url
    }
    async findImages(): Promise<Image[]> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(this.url)
        const area = await page.waitForSelector(".teamlist")
        let results = await area.$$eval(".team_li", elements => {
            const arr: Array<Image> = []
            elements.forEach((elem, index) => {
                const src = elem.querySelector<HTMLImageElement>("img")?.src || ''
                const fileName = elem.querySelector("h3 a")?.innerHTML || ''
                if (src) {
                    arr.push({ src, fileName, extension: '' })
                }

            })
            return arr
        })
        results = results.map(elem => {
            elem.extension = getExtension(elem.src)
            return elem
        })
        return results
    }
}
export default GrabCBASina