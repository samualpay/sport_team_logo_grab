import puppeteer from 'puppeteer'
import Downloader from './downloader'
import Grab310win from './grabber/310win'
import GrabCBASina from './grabber/cba.sina'
import GrabNBASina from './grabber/nba.sina'

const footballUrls = [
    {
        url: 'http://info.310win.com/cn/TeamHeadPage/36.html',
        folder: '英超'
    },
    {
        url: 'http://info.310win.com/cn/TeamHeadPage/31.html',
        folder: '西甲'
    },
    {
        url: 'http://info.310win.com/cn/TeamHeadPage/8.html',
        folder: '德甲'
    },
    {
        url: 'http://info.310win.com/cn/TeamHeadPage/34.html',
        folder: '意甲'
    },
    {
        url: 'http://info.310win.com/cn/TeamHeadPage/11.html',
        folder: '法甲'
    }
]

const nbaUrl = 'https://slamdunk.sports.sina.com.cn/teams'
const cbaUrl = 'http://cba.sports.sina.com.cn/cba/team/all/'

async function main() {
    try {
        let footballTeams = await Promise.all(footballUrls.map(async (url) => {
            return { images: await new Grab310win(url.url).findImages(), folder: url.folder }
        }))
        let nbaTeams = { images: await new GrabNBASina(nbaUrl).findImages(), folder: 'NBA' }
        let cbaTeams = { images: await new GrabCBASina(cbaUrl).findImages(), folder: 'CBA' }
        footballTeams.push(nbaTeams)
        footballTeams.push(cbaTeams)
        await Promise.all(footballTeams.map(async team => {
            await new Downloader(team.images, team.folder).run()
        }))
        console.log("end")
    } catch (err) {
        console.log(err)
    }

}
main()