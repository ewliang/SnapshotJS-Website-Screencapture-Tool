const puppeteer = require('puppeteer');

module.exports = {
  //Get Index
  getIndex: function(req, res) {
    var url = 'https://www.latimes.com';
    var screenshotFileName = 'untitled';
    var fileFormat = '.jpg';
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'load' });
      await page.waitFor(3000);
      console.log('Setting up viewport and awaiting content load...');
      await page.setViewport({ width: 1920, height: 1080 });
      // Incremental Scroll Page To Load Sections Of Content
      // Test: www.latimes.com
      await page.evaluate(() => {
        let screenHeight = document.documentElement.clientHeight;
        let scrollHeight = document.body.scrollHeight;
        let screenHeightScrollIncrements = Math.ceil(scrollHeight / screenHeight);
        let tempScrolledAmount = screenHeight;
        for(let i = 0; i < screenHeightScrollIncrements; i++) {
          (function(i) {
            setTimeout(function() {
              window.scrollTo(tempScrolledAmount, tempScrolledAmount + screenHeight);
              tempScrolledAmount += screenHeight;
            }, 5000);
          })(i);
        }
        //window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitFor(5000);
      console.log('Taking screenshot...');
      await page.screenshot({ path: screenshotFileName + fileFormat, fullPage: true });
      console.log('Finished taking screenshot!');
      await browser.close();
    })();

    res.status(200).json({
      message: "Welcome to the backend!"
    });
  }
}
