<template>
  <div class="preview-container" @click="closePreview" v-if="previewVisible">
    <div class="preview-box" ref="previewBox">
      <img :src="preview.img" @click="openNewWindow(preview.img)" ref="previewImg" />
    </div>
    <template v-if="images.length > 0">
      <button class="icon-box pre" @click="pre">&lt;</button>
      <button class="icon-box next" @click="next">&gt;</button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    preview: {
      type: Object,
    },
    images: {
      type: Array,
      default: [],
    },
    propName: {
      type: String,
    },
    previewVisible: {
      type: Boolean,
      default: false,
    },
    closePreview: {
      type: Function,
      default: function () {},
    },
  },
  methods: {
    pre(e) {
      e.stopPropagation()
      if (this.preview.index === 0) {
        this.preview.index = 0
      } else {
        this.preview.index--
      }
      this.preview.img = this.images[this.preview.index][this.propName]
    },
    next(e) {
      e.stopPropagation()
      if (this.preview.index === this.images.length - 1) {
        this.preview.index = this.images.length - 1
      } else {
        this.preview.index++
      }
      this.preview.img = this.images[this.preview.index][this.propName]
    },
    openNewWindow(src) {
      //新窗口打开图片
      newWindow('/onePic')
      //存储图片
      localStorage.setItem('imgSrc', src)
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
