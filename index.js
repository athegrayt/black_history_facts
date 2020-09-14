const puppeteer = require('puppeteer')
const bhParse = require('./bhParse')

const bioURL =
  'https://www.biography.com/tag/black-history#:~:text=While%20Black%20History%20Month%20is,profound%20impact%20in%20history%3A%20self%2D'

const urls = async () => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(bioURL, { waitUntil: 'networkidle0', timeout: 0 })
    const personalSiteLinks = await page.evaluate(() => {
      let link = [
        ...document.querySelectorAll('.m-hub-header--description p a'),
      ]
      return link.map((item) => item.href)
    })

    await browser.close()
    return personalSiteLinks
  } catch (error) {
    console.log(error)
  }
}

const dataCrawler = async () => {
  try {
    const targetUrls = Promise.resolve(urls())
    targetUrls.then((urls) => {
      // passing the entire array of urls to bhParse instead of
      // running a function on each individual array item
      Promise.resolve(bhParse(urls)).then((response) =>
        // do whatever you need with response
        console.log('response: ', response)
      )
    })
  } catch (error) {}
}

dataCrawler()

module.export = { puppeteer }
