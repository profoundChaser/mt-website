<template>
  <div id="search-box" class="ml10">
    <div class="iconbox" ref="searchIcon">
      <i class="el-icon-search"></i>
    </div>
    <input
      type="search"
      name=""
      id="search-input"
      placeholder="请输入关键字,比如美女"
      v-model="searchVal"
      @focus="controlIconStyle"
      @blur="restoreIconStyle"
    />
    <div class="iconbox">
      <i class="el-icon-upload"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: null,
    }
  },
  methods: {
    controlIconStyle() {
      const searchIcon = this.$refs.searchIcon
      searchIcon.style.background = '#fff'
      searchIcon.style.borderWidth='1px 0 1px 1px'
      // searchIcon.style.borderColor='rgb(176, 175, 175)'
      searchIcon.style.borderColor='#3bc66f'
      searchIcon.style.borderStyle='solid'
    },
    restoreIconStyle() {
      const searchIcon = this.$refs.searchIcon
      searchIcon.style.background = 'rgb(231, 231, 231)'
      searchIcon.style.border='none'
    },
  },
}
</script>

<style lang="scss" scoped>
#search-box {
  position: relative;
  width: 670px;
  display: flex;
  #search-input {
    min-width: 300px;
    width: 100%;
    background: rgb(231, 231, 231);
    border: none;
    outline: none;
    height: 38px;
    &::placeholder {
      color: rgb(98, 98, 98);
      font-size: 0.8rem;
    }
    &:focus {
      background: #fff;
      border-top: 1px solid rgb(176, 175, 175);
      border-bottom: 1px solid rgb(176, 175, 175);
      border-top: 1px solid #3bc66f;
      border-bottom: 1px solid #3bc66f;
    }
    &:focus ~ .iconbox {
      background: #fff;
      border-width: 1px 1px 1px 0;
      border-color: #3bc66f;
      border-style: solid;
    }
  }

  .iconbox {
    width: 45px;
    height: 38px;
    background: rgb(231, 231, 231);
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 1.875rem;
    border-top-left-radius: 1.875rem;
    cursor: pointer;
    &:last-child {
      border-bottom-right-radius: 1.875rem;
      border-top-right-radius: 1.875rem;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
}
</style>
