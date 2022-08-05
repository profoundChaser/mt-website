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
      default: [
        {
          name: '新增',
          icon: 'el-icon-plus',
          handleClick: function () {},
          type: 'primary',
        },
        {
          name: '修改',
          icon: 'el-icon-edit',
          handleClick: function () {},
          type: 'success',
          disabled: true,
        },
        {
          name: '删除',
          icon: 'el-icon-delete',
          handleClick: function () {},
          type: 'danger',
          disabled: true,
        },
        {
          name: '导出',
          icon: 'el-icon-download',
          handleClick: function () {},
          type: 'warning',
          disabled: true,
        },
      ],
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
