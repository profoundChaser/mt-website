<template>
  <el-card ref="card" id="card">
    <slot></slot>
  </el-card>
</template>

<script>
import { getRdNum } from '@/utils/utils'
export default {
  props: {
    bodyStyle: {
      type: Object,
      default: { padding: '20px' },
    },
    shadowType: {
      type: String,
      default: 'always',
    },
    height: {
      type: Number,
    },
  },
  data() {
    return {
      colors: ['#ffff99', '#ffcccc', '#ffccff', '#99ffff', '#FFEC8B'],
    }
  },
  methods: {
    createColor() {
      return this.colors[getRdNum(0, this.colors.length - 1)]
    },
  },
  mounted() {
    const card = this.$refs.card
    // card.$el.style.background = this.createColor()
    card.$el.style.height = this.height + 'px'
  },
}
</script>

<style lang="scss" scoped>
#card {
  color: #000;
}
</style>
