const puppeteer = require('puppeteer');

module.exports = {
  //Get Index
  getIndex: function(req, res) {
    var url = req.body.URL;
    var fullPage = req.body.fullPage;
    var screenshotFileName = 'untitled';
    var fileFormat = '.jpg';
    var viewWidth = req.body.width;
    var viewHeight = req.body.height;
    (async () => {
      console.log('Capturing: ' + url + '\n' + 'Full Page: ' + fullPage + '\n' + viewWidth + 'x' + viewHeight);
      const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'load', timeout: 300000 });
      console.log('Setting up viewport.');
      console.log('Loading content.');
      await page.setViewport({ width: viewWidth, height: viewHeight });
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
      if(fullPage) {
        await page.waitFor(30000); // 30,000 confirmed = 30 sec
      } else {
        await page.waitFor(3000); // 3 sec delay for viewport sized screenshots.
      }
      console.log('Taking screenshot...');
      await page.screenshot({ path: screenshotFileName + fileFormat, fullPage: fullPage });
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
