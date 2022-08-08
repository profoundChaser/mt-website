<template>
  <div class="select-box">
    <span class="select-label" v-if="useLabel">{{ label }}</span>
    <el-select
      v-model="selectVal"
      placeholder="请选择"
      :size="size"
      :class="useMarginLeft?'ml10':''"
      :autoDefined="autoDefined"
      @change="change"
      @clear="clear"
      @blur="blur"
      @focus="focus"
      @visible-change="visibleChange"
    >
      <template v-if="!autoDefined">
        <el-option
          v-for="item in selectOptions"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        >
        </el-option>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    //是否自定义options
    autoDefined: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    selectOptions: {
      type: Array,
      default: [],
    },
    change: {
      type: Function,
      default: function () {},
    },
    blur: {
      type: Function,
      default: function () {},
    },
    focus: {
      type: Function,
      default: function () {},
    },
    clear: {
      type: Function,
      default: function () {},
    },
    visibleChange: {
      type: Function,
      default: function () {},
    },
    size: {
      type: String,
      default: 'small',
    },
    label: {
      type: String,
      default: '选择',
    },
    useLabel:{
      type:Boolean,
      default:true
    },
    useMarginLeft:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      selectVal: '',
    }
  },
  methods: {
    clearSelectVal() {
      this.selectVal = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.select-label {
  font-weight: 700;
  color: rgb(136, 136, 136);
}
</style>
