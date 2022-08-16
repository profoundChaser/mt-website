<template>
  <div>
    <el-tag
      :key="tag"
      v-for="(tag, index) in dynamicTags"
      closable
      :type="createRandomTags(index)"
      :disable-transitions="false"
      @close="handleClose(tag)"
      class="mt10 ml10"
    >
      {{ tag }}
    </el-tag>
    <el-input
      class="input-new-tag ml10"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag ml10" size="small" @click="showInput">+ 标签</el-button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
