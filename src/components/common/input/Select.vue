<template>
  <div class="select-box">
    <span class="select-label">{{ label }}</span>
    <el-select v-model="selectVal" placeholder="请选择" :size="size" class="ml10">
      <el-option
        v-for="item in selectOptions"
        :key="item.id"
        :label="item.label"
        :value="item.id"
        @change="change"
        @clear="clear"
        @blur="blur"
        @focus="focus"
        @visible-change="visibleChange"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
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
    size:{
      type:String,
      default:'small'
    },
    label:{
      type:String,
      default:'选择'
    }
  },
  data() {  
    return {
      selectVal: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.select-label {
  font-weight: 700;
  color: rgb(136, 136, 136);
}
</style>
