<template>
  <div>
    <input type="file" name="files" id="files" @change="onFileChange">
    <button @click="uploadFiles">Submit</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      files: null
    }
  },
  methods: {
    onFileChange (event) {
      var files = event.target.value
      if (!files.length) return
      this.files = files
      console.log(`files: ${files}`)
    },
    uploadFiles () {
      console.log(this.files)
    }
  }
}
</script>
