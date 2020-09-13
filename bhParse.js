// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
// const nameList = [
// 	'Martin Luther King Jr.',
// 	'Harriet Tubman',
// 	'Rosa Parks',
// 	'Muhammad Ali',
// 	'Jackie Robinson',
// 	'Langston Hughes',
// 	'Maya Angelou',
// 	'George Washington Carver',
// 	'Barack Obama',
// 	'Madam C.J. Walker',
// 	'Mae C. Jemison',
// 	'Daniel Hale Williams',
// 	'Garret Morgan',
// 	'Oprah Winfrey',
// 	'Carter G. Woodson',
// ];

export const nameURL = (name) => {
			const endpoint = 'https://www.biography.com/activist/';
			let nameAlt = name.toLowerCase().replace(/\s/g, '-');
			if (nameAlt.includes('.')) {
				return endpoint + nameAlt.replace(/\./g, '');
			} else {
				return endpoint + nameAlt;
			}
		};
 
    

export const bhParse = async function (nameURL){
    try {
			/* Initiate the Puppeteer browser */
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
            
			// Removes navigation Timeout
			await page.setDefaultNavigationTimeout(0);
			/* Go to the page and wait for it to load */
			await page.goto(nameURL, { waitUntil: 'networkidle0' });

			/* Run javascript inside of the page */
			let data = await page.evaluate(() => {
				let dates = document.querySelector(
					'.m-detail-header--person-occupations'
				).innerHTML;
				let merit = document.querySelector('.m-person--abstract').innerHTML;
				let image = document.querySelector('.m-person--image img').src;
				/* Returning an object filled with the scraped data */
				return {
					dates,
					merit,
					image,
				};
			});

			/* Outputting what we scraped */
			console.log(data);

			await browser.close();
		} catch (error) {
        console.error(error);
    }
};

// const res = nameURLs.map((nameURL) => bhParse(nameURL));
// console.log(res);

// module.exports = bhParse;