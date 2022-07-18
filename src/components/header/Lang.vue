<template>
  <div>
    <el-select v-model="lang">
      <el-option v-for="lang in langs" :key="lang.id" :label="lang.name" :value="lang.name">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: '中文',
      langs: [
        {
          id: 0,
          name: '中文',
        },
        {
          id: 1,
          name: 'English',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-select {
  .el-input__inner {
    width: 100px;
    border: none;
  }
}
</style>
