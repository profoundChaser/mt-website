<template>
  <el-dialog
    :center="center"
    :width="width"
    :visible.sync="visible"
    :append-to-body="appendToBody"
    :modal="modal"
    :top="top"
    :title="title"
    :modal-append-to-body="modalAppendToBody"
    :fullscreen="fullScreen"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :destroy-on-close="destroyOnClose"
    :show-close="showClose"
    :before-close="beforeClose"
    @open="open"
    @opened="opened"
    @closed="closed"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    //标题和底部居中对齐
    center: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '50%',
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    //与顶部距离
    top: {
      type: String,
      default: '15vh',
    },
    //头部标题
    title: {
      type: String,
    },
    //遮罩添加到body上
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
    //是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    //是否可以通过点击 ESC 关闭 Dialog
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Function,
      default: function () {},
    },
    opened: {
      type: Function,
      default: function () {},
    },
    close: {
      type: Function,
      default: function () {},
    },
    closed: {
      type: Function,
      default: function () {},
    },
    beforeClose: {
      type: Function,
      default: function () {},
    },
  },
  watch:{
    visible(nv,ov){
      console.log(nv,ov)
    } 
  }
}
</script>

<style lang="scss" scoped></style>
