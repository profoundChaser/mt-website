<template>
  <div>
    <div class="toolbar" ref="toolbar">
      <template>
        <div class="icon-box" @click="fullScreen" v-if="!isFullScreen">
          <i class="iconfont icon-quanping"></i>
        </div>
        <div class="icon-box" @click="outFullScreen" v-else>
          <i class="iconfont icon-ExitFullScreen"></i>
        </div>
      </template>
      <div class="screen-shot icon-box mt10" ref="screenShot" @click="createShot">
        <i class="iconfont icon-paizhao"></i>
      </div>
      <div class="icon-box mt10" @click="downloadZip">
        <i class="iconfont icon-xiazai"></i>
      </div>
      <!-- 自定义操作栏二外的功能 -->
      <slot></slot>
      <div class="menuTop icon-box mt10" ref="toBtn" @click="toTop">
        <i class="iconfont icon-shangyi"></i>
      </div>
    </div>
    <div class="mask" v-show="isCapture" ref="mask" @click="closeMask">
      <div class="canvasBox" ref="canvasBox"></div>
      <div class="download icon-box" @click="downLoadCanvas">
        <i class="iconfont icon-xiazai"></i>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'
import { st } from '@/utils/utils'
import { fullScreen, outFullScreen } from '@/utils/fullScreen'
import { downloadMoreWidthZip, ImgWithSaveFile } from '@/utils/file'
export default {
  name: 'About',
  props: {},
  data() {
    return {
      st: 0,
      isCapture: false,
      canvas: null,
      isFullScreen: false,
      singlePicFlag: true,
    }
  },
  methods: {
    createShot() {
      this.toTopVisible = false
      this.isCapture = true
      const canvasBox = this.$refs.canvasBox
      const toolbar = this.$refs.toolbar
      const mask = this.$refs.mask
      toolbar.style.display = 'none'
      canvasBox.innerHTML = ''
      let scrollTop = st()
      mask.style.top = scrollTop + 'px'
      html2canvas(document.body, {
        y: scrollTop,
        height: window.innerHeight,
        scale: window.devicePixelRatio,
      }).then((canvas) => {
        this.canvas = canvas
        canvas.style.width = '1280px'
        canvas.style.height = 'auto'
        canvasBox.appendChild(canvas)
        //隐藏滚动条
        document.body.style.overflow = 'hidden'
      })
    },
    closeMask() {
      this.isCapture = false
      document.body.style.overflow = 'auto'
      const toolbar = this.$refs.toolbar
      toolbar.style.display = 'block'
    },
    listenScrollToShowBtn() {
      window.addEventListener('scroll', this.showBtn)
    },
    showBtn() {
      this.st = st()
      if (this.st > window.innerHeight) {
        const btn = this.$refs.toBtn
        btn.style.display = 'flex'
        btn.style.transform = 'translateY(0)'
      }
      if (this.st === 0) {
        this.toTop()
      }
    },
    toTop() {
      window.scrollTo({
        left: 0,
        top: -this.st,
        behavior: 'smooth',
      })
      const btn = this.$refs.toBtn
      btn.style.transform = 'translateY(300%)'
    },
    downLoadCanvas() {
      this.canvas.toBlob((blob) => {
        FileSaver.saveAs(blob, 'mv' + Date.now())
      })
    },
    fullScreen() {
      this.isFullScreen = true
      fullScreen()
    },
    outFullScreen() {
      this.isFullScreen = false
      outFullScreen()
    },
    downloadZip() {
      if (this.singlePicFlag) {
        ImgWithSaveFile(localStorage.getItem('imgSrc'))
      } else {
        const urls = JSON.parse(localStorage.getItem('downloadFiles'))
        if (urls.length === 0) return this.$message.warning('至少选择一个图片')
        downloadMoreWidthZip(urls)
      }
    },
  },
  mounted() {
    this.listenScrollToShowBtn()
  },
  destroyed() {
    window.removeEventListener('scroll', this.showBtn)
  },
}
</script>

<style scoped>
.toolbar {
  width: 50px;
  position: fixed;
  bottom: 60px;
  right: 50px;
  z-index: 500;
}
.mask {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:10002;
}
.menuTop {
  transform: translateY(300%);
  transition: all 0.5s ease-in-out;
}
.icon-paizhao,
.icon-xiazai,
.icon-quanping,
.icon-ExitFullScreen,
.icon-shangyi {
  font-size: 30px;
}

.download {
  position: absolute;
  right: 50px;
  bottom: 50px;
}
</style>
