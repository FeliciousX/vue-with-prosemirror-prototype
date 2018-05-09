<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ProseMirrorEditor/>
  </div>
</template>

<script>
import ProseMirrorEditor from './components/ProseMirrorEditor.vue'

export default {
  name: 'app',
  components: {
    ProseMirrorEditor
  },
  data() {
    return {
      vtree: {
        tag: 'h1',
        data: {},
        children: ['hello world']
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
