<template>
  <div class="search-bar">
    <slot></slot>
    <BtnList :btnList="btnList" class="ml20"></BtnList>
  </div>
</template>

<script>
import BtnList from '../Button/BtnList.vue'
export default {
  components: { BtnList },
  props: {
    handleSearch: {
      type: Function,
      default: function () {},
    },
    handleReset: {
      type: Function,
      default: function () {},
    },
  },
  data() {
    return {
      btnList: [],
    }
  },

  methods: {
    initBtnList() {
      this.btnList = [
        {
          name: '搜索',
          icon: 'el-icon-search',
          handleClick: this.handleSearch,
          disabled: false,
          type:'primary',
          style:{background:'rgb(4, 202, 202)',borderColor:'rgb(4, 202, 202)'}
        },
        {
          name: '重置',
          icon: 'el-icon-refresh',
          handleClick: this.handleReset,
          type: 'default',
        },
      ]
    },
  },
  created() {
    this.initBtnList()
  },
}
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  display: flex;
}
</style>
