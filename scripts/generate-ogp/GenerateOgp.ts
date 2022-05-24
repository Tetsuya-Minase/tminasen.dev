import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { getArticleMetaData } from '../functions/article';

const OGP_BASE_HTML = `file:${path.resolve(
  process.cwd(),
  './scripts/generate-ogp/ogp-base.html',
)}`;
const OGP_IMAGE_BASE_PATH = 'public/images/article/';

(async () => {
  const metaData = await getArticleMetaData();
  for (const data of metaData) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(OGP_BASE_HTML);
    await page.waitForSelector('#title');
    await page.evaluate(
      ({ title }) => {
        const titleElement = document.getElementById('title')!;
        titleElement.innerText = title;
      },
      { title: data.title },
    );
    const ogpDirectory = path.join(
      process.cwd(),
      OGP_IMAGE_BASE_PATH,
      data.path,
    );
    if (!fs.existsSync(ogpDirectory)) {
      fs.mkdirSync(ogpDirectory);
    }
    await page.screenshot({
      path: path.join(ogpDirectory, 'ogp.png'),
    });
    await browser.close();
  }
})();
