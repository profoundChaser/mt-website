<template>
  <div class="input-box">
    <span class="search-label">{{ label }}</span>
    <el-input
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :suffix-icon="suffixIcon"
      :prefix-icon="prefixIcon"
      class="ml10"
      :style="{ width: width + 'px' }"
      @clear="clear"
      @blur="blur"
      @change="change"
      @focus="focus"
      @input="input"
      :size="size"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入内容',
    },
    label: {
      type: String,
      default: '搜索',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    suffixIcon: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 200,
    },
    blur: {
      type: Function,
      default: function () {},
    },
    focus: {
      type: Function,
      default: function () {},
    },
    change: {
      type: Function,
      default: function () {},
    },
    input: {
      type: Function,
      default: function () {},
    },
    clear: {
      type: Function,
      default: function () {},
    },
  },
}
</script>

<style lang="scss" scoped>
.search-label {
  font-weight: 700;
  color: rgb(136, 136, 136);
}
</style>
