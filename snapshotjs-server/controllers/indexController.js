const puppeteer = require('puppeteer');

module.exports = {
  //Get Index
  getIndex: function(req, res) {
    var url = req.body.URL;
    var screenshotFileName = 'untitled';
    var fileFormat = '.jpg';
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'load', timeout: 300000 });
      console.log('Setting up viewport.');
      console.log('Loading content.');
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
      console.log('Waiting for lazy loaded content to appear...');
      await page.waitFor(30000); // 30,000 confirmed = 30 sec
      console.log('Taking screenshot...');
      await page.screenshot({ path: screenshotFileName + fileFormat, fullPage: true });
      console.log('Finished taking screenshot!');
      await browser.close();
      // Send screenshot image file to client.
      console.log('Sending file to client.');
      await res.sendFile(screenshotFileName + fileFormat, { 'root': './' }, function (err) {
        if (!err) {
          console.log('File Sent: ' + screenshotFileName + fileFormat);
        } else {
          console.log(err);
        }
      });
    })();
    /*
    res.status(200).json({
      message: "Welcome to the backend!"
    });
    */
  }
}
