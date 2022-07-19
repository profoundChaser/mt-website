<template>
  <div id="app">
    <Head v-if="!hiddenHead"></Head>
    <router-view></router-view>
    <ToolBar v-if="!hiddenHead"></ToolBar>
  </div>
</template>

<script>
import Head from './components/header/Head.vue'
import { showFullScreenLoading, hideFullScreenLoading } from './utils/loading'
import ToolBar from './components/toolBar/ToolBar.vue'
export default {
  name: 'App',
  components: {
    Head,
    ToolBar,
  },
  data() {
    return {
      hiddenHead: false,
      checkPaths: ['/login', '/register', '/onePic','/'],
    }
  },
  watch: {
    '$route.path': {
      handler: function (newValue, oldValue) {
        this.checkPath(newValue)
        console.log(newValue)
      },
      immediate: true,
    },
  },
  methods: {
    checkPath(path) {
      console.log(this.checkPaths.includes(path))
      this.hiddenHead = this.checkPaths.includes(path)
    },
  },
  beforeCreate() {
    showFullScreenLoading()
  },
  mounted() {
    hideFullScreenLoading()
    this.checkPath(this.$route.path)
  },
}
</script>

<style>
body {
  overflow-x: hidden;
}
</style>
