// const cheerio = require('cheerio');
// const request = require('request');

// const getAuctions = () => {
//   request('http://bidfta.bidqt.com/BidFTA/#/Main', (error, response, html) => {
//     console.log(html);
//     const $ = cheerio.load(html);
//     console.log($('.app-list-item'))

//     console.log($('.app-list-item').map((i, el) => {
//       const link = el.find('.app-card-footer a').getAttribute('href');
//       return "test"
//     }).get())
//   });
// }

// getAuctions();
//

const cheerio = require("cheerio");
const { Builder, By, Key, until } = require("selenium-webdriver");
const driver = new Builder().forBrowser("chrome").build();

const getAuctions = async () => {
  try {
    await driver.get("http://bidfta.bidqt.com/BidFTA/#/Main");
    await driver.wait(until.elementLocated(By.className("app-list-item")));
    const html = await driver.getPageSource();
    const $ = cheerio.load(html);

    const ids = $(".app-list-item")
      .map((i, el) => {
        const link = $(el)
          .find(".app-card-footer a")
          .attr("href");
        const [_, id] = link.split("?");
        return id;
      })
      .get();

    driver.quit();

    return ids;
  } catch (e) {
    driver.quit();
    console.error(e);
    return e;
  }
};

getAuctions();
