const puppeteer = require('puppeteer');

module.exports = {
  //Get Index
  getIndex: function(req, res) {
    var url = 'https://latimes.com';
    var screenshotFileName = 'untitled';
    var fileFormat = '.jpg';
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'load', timeout: 300000 });
      console.log('Setting up viewport and awaiting content load...');
      await page.setViewport({ width: 1920, height: 1080 });
      // Incremental Scroll Page To Load Sections Of Content
      // Test: www.latimes.com - Long page and lazy load.
      await page.evaluate(() => {
        let screenHeight = document.documentElement.clientHeight;
        let scrollHeight = document.body.scrollHeight;
        let screenHeightScrollIncrements = Math.ceil(scrollHeight / screenHeight);
        var tempScrolledAmount = screenHeight;
        (function() {
          var counter = 0;
          var myVar = setInterval(myTimer, 3000);
          function myTimer() {
              window.scrollBy(0, screenHeight);
              counter++;
              if(counter > screenHeightScrollIncrements) {
                clearInterval(myVar);
              }
          }
        })();
      });
      await page.waitFor(30000); // 30,000 confirmed
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
