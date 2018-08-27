const puppeteer = require('puppeteer');

module.exports = {
  //Get Index
  getIndex: function(req, res) {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://www.example.com');
      await page.screenshot({ path: 'example.png' });
      await browser.close();
    })();

    res.status(200).json({
      message: "Welcome to the backend!"
    });
  }
}
