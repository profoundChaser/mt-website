<template>
  <div id="scroll-container">
    <div id="scroll-box" ref="scrollBox">
      <div class="img-box" v-for="item in scrollImgs" :key="item.id"
      @click="selectCategory(item.path)">
        <img :src="item.img" alt="图片" />
        <p class="center-text">{{ item.text }}</p>
        <div class="mask"></div>
      </div>
    </div>
    <button class="icon-box pre" @click="pre" ref="pre">&lt;</button>
    <button class="icon-box next" @click="next" ref="next">&gt;</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollImgs: [
        {
          id: -1,
          text: '全部',
          img: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
        },
        {
          id: 0,
          text: '风景',
          path:'/scenery',
          img: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
        },
        {
          id: 1,
          text: '美女',
          path:'/mv',
          img: 'https://images.unsplash.com/photo-1448387473223-5c37445527e7?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
        },
        {
          id: 2,
          text: '建筑',
          img: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
        },
        {
          id: 3,
          text: '美食',
          img: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
        },
        {
          id: 4,
          text: '动物',
          img: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
        },
        {
          id: 5,
          text: '运动',
          img: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
        },
        {
          id: 6,
          text: '生活',
          img: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
        },
        {
          id: 7,
          text: '游戏',
          img: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
        },
        {
          id: 8,
          text: '人物',
          img: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
        },
        {
          id: 9,
          text: '动漫',
          img: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
        },
      ],
      scrollBox: null,
      scrollPoint: 0, //滚动指数
      // pre:null,
      // next:null,
      marginLeft:null, //图片容器的左边距 用于计算transform
      clientWidth:null, //图片容器的宽度 用于计算transform
      commonPath:'/imgs'
    }
  },
  methods: {
    pre(e) {
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
    next(e) {
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
    selectCategory(path){
        this.$router.push(this.commonPath+path)
        this.$emit('showPathImgs',path)
    }
  },
  mounted() {
    this.scrollBox = this.$refs.scrollBox
    this.clientWidth = this.scrollBox.children[0].clientWidth
    let { marginLeft } = window.getComputedStyle(this.scrollBox.children[1])
    this.marginLeft = +marginLeft.split('px')[0]
    this.pre = this.$refs.pre
    this.next = this.$refs.next
    this.pre.style.display = 'none'
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
    &:nth-child(n) {
      margin-left: 20px;
    }
    &:nth-child(1) {
      margin-left: 0;
    }
    img {
      border-radius: 10px;
      width: 100%;
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
      height: calc(100% - 5px);
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
