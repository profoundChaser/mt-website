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
  watch: {
    '$route.path': {
      handler(nv, ov) {
        try {
          this.tabs.forEach((item, index) => {
            if (item.path === nv) {
              this.lastIndex = +sessionStorage.getItem('activePathIndex')
              this.activeIndex = index
              sessionStorage.setItem('activePathIndex', index)
              throw 'over'
            }
          })
        } catch (error) {}
      },
      immediate: true,
    },
  },
  methods: {
    toUrl(path, i) {
      this.lastIndex = this.activeIndex
      this.activeIndex = i
      if (this.lastIndex == this.activeIndex) return
      this.moveLine()
      this.$router.push(path)
      sessionStorage.setItem('activePathIndex', i)
    },
    moveLine() {
      const offset = this.activeIndex
      this.line.style.transform =`translateX(${
        (this.line.clientWidth + this.line.offsetLeft) * offset
      }px)`
    },
  },
  created() {
    this.activeIndex = +sessionStorage.getItem('activePathIndex')
  },
  mounted() {
    this.line = this.$refs.line
    this.moveLine()
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
    top: 146%;
    left: 20px;
    transition: all 0.2s linear;
  }
}
</style>
