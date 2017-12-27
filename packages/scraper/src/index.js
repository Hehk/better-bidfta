const cheerio = require("cheerio");
const rp = require("request-promise");
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

const getAuctionPageHTML = async id => {
  const url = `https://bid.bidfta.com/cgi-bin/mndetails.cgi?${id}`;
  return await rp(url); 
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

const getAuctionDetails = html => {
  const $ = cheerio.load(html);
  const table = $("#wrapper tr")
  return {
    name: table.find('#auction_title').text(),
    date: $(table[1]).find('td')[1].children[0].data,
    address: $(table[2]).find('td')[1].children[0].data
  };
}

const getAuctions = async () => {
  const html = await getHomePageHTML();
  const ids = getAuctionIds(html);

  const auctions = await Promise.all(ids.map(async id => {
    const auctionHTML = await getAuctionPageHTML(id);
    return {
      id,
      ...getAuctionDetails(auctionHTML)
    };
  }));

  console.log(auctions);
  return auctions;
};

getAuctions()
