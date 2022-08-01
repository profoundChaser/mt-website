<template>
  <div id="app">
    <Head v-if="!hiddenHead"></Head>
    <router-view></router-view>
    <ToolBar v-if="!hiddenToolBar"></ToolBar>
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
      hiddenToolBar: false,
      checkPaths: ['/login', '/register', '/onePic', '/', '/404', '/forgetPwd','/upload'],
      checkToolbarHiddens: ['/me', '/login', '/register', '/onePic', '/', '/404', '/forgetPwd','/upload'],
    }
  },
  watch: {
    '$route.path': {
      handler: function (newValue, oldValue) {
        this.checkPath(newValue)
      },
      immediate: true,
    },
  },
  methods: {
    checkPath(path) {
      this.hiddenHead = this.checkPaths.includes(path)
      let paths = path.split('/')
      this.hiddenToolBar = this.checkToolbarHiddens.includes('/' + paths[1])
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
