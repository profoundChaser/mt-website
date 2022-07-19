<template>
  <section class="text-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="title">{{title}}</h1>
    <p class="text-content">
        {{content}}
    </p>
  </section>
</template>

<script>
export default {
  props: {
    title: '',
    content: '',
  },
  data() {
    return {
    }
  },
  watch:{
    '$router.path':function(nv,ov){
        console.log(nv,ov)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-box {
    width: 53.5rem;
    margin-top: 80px;
    h1 {
      font-size: 2.875rem;
      color: #3bc66f;
    }

    .text-content {
      width: 39.375rem;
    }
  }

</style>
