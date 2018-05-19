<template>
  <div id="app">
    <img src="./assets/logo.png">
    <template v-for="item in items">
      <ProseMirrorEditor
        :id="item.id"
        :key="item.id"
        :item="item"/>
    </template>
  </div>
</template>

<script>
import ProseMirrorEditor from './components/ProseMirrorEditor.vue'
import uuid from 'uuidv4'

import rteStates from './rte-states.json'

export default {
  name: 'app',
  components: {
    ProseMirrorEditor
  },
  data() {
    return {
      items : []
    }
  },
  mounted() {
    const newItems = rteStates
      .map( Object.freeze )
      .map( pmState => ({
        id: uuid(),
        type: 'rich-text',
        opacity: 1,
        fontFamily: 'Droid Serif',
        fontSize: 31,
        lineHeight: 1.5,
        lineSpacing: 26,
        textAlignment: 'center',
        pmState
      }))

    this.items = this.items.concat( newItems )
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
