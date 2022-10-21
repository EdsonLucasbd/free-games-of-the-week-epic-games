import chromium from 'chrome-aws-lambda';
import { addExtra } from 'puppeteer-extra';
const puppeteer = require('puppeteer-extra')
import { getOptions } from './chromiumOptions';
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

// let _page: Page | null;

// async function getPage(isDev: boolean): Promise<Page> {
//   if (_page) {
//     return _page
//   }

//   const puppeteerExtra = addExtra(chromium.puppeteer as any)
//   puppeteerExtra.use(pluginStealth());

//   const options = await getOptions(isDev)
//   const browser = await puppeteerExtra.launch(options)


//   const page = await browser.newPage()

//   return page
// }

export async function searchGame(isDev: boolean) {
  const gamesList = []



  // const puppeteerExtra = addExtra(chromium.puppeteer as any)
  // puppeteerExtra.use(pluginStealth());
  // const options = await getOptions(isDev)
  // const browser = await puppeteerExtra.launch(options)

  puppeteer.use(StealthPlugin())
  const options = await getOptions(isDev)
  const browser = await puppeteer.launch(options);

  const page = await browser.newPage()

  // await page.goto('https://bot.sannysoft.com/', {
  //   waitUntil: 'networkidle0'
  // })
  await page.goto('https://store.epicgames.com/pt-BR/free-games', {
    waitUntil: 'networkidle0'
  })
  // await page.waitForSelector(".css-aere9z > div > a", {
  //   visible: true
  // })

  const allFreeGamesLink = await page.$$eval('.css-aere9z > div > a', (links: HTMLAnchorElement[]) => links.map(link => link.href))
  const allFreeGamesImage = await page.$$eval('.css-aere9z > div > a img', (images: HTMLImageElement[]) => images.map(image => image.src))

  // console.log('links', allFreeGamesLink);

  // for (let image in allFreeGamesImage) {
  //   gamesList[image] = allFreeGamesImage[image]
  // }

  for (const index in allFreeGamesLink) {
    let gameData: Record<string, string | Promise<string>> = {}

    await page.goto(allFreeGamesLink[index], {
      waitUntil: 'networkidle0'
    })

    const name = await page.$eval('.css-1p6kk8h', (element: HTMLSpanElement) => element.innerHTML)
    let expiration

    if ((await page.$('.css-1146xy9 > .css-iqno47 > span')) !== null) {
      expiration = await page.$eval('.css-1146xy9 > .css-iqno47 > span', (element: HTMLSpanElement) => element.innerHTML)
    } else {
      expiration = 'Em Breve'
    }

    const link = page.url()

    gameData['image'] = allFreeGamesImage[index]
    gameData['name'] = name
    gameData['expiration'] = expiration
    gameData['link'] = link

    gamesList.push(gameData)
  }

  console.log(gamesList)

  await browser.close()

  return gamesList;
}
