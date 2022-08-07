<template>
  <div class="btn-list">
    <el-button
      v-for="btn in btnList"
      :key="btn.icon"
      @click="btn.handleClick"
      :icon="btn.icon"
      :type="btn.type ? btn.type : 'default'"
      :size="size"
      :disabled="btn.disabled ? btn.disabled : false"
      :style="btn.style ? btn.style : {}"
      >{{ btn.name }}</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    btnList: {
      type: Array,
      default:function(){
        return []
      }
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    usePlain: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'small',
    },
  },
}
</script>

<style lang="scss" scoped></style>
