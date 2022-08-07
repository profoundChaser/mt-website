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
            <i class="iconfont" :class="menu.icon"></i>
            <span slot="title" class="ml10">{{ menu.name }}</span>
          </el-menu-item>
          <el-menu-item
            :index="menu.path"
            v-for="(menu, index) in adminMenus"
            :key="menu.id"
            v-if="role == 'admin'"
          >
            <i class="iconfont" :class="menu.icon"></i>
            <span slot="title" class="ml10">{{ menu.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
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
          icon: 'icon-gerenxinxi',
        },
        {
          id: 1,
          name: '我的收藏',
          path: '/me/store',
          icon: 'icon-wodeshoucang',
        },
        {
          id: 2,
          name: '我的好友',
          path: '/me/friends',
          icon: 'icon-haoyou',
        },
        {
          id: 3,
          name: '我的评论',
          path: '/me/comments',
          icon: 'icon-dongtai01',
        },
      ],
      adminMenus: [
        {
          id: 4,
          name: '用户管理',
          path: '/me/users',
          icon: 'icon-yonghutianchong',
        },
        {
          id: 5,
          name: '角色管理',
          path: '/me/roles',
          icon: 'icon-role',
        },
        {
          id: 6,
          name: '图片管理',
          path: '/me/images',
          icon: 'icon-tupian',
        },
        {
          id: 7,
          name: '图片类型管理',
          path: '/me/imgcategories',
          icon: 'icon-fenlei',
        },
        {
          id: 8,
          name: '用户浏览下载统计',
          path: '/me/statistics',
          icon: 'icon-tubiao',
        },
        {
          id: 9,
          name: '日志管理',
          path: '/me/logs',
          icon: 'icon-rizhi',
        },
      ],
      activePath: '/me/info',
      role: '',
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    handleSelect(index) {
      this.activePath = index
    },
  },
  created() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.role = userInfo.role
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

      .iconfont {
        color: #fff;
      }
    }
  }
}
</style>
