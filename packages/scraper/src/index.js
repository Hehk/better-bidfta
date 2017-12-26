const cheerio = require("cheerio");
const { Builder, By, Key, until } = require("selenium-webdriver");
const driver = new Builder().forBrowser("chrome").build();

const getHomePageHTML = async () => {
  try {
    await driver.get("http://bidfta.bidqt.com/BidFTA/#/Main");
    await driver.wait(until.elementLocated(By.className("app-list-item")));
    const html = await driver.getPageSource();
    driver.quit();

    return html;
  } catch (e) {
    driver.quit();

    return e;
  }
};

const getAuctionIds = html => {
  const $ = cheerio.load(html);
  return $(".app-list-item")
    .map((i, el) => {
      const link = $(el)
        .find(".app-card-footer a")
        .attr("href");
      const [_, id] = link.split("?");
      return id;
    })
    .get();
};

const getAuctions = async () => {
  const html = await getHomePageHTML();
  const ids = getAuctionIds(html);

  console.log(ids);
  return ids;
};

getAuctions();
