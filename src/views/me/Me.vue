<template>
  <div id="me-index">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#000"
          active-text-color="#3bc66f"
          router
          @select="handleSelect"
          :collapse="false"
        >
          <el-menu-item :index="menu.path" v-for="(menu, index) in meMenus" :key="menu.id">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ menu.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      meMenus: [
        {
          id: 0,
          name: '个人信息',
          path: '/me/info',
        },
        {
          id: 1,
          name: '我的收藏',
          path:'/me/store'
        },
        {
          id: 2,
          name: '我的好友',
          path:'/me/friends'
        },
        {
          id: 3,
          name: '我的评论',
          path:'/me/comments'
        },
      ],
      activePath: '/me/info',
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    handleSelect(index) {
      this.activePath = index
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-menu {
  background: #fff !important;
  box-shadow: 0px 2.2px 2.2px rgba(0, 0, 0, 0.014), 0px 5.4px 5.3px rgba(0, 0, 0, 0.02),
    0px 10.1px 10px rgba(0, 0, 0, 0.025), 0px 18.1px 17.9px rgba(0, 0, 0, 0.03),
    0px 33.8px 33.4px rgba(0, 0, 0, 0.036), 0px 81px 80px rgba(0, 0, 0, 0.05);
  height: calc(100vh - 65px);
  .el-menu-item {
    background: #fff !important;

    &:hover {
      background: rgb(112, 209, 147) !important;
      color: #fff !important;

      .el-icon-menu {
        color: #fff !important;
      }
    }
  }
}
</style>
