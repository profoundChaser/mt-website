<template>
  <el-card ref="card" id="card" :body-style="bodyStyle">
    <slot></slot>
  </el-card>
</template>

<script>
import { getRdNum } from '@/utils/utils'
export default {
  props: {
    bodyStyle: {
      type: Function,
      default: ()=>{ padding: '20px' },
    },
    shadowType: {
      type: String,
      default: 'always',
    },
    height: {
      type: Number,
    },
    useColor:{
      type:Boolean,
      default:false
    }
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
    card.$el.style.height = this.height + 'px'
    if(this.useColor){
       card.$el.style.background = this.createColor()
    }
  },
}
</script>

<style lang="scss" scoped>
#card {
  color: #000;
}
</style>
