<template>
  <div id="scroll-container">
    <div id="scroll-box" ref="scrollBox">
      <div
        class="img-box"
        v-for="item in scrollImgs"
        :key="item.id"
        @click="selectCategory(item.nameInEn)"
      >
        <img :src="item.imgCover" alt="图片" />
        <p class="center-text">{{ item.name }}</p>
        <div class="mask"></div>
      </div>
    </div>
    <button class="icon-box pre" @click="preClick" ref="pre">&lt;</button>
    <button class="icon-box next" @click="nextClick" ref="next">&gt;</button>
  </div>
</template>

<script>
import { getAllCategories } from '@/api/category'

export default {
  data() {
    return {
      scrollImgs: [],
      scrollBox: null,
      scrollPoint: 0, //滚动指数
      marginLeft: null, //图片容器的左边距 用于计算transform
      clientWidth: null, //图片容器的宽度 用于计算transform
      commonPath: '/imgs',
    }
  },
  methods: {
    preClick(e) {
      e.stopPropagation()
      this.scrollBox.style.transform = `translateX(${
        (this.clientWidth + this.marginLeft) * (this.scrollPoint + 1)
      }px)`
      this.scrollPoint++
      if (this.scrollPoint === 0) {
        this.pre.style.display = 'none'
      } else {
        this.next.style.display = 'flex'
      }
    },
    nextClick(e) {
      e.stopPropagation()
      this.scrollBox.style.transform = `translateX(${
        (this.clientWidth + this.marginLeft) * (this.scrollPoint - 1)
      }px)`
      this.scrollPoint--
      if (Math.abs(this.scrollPoint) + 7 === this.scrollImgs.length) {
        this.next.style.display = 'none'
      } else {
        this.pre.style.display = 'flex'
      }
    },
    //选中后通知父组件更换图片
    selectCategory(nameInEn) {
      this.$router.push(this.commonPath + '/' + nameInEn)
      this.$emit('showPathImgs', nameInEn)
    },
    async getAllCategories() {
      const res = await getAllCategories()
      if (res.status !== 200) return
      this.scrollImgs = res.data.rows
    },
    initDomInfo() {
      this.scrollBox = this.$refs.scrollBox
      this.pre = this.$refs.pre
      this.next = this.$refs.next
      this.pre.style.display = 'none'
      const timer = setTimeout(() => {
        this.clientWidth = this.scrollBox.children[0].clientWidth
        let { marginLeft } = window.getComputedStyle(this.scrollBox.children[1])
        this.marginLeft = +marginLeft.split('px')[0]
        clearTimeout(timer)
      }, 500)
    },
  },
  created() {
    this.getAllCategories()
  },
  mounted() {
    this.initDomInfo()
  },
}
</script>

<style lang="scss" scoped>
#scroll-container {
  width: 100%;
  overflow: hidden;
  position: relative;

  #scroll-box {
    display: flex;
    transition: all 0.5s ease-in-out;
  }
  .img-box {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    min-width: 172px;
    width: 172px;
    height: 115px;
    &:nth-child(n) {
      margin-left: 20px;
    }
    &:nth-child(1) {
      margin-left: 0;
    }
    img {
      border-radius: 10px;
      width: 100%;
      min-height: 100%;
    }
    .center-text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      letter-spacing: 0.5rem;
      z-index: 1;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      transition: all 0.1s linear;
    }

    &:hover .mask {
      background: rgba(0, 0, 0, 0.6);
    }
  }

  .icon-box {
    width: 60px;
    height: 100%;
    position: absolute;
    color: #626161;
    box-shadow: none;
    background: linear-gradient(to right, #fff, transparent);
    border-radius: 0;
  }
  .pre {
    left: 0;
    top: 0;
  }
  .next {
    right: 0;
    top: 0;
    background: linear-gradient(to right, transparent, #fff);
  }
}
</style>
