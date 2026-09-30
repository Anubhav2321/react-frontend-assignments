import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER_ERROR:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('PAGE_ERROR:', error.message);
  });

  try {
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle2', timeout: 5000 });
    console.log('Page loaded successfully on 5174.');
  } catch (err) {
    console.log('Failed on 5174, trying 5173...');
    try {
      await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 5000 });
      console.log('Page loaded successfully on 5173.');
    } catch (e) {
      console.log('Failed to load page:', e.message);
    }
  }

  await browser.close();
})();
