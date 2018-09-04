<template>
  <div class = "panel">
    <h1>Take A Screenshot</h1>
    <p>
      Welcome to Snapshotjs! To take a screenshot of a website, simply type in the URL of that website into the input box. Next, you have the option to
      configure how you want your image to look like. Once you are done adjusting the available options, click the “Screenshot” button. Our webapp will
      then process the URL which can take anywhere from 5 to 30 seconds depending on the size of the website and your configured options.
    </p>
    <form @submit.prevent = "captureScreenshot()">
      <div class = "inline">
        <input type = "url" v-model = "URL" id = "URLInput" placeholder = "Type a URL here (e.g. https://www.example.com)" required>
        <input type = "submit" class = "action-solid-button" value = "Take Screenshot">
      </div>
      <fieldset required>
        <legend>Options</legend>
        <div id = "fullPageWrapper">
          <label>Full Page?</label>
          <input type = "radio" v-model = "fullPage" value = "true" id = "trueFullPage" checked />
          <label for = "trueFullPage">Yes</label>
          <input type = "radio" v-model = "fullPage" value = "false" id = "falseFullPage" />
          <label for = "falseFullPage">No</label>
        </div>
        <label>Dimensions</label>
        <select v-model = "dimensions" id = "dimensions" required>
          <option value = "640x360" selected>Small - 640 x 360</option>
          <option value = "854x480">Medium - 854 x 480</option>
          <option value = "1280x720">Standard - 1280 x 720</option>
          <option value = "1920x1080">Large - 1920 x 1080</option>
        </select>
      </fieldset>
    </form>
    <div class = "inline">
      <a href = "#" @click.prevent = "reset()" class = "neutral-border-button">Reset</a>
      <a href = "#" id = "downloadButton" class = "success-border-button">Download</a>
    </div>
    <img src = "" id = "screenshotPreview">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      URL: '',
      fullPage: '',
      dimensions: ''
    }
  },
  methods: {
    captureScreenshot () {
      // Parse the width and height values from the selection option value (e.g. 1920x1080 -> width: 1920, height: 1080 with 'x' as cutoff)
      let width = parseInt(this.dimensions.substr(0, this.dimensions.indexOf('x')), 10)
      let height = parseInt(this.dimensions.substr(this.dimensions.indexOf('x') + 1, this.dimensions.length - 1), 10)
      let fp = (this.fullPage == 'true')
      let screenshotOptions = {
        URL: this.URL,
        fullPage: fp,
        width: width,
        height: height
      }
      console.log(typeof fp + '\n' + fp)
      axios.post('http://localhost:4000/', screenshotOptions, {
        responseType: 'arraybuffer'
      })
      .then(function(response) {
        let blob = new Blob([response.data], { type: 'image/jpeg' })
        // let link = document.createElement('a')
        let link = document.getElementById('downloadButton')
        link.href = window.URL.createObjectURL(blob) // Update Download button href link.
        // let downloadElement = document.createTextNode('Download')
        // link.appendChild(downloadElement)
        // document.body.appendChild(link)
        // link.download = 'screenie.jpg'
        // link.click()
        // Show Image Preview In Image Tag
        let img = document.getElementById('screenshotPreview')
        img.src = link.href
      })
    },
    reset () {
      this.URL = ''
      document.getElementById('URLInput').innerHTML = ''
      this.fullPage = true
      document.getElementById('fullPage').value = 'true'
      this.dimensions = ''
      document.getElementById('dimensions').selectedIndex = '0'
    }
  }
}
</script>

<style>

</style>
