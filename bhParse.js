const puppeteer = require('puppeteer')

const bhParse = async function (linksArray) {
  // receives array of site urls
  try {
    const dataArray = [] // store array of objects of site data
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // loop over received array of site urls
    for (let i = 0; i < linksArray.length; i++) {
      let link = linksArray[i]
      await page.goto(link, { waitUntil: 'networkidle0', timeout: 0 })

      let data = await page.evaluate(() => {
        const dates = document.querySelector(
          '.m-detail-header--person-occupations'
        ).innerHTML
        const merit = document.querySelector('.m-person--abstract').innerHTML
        const image = document.querySelector('.m-person--image img').src

        return {
          dates,
          merit,
          image,
        }
      })

      dataArray.push(data)
    }

    await browser.close()
    return dataArray // return completed array of objects of site data
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = bhParse
