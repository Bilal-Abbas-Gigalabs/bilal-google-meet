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

  await page.waitForTimeout(20000);

  await page.waitForSelector('#ow3 > div.T4LgNb > div > div:nth-child(11) > div.crqnQb > div.UnvNgf.Sdwpn.P9KVBf > div.Tmb7Fd > div > div.NHaLPe > span > button', { visible: true })
  await page.click('#ow3 > div.T4LgNb > div > div:nth-child(11) > div.crqnQb > div.UnvNgf.Sdwpn.P9KVBf > div.Tmb7Fd > div > div.NHaLPe > span > button');

  await page.waitForTimeout(10000);
  const info = await page.$eval('#ow3 > div > div > div.roSPhc', element => element.textContent);
  if(info == 'You left the meeting'){
    await recorder.stop();
    await browser.close();
  }
  else{
    await page.waitForTimeout(200000);
  }
})();