import { getOptions } from './chromiumOptions';
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')


export async function searchGame(isDev: boolean) {
  const gamesList = []

  puppeteer.use(StealthPlugin())
  const options = await getOptions(isDev)
  const browser = await puppeteer.launch(options);

  const page = await browser.newPage()

  await page.goto('https://store.epicgames.com/pt-BR/free-games', {
    waitUntil: 'networkidle0'
  })

  const allFreeGamesLink = await page.$$eval('.css-aere9z > div > a', (links: HTMLAnchorElement[]) => links.map(link => link.href))
  const allFreeGamesImage = await page.$$eval('.css-aere9z > div > a img', (images: HTMLImageElement[]) => images.map(image => image.src))

  for (const index in allFreeGamesLink) {
    let gameData: Record<string, string | Promise<string>> = {}

    await page.goto(allFreeGamesLink[index], {
      waitUntil: 'networkidle0'
    })

    let name
    if ((await page.$('.css-1p6kk8h')) !== null) {
      name = await page.$eval('.css-1p6kk8h', (element: HTMLSpanElement) => element.innerHTML)
    } else if ((await page.$('.css-j00jcq')) !== null) {
      name = await page.$eval('.css-j00jcq', (element: HTMLSpanElement) => element.innerHTML)
    } else {
      name = '...'
    }

    const checkIsFreeNow = async (): Promise<string> => {
      let buttonText = 'none', expiration = 'none'
      if ((await page.$("[data-testid='purchase-cta-button']  span span") !== null)) {
        buttonText = await page.$eval("[data-testid='purchase-cta-button']  span span", (element: HTMLSpanElement) => element.innerHTML)
      }

      if (buttonText === "Compre agora" || buttonText === "Em breve") {
        return expiration = 'Em Breve'
      }

      if ((await page.$('.css-1146xy9 > .css-iqno47 > span')) !== null) {
        expiration = await page.$eval('.css-1146xy9 > .css-iqno47 > span', (element: HTMLSpanElement) => element.innerHTML)
      } else if ((await page.$('.css-1146xy9 > .css-1j3k4tr > span')) !== null) {
        expiration = await page.$eval('.css-1146xy9 > .css-1j3k4tr > span', (element: HTMLSpanElement) => element.innerHTML)
      }

      return expiration
    }

    let gameExpiration = await checkIsFreeNow()

    const link = page.url()

    gameData['image'] = allFreeGamesImage[index]
    gameData['name'] = name
    gameData['expiration'] = gameExpiration
    gameData['link'] = link

    gamesList.push(gameData)
  }

  console.log(gamesList)

  await browser.close()

  return gamesList;
}
