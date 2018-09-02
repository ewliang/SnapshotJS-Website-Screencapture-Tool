<template>
  <form @submit.prevent = "captureScreenshot()">
    <input type = "url" v-model = "URL" placeholder = "Type a URL here (e.g. https://www.example.com)">
    <input type = "submit" value = "Take Screenshot">
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      URL: ''
    }
  },
  methods: {
    captureScreenshot () {
      let URL = {
        URL: this.URL
      }
      axios.post('http://localhost:4000/', URL, {
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
    }
  }
}
</script>

<style>

</style>
