const puppeteer = require("puppeteer");
const fs = require("fs");
const array = [];
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://map.onesoil.ai/2018?crop=wheat#12.85/37.39314/-5.28697"
  );
  page.on("console", async (msg) => {
    let msgProp = await msg.args()[0].jsonValue();
    array.push(msgProp);
  });

  browser.on("disconnected", () => {
    fs.writeFileSync(__dirname + "/test.txt", JSON.stringify(array, null, 2));
  });
})();
