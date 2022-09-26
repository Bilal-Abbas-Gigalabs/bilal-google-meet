const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
var link = process.argv.slice(2);

puppeteer.use(StealthPlugin());

const username = "Flair Assistant";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args:[
      '--no-sandbox',
      '--disable-gpu',
      '--enable-webgl',
      '--window-size=1024,1024'
    ]
  });

  const meetUrl = `${link}`;
  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page);

  await recorder.start("output.mp4");

  await page.goto(meetUrl);
  await page.type('input[type="text"]', username);
  await page.keyboard.press('Enter');

  // await page.waitForSelector('[class*="NHaLPe"] span button]', { visible: true })
  // await page.click('[class*="NHaLPe"] span button]');

  // const info = await page.$eval('#ow3 .roSPhc');
  // console.log(info)
  // if(info == 'You left the meeting')
  //   await recorder.stop();
  // else
  await page.waitForTimeout(200000);
  await recorder.stop();
  await browser.close();
})();