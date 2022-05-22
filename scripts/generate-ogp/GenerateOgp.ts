import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(
    `file:${path.resolve(
      process.cwd(),
      './scripts/generate-ogp/ogp-base.html',
    )}`,
  );
  await page.waitForSelector('#title');
  await page.evaluate(() => {
    const title = document.getElementById('title')!;
    title.innerText = 'Next.js+linariaを試してみる';
  });
  await page.screenshot({ path: './sample.png' });
  await browser.close();
})();
