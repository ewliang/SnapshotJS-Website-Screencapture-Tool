<template>
  <div>
    <form @submit.prevent = "captureScreenshot()">
      <input type = "url" v-model = "URL" id = "URLInput" placeholder = "Type a URL here (e.g. https://www.example.com)" required>
      <input type = "submit" value = "Take Screenshot">
      <fieldset required>
        <legend>Full Page?</legend>
        <div id = "fullPage">
          <input type = "radio" v-model = "fullPage" value = "true" id = "true" name = "fullPage" checked />
          <label for = "true">Yes</label>
          <input type = "radio" v-model = "fullPage" value = "false" id = "false" name = "fullPage" />
          <label for = "false">No</label>
        </div>
      </fieldset>
      <select v-model = "dimensions" id = "dimensions" required>
        <option value = "640x360" selected>Small - 640 x 360</option>
        <option value = "854x480">Medium - 854 x 480</option>
        <option value = "1280x720">Standard - 1280 x 720</option>
        <option value = "1920x1080">Large - 1920 x 1080</option>
      </select>
    </form>
    <div>
      <button @click.prevent = "reset()">Reset</button>
      <button id = "downloadButton">Download</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      URL: '',
      fullPage: true,
      dimensions: ''
    }
  },
  methods: {
    captureScreenshot () {
      let width = parseInt(this.dimensions.substr(0, this.dimensions.indexOf('x')), 10)
      let height = parseInt(this.dimensions.substr(this.dimensions.indexOf('x') + 1, this.dimensions.length - 1), 10)
      let screenshotOptions = {
        URL: this.URL,
        fullPage: this.fullPage,
        width: width,
        height: height
      }
      axios.post('http://localhost:4000/', screenshotOptions, {
        responseType: 'arraybuffer'
      })
      .then(function(response) {
        let blob = new Blob([response.data], { type: 'image/jpeg' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        let downloadElement = document.createTextNode('Download')
        link.appendChild(downloadElement)
        document.body.appendChild(link)
        // link.download = 'screenie.jpg'
        // link.click()
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
