<template>
  <div>
    <ul class="nav">
      <li
        v-for="(item, index) in tabs"
        :key="item.id"
        class="nav-item"
        @click="toUrl(item.path, index)"
        :class="activeIndex === index ? 'active' : ''"
      >
        {{ item.name }}
      </li>
      <div class="line" ref="line"></div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      activeIndex: 0,
      lastIndex: 0,
      curPath: null,
    }
  },
  // watch: {
  //   '$route.path': function (newVal, oldVal) {
  //   },
  // },
  methods: {
    toUrl(path, i) {
      this.activeIndex = i
      if (this.curPath === path) return
      this.curPath = path
      this.moveLine()
      this.$router.push(path)
    },
    moveLine() {
      const offset = this.activeIndex
      this.line.style.transform = `translateX(${
        (this.line.clientWidth + this.line.offsetLeft) * offset
      }px)`
    },
    // checkURL() {
    //   if (location.href.indexOf(this.curPath) !== -1) {
    //     const hrefs = location.href.split('/')
    //     this.curPath = '/' + hrefs[hrefs.length - 1]
    //     this.tabs.forEach((item, index) => {
    //       if (item.path === this.curPath) {
    //         console.log(this.activeIndex)
    //         this.activeIndex = index
    //         console.log(this.activeIndex)
    //       }
    //     })
    //   }
    // },
  },
  mounted() {
    this.line = this.$refs.line
  },
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  color: rgb(99, 99, 99);
  position: relative;
  .nav-item {
    height: 30px;
    width: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 20px;
    padding: 10px;

    &:hover {
      color: #3bc66f;
    }
  }
  .active {
    color: #3bc66f;
  }
  .line {
    width: 85px;
    height: 3px;
    background: #3bc66f;
    position: absolute;
    top: 145%;
    left: 20px;
    transition: all 0.2s linear;
  }
}
</style>
