<template>
  <div class="single-mv-index" ref="singleMvIndex">
    <div class="img-Box">
      <img :src="src" alt="一张美女图片" ref="img" @mouseup="mouseup" @mousedown="dragImg" />
    </div>
  </div>
</template>

<script>
import ToolBar from '@/components/toolBar/ToolBar.vue'
import { getClientW } from '@/utils/utils'
import Grade from 'grade-js'
import { dataURLtoFile, imgToBase64 } from '@/utils/file'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
export default {
  components: { ToolBar },
  data() {
    return {
      src: window.localStorage.getItem('imgSrc'),
      imgObj: null,
      arr: [1, 2, 3, 4, 5, 6],
      arr2: [7, 8, 9, 10, 11, 12],
    }
  },
  methods: {
    download(src) {
      const zip = new JSZip()
      const blob = dataURLtoFile(imgToBase64(src))
      zip.file('mv' + Date.now()+'.png', blob, { binary: true })
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        FileSaver.saveAs(content, 'example.zip')
      })
    },
    dragImg(img) {
      img.preventDefault()
      this.imgObj = img
      window.addEventListener('mousemove', this.move)
    },
    mouseup() {
      window.removeEventListener('mousemove', this.move)
      this.getContainerH()
    },
    move(e) {
      let { pageX, pageY } = e
      this.imgObj.target.style.position = 'absolute'
      this.imgObj.target.style.left = pageX - this.imgObj.offsetX + 'px'
      this.imgObj.target.style.top = pageY - this.imgObj.offsetY + 'px'
      //边界判断
      if (this.imgObj.target.offsetTop <= 0) {
        this.imgObj.target.style.top = 0 + 'px'
      }
      if (this.imgObj.target.offsetLeft <= 0) {
        this.imgObj.target.style.left = 0 + 'px'
      }
      if (
        +this.imgObj.target.style.left.split('px')[0] + this.imgObj.target.clientWidth >=
        this.client.width
      ) {
        this.imgObj.target.style.left = this.client.width - this.imgObj.target.clientWidth + 'px'
      }
      this.getContainerH()
    },
    getContainerH() {
      const singleMvIndex = this.$refs.singleMvIndex
      singleMvIndex.style.height =
        this.imgObj.target.clientHeight + this.imgObj.target.offsetTop + this.paddingH + 'px'
      if (singleMvIndex.clientHeight < this.client.height) {
        singleMvIndex.style.height = this.client.height + 'px'
      }
    },
    showRotateIcon() {},
    setContainerBg(container) {
      window.addEventListener('load', () => {
        Grade(container)
      })
    },
    zoomUpOrLow(e) {
      e.stopPropagation()
      const img = this.$refs.img
      if (!this.isZoomUp) {
        img.style.width = img.naturalWidth * 2 + 'px'
        img.style.height = img.naturalHeight * 2 + 'px'
      } else {
        img.style.width = img.naturalWidth / 2 + 'px'
        img.style.height = img.naturalHeight / 2 + 'px'
      }
      this.isZoomUp = !this.isZoomUp
    },
    initImgAndBg() {
      const singleMvIndex = this.$refs.singleMvIndex
      const img = this.$refs.img
      const { paddingTop, paddingBottom } = window.getComputedStyle(singleMvIndex)
      this.paddingTop = +paddingTop.split('px')[0]
      this.paddingBottom = +paddingBottom.split('px')[0]
      this.paddingH = this.paddingTop + this.paddingBottom
      this.client = getClientW()
      img.onload = () => {
        singleMvIndex.style.height = img.clientHeight + img.offsetTop + this.paddingH + 'px'
        if (singleMvIndex.clientHeight < this.client.height) {
          singleMvIndex.style.height = this.client.height + 'px'
        }
      }
      this.setContainerBg(singleMvIndex)
    },
  },
  mounted() {
    this.initImgAndBg()
  },
}
</script>

<style scoped lang="scss">
.single-mv-index {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
  .img-Box {
    clear: both;
  }
  img {
    width: 800px;
    border-radius: 10px;
    box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07);
  }
}
.nav {
  width: 300px;
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 100px;
  height: 60px;
  background: pink;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  cursor: move;
}
</style>