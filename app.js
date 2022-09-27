const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
var link = process.argv.slice(2);

puppeteer.use(StealthPlugin());

const username = "Flair Assistant";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--enable-webgl",
      "--window-size=1024,1024",
    ],
  });

  const meetUrl = `${link}`;
  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page);

  await recorder.start("output.mp4");

  await page.goto(meetUrl);
  await page.type('input[type="text"]', username);
  await page.keyboard.press("Enter");

  setInterval(async function () {
    await page
      .waitForSelector("#ow3 > div > div > div.roSPhc", { visible: true })
      .then(async () => {
        recorder.stop();
        await browser.close();
        process.exit(1);
      })
      .catch((e) => {
        console.log("Processing...");
      });
  }, 1000);
})();
