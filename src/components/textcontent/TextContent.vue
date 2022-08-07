<template>
  <section class="text-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: item.path }" v-for="item in nav" :key="item.path">{{
        item.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="title">{{ title }}</h1>
    <p class="text-content">
      {{ content }}
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
      nav: [
        {
          path: '/home',
          title: '首页',
        },
      ],
    }
  },
  methods: {
    checkPathToGetNav(path, title) {
      if (this.checkPathInNav) return
      console.log('执行了')
      this.nav.this.nav.push({
        path,
        title,
      })
    },
    checkPathInNav(path) {
      return this.nav.some((item) => {
        return item.path === path
      })
    },
  },
  mounted() {
    this.checkPathToGetNav(this.$route.fullPath, this.$route.meta.title)
  },
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
