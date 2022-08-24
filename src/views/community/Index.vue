<template>
  <div class="count-index">
    <div class="showNum">{{ num }}</div>
    <el-select v-model="countVal">
      <el-option
        v-for="(item, index) in numOptions"
        :key="index"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
    <div class="count-bar mt10">
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="multiply">*</button>
      <button @click="divide">/</button>
      <button @click="incrementAsync">等一会再+</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import mutationType from '@/store/count/const'
export default {
  components: {},
  data() {
    return {
      numOptions: [1, 2, 3],
      countVal: 1,
    }
  },
  computed: {
    ...mapGetters('countStore', ['num']),
  },
  methods: {
    ...mapMutations('countStore', {
      incrementMapper: mutationType.INCREMENT,
      decrementMapper: mutationType.DECREMENT,
      multiplyMapper: mutationType.MULTIPLY,
      divideMapper: mutationType.DIVIDE,
    }),
    ...mapActions('countStore', ['incrementAsyncAction']),
    increment() {
      this.incrementMapper(this.countVal)
    },
    decrement() {
      this.decrementMapper(this.countVal)
    },
    multiply() {
      this.multiplyMapper(this.countVal)
    },
    divide() {
      this.divideMapper(this.countVal)
    },
    incrementAsync() {
      this.incrementAsyncAction({val:this.countVal,ms:3000})
    },
  },
}
</script>

<style lang="scss" scoped>
.count-index {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .count-bar {
    display: flex;

    button {
      width: 50px;
      height: 30px;
      background: wheat;
      margin-left: 10px;
    }
  }
}
</style>
