<template>
  <div id="app">
    <Head v-if="!hiddenHead"></Head>
    <router-view></router-view>
  </div>
</template>

<script>
import Head from './components/header/Head.vue'

export default {
  name: 'App',
  components: {
    Head,
  },
  data() {
    return {
      hiddenHead: false,
      checkPaths: ['/login', '/register'],
    }
  },
  watch: {
    '$route.path': function (newVal, oldVal) {
      this.checkPath(newVal)
    },
  },
  methods: {
    checkPath(path) {
      this.hiddenHead = this.checkPaths.includes(path)
    },
  },
}
</script>

<style></style>
