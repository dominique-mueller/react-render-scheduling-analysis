const fs = require('fs').promises;
const http = require('http');
const path = require('path');

const puppeteer = require('puppeteer');

console.log('ANALYSIS');
console.log('');

(async () => {
  // Start server
  console.log('> Start server');
  const server = http.createServer(async (request, response) => {
    const data = await fs.readFile(path.join(__dirname, 'build', request.url));
    response.writeHead(200);
    response.end(data);
  });
  await new Promise((resolve) => {
    server.listen(3000, () => {
      resolve();
    });
  });

  // Start browser
  console.log('> Start browser');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/index.html');

  // Wait for and retrieve results
  console.log('> Run analysis');
  const results = await new Promise((resolve) => {
    page.on('console', async (event) => {
      const value = await event.args()[0].jsonValue();
      resolve(value);
    });
  });

  // Write results to file
  console.log('> Save analysis results');
  await fs.writeFile('./results.json', results);

  // Close browser
  console.log('> Close browser');
  await browser.close();

  // Close server
  console.log('> Close server');
  await new Promise((resolve) => {
    server.close(() => {
      resolve();
    });
  });

  console.log('');
  console.log('DONE');
})();
