const puppeteer = require('puppeteer')
// import puppeteer from 'puppeteer'
// import { bhParse, nameURL } from './bhParse.js'
const bhParse = require('./bhParse')

const bioURL =
  'https://www.biography.com/tag/black-history#:~:text=While%20Black%20History%20Month%20is,profound%20impact%20in%20history%3A%20self%2D'
// const bhParse = require('./bhParse');

;(async () => {
  try {
    /* Initiate the Puppeteer browser */
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Removes navigation Timeout
    // page.setDefaultNavigationTimeout(0)
    /* Go to the IMDB Movie page and wait for it to load */
    await page.goto(bioURL, { waitUntil: 'networkidle0', timeout: 0 })

    /* Run javascript inside of the page */
    console.log('SCRAPE DATA INDEX JS')
    let data = await page.evaluate(() => {
      let link = [
        ...document.querySelectorAll('.m-hub-header--description p a'),
      ]
      let url = link.map((item) => {
        console.log('item: ', item)
        return item.href
      })
      /* Returning an object filled with the scraped data */
      // console.log('names: ', names)
      return url
    })
    // let bhURLs = data.map((name) => nameURL(name))

    /* Outputting what we scraped */
    // let bhData = data.map((url) => bhParse(url))

    Promise.all(data.map((url) => bhParse(url))).then((response) => {
      console.log('response: ', response)
    })
  } catch (error) {
    console.log(error)
  }
})()

module.export = { puppeteer }
