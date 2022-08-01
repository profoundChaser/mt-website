<template>
  <div class="header" ref="header">
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
          <img :src="userInfo.avatar" alt="" />
        </div>
        <div class="username ml10">{{ userInfo.name }}</div>
        <button class="out-btn ml10" @click="loginOut">退出</button>
        <div class="iconbox ml10" @click="toUploadImg">
          <i class="el-icon-upload"></i>
        </div>
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
import { mapMutations } from 'vuex'

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
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem('userInfo'))
    },
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
    loginOut() {
      localStorage.clear()
      this.isLogin = false
    },
    toUploadImg(){
      this.$router.push('/upload')
    }
    //  store处理方法
    // setOffsetHeight(osh) {
    //   this.$store.commit('SET_OFFSETHEIGHT', osh)
    // },
    // ...mapMutations('headerStore', { setOffsetHeight: 'SET_OFFSETHEIGHT' }),
  },
  mounted() {
    //检测用户是否登录成功
    this.checkIsLogin()
    // this.setOffsetHeight(this.$refs.header.offsetHeight)
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
    width: 200px;
    .login-btn,
    .register-btn,
    .out-btn {
      color: rgb(99, 99, 99);
      &:hover {
        color: #3bc66f;
      }
    }
    .avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: gray;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  #theme {
    margin-left: 80px;
  }
}

.el-divider--vertical {
  height: 30px;
}
.iconbox {
  position: relative;
  &:hover .el-icon-upload {
    color: #3bc66f;
  }
  &::after {
    content: '点击上传图片';
    position: absolute;
    width: 100px;
    height: 40px;
    background: #3bc66f;
    color: #fff;
    display: none;
    top: 90%;
    border-radius: 10px;
    display: none;
    align-items: center;
    justify-content: center;
    transform: translate(0);
    box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07);
  }
  &:hover::after {
    display: flex;
  }
  .el-icon-upload {
    font-size: 30px;
  }
}
</style>
