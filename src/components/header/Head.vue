<template>
  <div class="header">
    <div class="logo">
      <img src="../../assets/img/logo/vein.png" alt="logo" style="width: 40px" />
    </div>
    <Search></Search>
    <Tabs :tabs="tabs"></Tabs>
    <el-divider direction="vertical"></el-divider>
    <div class="user-box">
      <template v-if="!isLogin">
        <button class="login-btn ml10" @click="login">登录</button>
        <span class="slash ml10">/</span>
        <button class="register-btn ml10" @click="register">注册</button>
      </template>
      <template v-else>
        <div class="avatar ml10">
          <img src="" alt="" />
        </div>
        <div class="username ml10">xxx</div>
      </template>
    </div>
    <Theme id="theme"></Theme>
    <Lang></Lang>
  </div>
</template>

<script>
import Search from './search/Search.vue'
import Tabs from './Tabs.vue'
import Theme from './Theme.vue'
import Lang from './Lang.vue'
import { defineStore } from 'pinia'
export default {
  data() {
    return {
      tabs: [
        {
          id: 0,
          name: '首页',
          path: '/home',
        },
        {
          id: 2,
          name: '素材',
          path: '/imgs',
        },
        {
          id: 1,
          name: '我的',
          path: '/me',
        },
        {
          id: 3,
          name: '社区',
          path: '/comment',
        },
      ],
      isLogin: false,
      isLight: false,
    }
  },
  components: { Search, Tabs, Theme, Lang },
  methods: {
    login() {
      this.$router.push('/login')
    },
    register() {
      this.$router.push('/register')
    },
    checkIsLogin() {
      this.isLogin = localStorage.getItem('token') ? true : false
    },
  },
  mounted() {
    //检测用户是否登录成功
    this.checkIsLogin()
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 10px;
  background: #fff;
  display: flex;
  /* position: fixed;
  top: 0;
  left: 0;
  z-index:10000; */
  align-items: center;
  border-bottom: 1px solid rgb(214, 213, 213);
  box-shadow: 0px 2.2px 2.2px rgba(0, 0, 0, 0.014), 0px 5.4px 5.3px rgba(0, 0, 0, 0.02),
    0px 10.1px 10px rgba(0, 0, 0, 0.025), 0px 18.1px 17.9px rgba(0, 0, 0, 0.03),
    0px 33.8px 33.4px rgba(0, 0, 0, 0.036), 0px 81px 80px rgba(0, 0, 0, 0.05);
  .user-box {
    display: flex;
    align-items: center;
    .login-btn,
    .register-btn {
      &:hover {
        color: #3bc66f;
      }
    }
    .avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: gray;
    }
  }

  #theme {
    margin-left: 80px;
  }
}

.el-divider--vertical {
  height: 30px;
}
</style>
