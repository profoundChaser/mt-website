<template>
  <div class="img-index" ref="imgIndex">
    <div class="img-container">
      <div
        class="img-box"
        v-for="(item, index) in pics"
        :key="item.id"
        ref="box"
        :draggable="true"
        @dragstart="dragStart($event, index)"
        @drop="drop($event, index)"
        @dragover="dragOver"
        @dragenter="dragEnter"
      >
        <!-- <template v-if="item.isVideo">
          <video :src="item.img" muted controls></video>
        </template> -->
        <img v-lazy="item.imgUrl" :key="item.id" @click="previewImg(item, index)" crossorigin />
        <div class="mask" @click="previewImg(item, index)" v-if="!closeOperateBar">
          <div class="operateBar">
            <div class="icon-box">
              <i class="iconfont icon-shoucang1" v-if="!item.isStore"></i>
              <i class="iconfont icon-shoucang" v-else></i>
            </div>
            <div class="icon-box store" @click="store($event, item, index)">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="bottomBar">
            <div class="userInfo">
              <img :src="item.avatar" alt="" class="avatar mt20" />
              <span class="uploader ml10">{{ item.uploader }}</span>
            </div>
            <div class="icon-box download" @click="downloadImg($event, index)">
              <i class="iconfont icon-xiazai"></i>
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
    <!-- 预览遮罩 -->
    <template v-if="usePreView">
      <div class="preview-container" v-if="showPreView" @click="closePreview">
        <div class="preview-box" ref="previewBox">
          <img :src="preview.img" @click="openNewWindow(preview.img)" ref="previewImg" />
        </div>
        <button class="icon-box pre" @click="pre">&lt;</button>
        <button class="icon-box next" @click="next">&gt;</button>
      </div>
    </template>
  </div>
</template>
<script>
import { st, sh, wh, getClientW, newWindow } from '@/utils/utils.js'
import dragJS from '@/utils/drag'
import { debounce } from '@/utils/utils.js'
import { imgToBase64, saveFileWithA, ImgWithSaveFile } from '../../utils/file'
import { addStore } from '@/api/store'
import { downloadsImgAdd, previewImgAdd } from '@/api/image'
export default {
  name: 'pic',
  props: {
    usePreView: {
      type: Boolean,
      default: true,
    },
    waterFallSize: {
      type: Number,
      default: 4,
    },
    readyPics: {
      type: Array,
      default: [],
    },
    pics: {
      type: Array,
      default: [],
    },
    closeOperateBar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPreView: false,
      preview: {
        img: '',
        index: null,
      },
      pictures: [],
      timer: null,
      isScroll: false,
      row: 1,
      isZoomUp: false,
      dragItemIndex: null,
      scrollHeight: null,
      endOneFlag: true,
    }
  },
  //由于瀑布流组件不会卸载，所以row会一直增加，所以需要监视路径并重置为1
  watch: {
    readyPics(nv, ov) {
      this.row = 1
    },
  },
  methods: {
    async previewImg(item, i) {
      this.showPreView = true
      this.preview.img = item.imgUrl
      this.preview.index = i
      document.body.style.overflow = 'hidden'
      this.previewImgAdd(item)
    },
    previewImgAdd(item) {
      //请求预览加一
      previewImgAdd(item.id)
    },
    closePreview() {
      this.showPreView = false
      document.body.style.overflowY = 'auto'
    },
    openNewWindow(src) {
      //新窗口打开图片
      newWindow('/onePic')
      //存储图片
      localStorage.setItem('imgSrc', src)
    },
    checkWindowScroll() {
      window.addEventListener(
        'scroll',
        debounce(() => {
          const n = this.waterFallSize
          const scrollTop = st()
          const windowHeight = wh()
          const scrollHeight = sh()
          if (scrollTop + windowHeight >= scrollHeight - 100) {
            const curPics = this.readyPics.slice(this.row * n - n, n * this.row)
            this.pics.push(...curPics)
            this.row++
          }
          this.waterFall(n)
          this.$forceUpdate()
        }, 300)
      )
    },
    pre(e) {
      e.stopPropagation()
      if (this.preview.index === 0) {
        this.preview.index = 0
      } else {
        this.preview.index--
      }
      this.preview.img = this.pics[this.preview.index].imgUrl
      this.previewImgAdd(this.pics[this.preview.index])
    },
    next(e) {
      e.stopPropagation()
      if (this.preview.index === this.pics.length - 1) {
        this.preview.index = this.pics.length - 1
      } else {
        this.preview.index++
      }
      this.preview.img = this.pics[this.preview.index].imgUrl
      this.previewImgAdd(this.pics[this.preview.index])
    },
    waterFall(cols) {
      const boxes = this.$refs.box
      const width = 1350
      if (!boxes) return
      let divideWidth = null
      const offsetLeft = 10
      const column = cols
      if (column <= 4) {
        divideWidth = width - offsetLeft * (column + 2)
      } else {
        divideWidth = width - offsetLeft * (column + 1)
      }
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.width = divideWidth / column + 'px'
        boxes[0].style.left = 0 + 'px'
        boxes[0].style.top = 0 + 'px'
        if (i < column && i > 0) {
          boxes[i].style.left =
            parseInt(boxes[i - 1].style.left.split()[0]) +
            boxes[i - 1].clientWidth +
            offsetLeft +
            'px'
          boxes[i].style.top = 0 + 'px'
        } else if (i > column - 1) {
          boxes[i].style.left = boxes[i - column].style.left
          boxes[i].children[0].onload = function () {
            boxes[i].style.top =
              parseInt(boxes[i - column].style.top.split()[0]) +
              boxes[i - column].clientHeight +
              offsetLeft -
              3 +
              'px'
          }
          //处理除了引高度有问题而添加的图片
          boxes[i].style.top =
            parseInt(boxes[i - column].style.top.split()[0]) +
            boxes[i - column].clientHeight +
            offsetLeft -
            3 +
            'px'
        }
      }
      this.$forceUpdate()
    },
    //收藏
    store(e, item, i) {
      e.stopPropagation()
      this.addStore(item)
      // this.pics[i].isStore = !this.pics[i].isStore
      // if (this.pics[i].isStore) {
      //   this.$message.success('可右边下载按钮一起下载')
      // }
      // localStorage.setItem(
      //   'downloadFiles',
      //   JSON.stringify([...JSON.parse(localStorage.getItem('downloadFiles')), item.img])
      // )
    },
    async downloadImg(e, i) {
      e.stopPropagation()
      saveFileWithA(imgToBase64(this.pics[i].imgUrl), 'vein' + Date.now())
      //发请求处理下载
      downloadsImgAdd(this.pics[i].id)
    },
    imgLoad(img) {
      return new Promise((resolve) => {
        img.onload = function () {
          resolve(this.clientHeight)
        }
      })
    },
    dragStart(e, i) {
      console.log(e.target)
      dragJS.dragStart(e)
      // this.pics.forEach((item) => {
      //   if (item.imgUrl === e.target.src) {
      //     this.sendStoreIndex(item.id)
      //   }
      // })
      this.dragItemIndex = i
    },
    drop(e, i) {
      dragJS.drop(e)
      let temp = this.pics[this.dragItemIndex]
      this.pics.splice(this.dragItemIndex, 1, this.pics[i])
      this.pics.splice(i, 1, temp)
      this.waterFall(this.waterFallSize)
    },
    dragOver(e) {
      dragJS.dragOver(e)
    },
    dragEnter(e) {
      dragJS.dragEnter(e)
    },
    //添加收藏部分
    async addStore(item) {
      const imgId = item.id
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const storeUserId = userInfo.id
      const res = await addStore({ imgId, storeUserId })
      if (res.status !== 200) return
      this.$message.success('收藏成功，可在我的收藏中查看')
    },
    //添加删除需要发送的自定义事件
    sendStoreIndex(storeImg) {
      this.$emit('sendStoreIndex', storeImg)
    },
  },
  mounted() {
    this.width = this.$refs.imgIndex.clientWidth
    this.waterFall(this.waterFallSize)
    this.checkWindowScroll(this.waterFallSize)
    // window.addEventListener('resize', this.waterFall(this.waterFallSize))
    //初始化下载的列表
    // localStorage.setItem('downloadFiles', JSON.stringify([]))
  },
  destroyed() {
    window.removeEventListener('scroll', debounce)
    // window.removeEventListener('resize', this.waterFall(this.waterFallSize))
    clearTimeout(this.timer)
  },
}
</script>
<style scoped lang="scss">
.img-index {
  width: 100%;
  box-sizing: border-box;
}
.img-container {
  width: 100%;
  height: 100%;
  position: relative;
   clear: both;
}
.img-box {
  position: absolute;
  top: -100%;
  left: -100%;
}
img {
  width: 100%;
  cursor: pointer;
  /* border-radius: 10px; */
  height: auto;
  transition: all 0.3s;
  /* box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07); */
}
.mask {
  width: 100%;
  height: calc(100% - 5px);
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(220, 132, 171, 0.2);
  border-radius: 10px;
  display: none;
  cursor: pointer;
}
.operateBar {
  width: 100%;
  display: none;
  justify-content: flex-end;
  position: absolute;
  top: 2%;
  right: 2%;

  .icon-box {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0px 0px 2.2px rgba(0, 0, 0, 0.037), 0px 0px 5.3px rgba(0, 0, 0, 0.053),
      0px 0px 10px rgba(0, 0, 0, 0.065), 0px 0px 17.9px rgba(0, 0, 0, 0.077),
      0px 0px 33.4px rgba(0, 0, 0, 0.093), 0px 0px 80px rgba(0, 0, 0, 0.13);
  }

  .icon-box {
    &:nth-child(2) {
      margin-left: 20px;
    }
  }
}
.bottomBar {
  position: absolute;
  bottom: 2%;
  right: 2%;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  display: flex;

  .icon-box {
    font-size: 22px;
    width: 40px;
    height: 40px;
  }
  .userInfo {
    display: flex;
    height: 100%;
    align-items: center;
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-left: 20px;
      margin-bottom: 30px;
    }
    .uploader {
      font-weight: 700;
      color: rgb(34, 34, 34);
    }
  }
}
.icon-shoucang1,
.icon-xiazai,
.icon-shoucang {
  font-size: 22px;
}
.img-box:hover .mask {
  display: block;
}
.img-box:hover .operateBar {
  display: flex;
}
.img-box:hover .bottomBar {
  display: flex;
}
/* .img-box:hover {
  transform: scale(1.1);
  z-index: 10;
}
.img-box:hover img {
  transform: scale(1.1);
} */
.preview-container {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10001;
}
.preview-box {
  height: 100vh;
}
.preview-box img {
  height: 100vh;
  cursor: pointer;
  border-radius: 0;
}
.pre,
.next {
  position: absolute;
  width: 50px;
  height: 100px;
  border-radius: 30px;
  cursor: pointer;
  top: 50%;
  left: 50%;
  z-index: 100;
}
.pre {
  transform: translateX(-700px);
}
.next {
  transform: translateX(650px);
}
video {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.loading-bar {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
