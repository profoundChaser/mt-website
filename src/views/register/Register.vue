<template>
  <div class="register-index">
    <div class="left" ref="left">
      <div class="content">
        <h1>创建从这里开始</h1>
        <P>
          访问
          <!-- 计数组件 -->
          <ICountUp :endVal="endVal" :options="options" />
          张在其他任何地方都找不到</P
        >
        <P class="mt10">的免费高分辨率照片</P>
      </div>
    </div>
    <div class="right">
      <div class="logo-box">
        <img src="../../assets/img/logo/vein.png" alt="logo" style="width: 80px" />
      </div>
      <div class="ishave-account mt10">
        <span>已有账号？</span><button @click="toLogin">登录</button>
      </div>
      <el-form
        :model="user"
        status-icon
        :rules="rules"
        ref="user"
        label-width="100px"
        class="register-user"
        :label-position="labelPosition"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="user.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group>
            <el-radio-group v-model="user.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="user.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="password" v-model="user.checkPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" id="register-btn" @click="submitForm('user')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2'
import { register } from '@/api/user'
import { getRandomImage } from '@/api/image'
export default {
  components: {
    ICountUp,
  },
  data() {
    var validateEmail = (rule, value, callback) => {
      const regex = /^(?:\w+\.?)\w+@(?:\w+\.)+\w+$/
      if (value == '') {
        callback(new Error('邮箱不能为空'))
      } else if (regex.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'top',
      user: {
        pwd: null,
        checkPwd: null,
        username: null,
        email: null,
        sex: '0',
      },
      endVal: null,
      rules: {
        email: [
          {
            validator: validateEmail,
            trigger: 'blur',
            required: true,
          },
        ],
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        pwd: [
          {
            validator: validatePass,
            trigger: 'blur',
            required: true,
          },
        ],

        checkPwd: [
          {
            validator: validatePass2,
            trigger: 'blur',
            required: true,
          },
        ],
      },
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
      },
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
    // onReady(instance, CountUp) {
    //   const that = this
    //   instance.update(that.endVal + 1000)
    // },
    async register() {
      const res = await register({
        name: this.user.username,
        email: this.user.email,
        password: this.user.pwd,
        sex: this.user.sex,
      })
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.$router.push('/login')
    },
    async getRandomImage() {
      const left = this.$refs.left
      const res = await getRandomImage()
      if (res.status !== 200) return
      const { data } = res
      console.log(res)
      left.style.background = `url(${data.img.imgUrl}) no-repeat scroll`
      left.style.backgroundSize = '100%'
      this.endVal = data.count
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register()
        } else {
          return false
        }
      })
    },
  },
  mounted() {
    this.getRandomImage()
  },
}
</script>

<style lang="scss" scoped>
.register-index {
  display: flex;
  .left {
    width: 600px;
    height: 100vh;
    background: url('https://images.unsplash.com/photo-1658107291228-e23746256f5a?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb');
    background-size: 100% 100%;
    animation: down 0.5s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      color: #fff;
      display: flex;
      flex-direction: column;
      width: 60%;
      h1 {
        font-size: 50px;
      }

      p {
        font-size: 20px;

        .nums {
          color: #ffffff;
        }
      }
    }
  }
  .right {
    width: calc(100% - 600px);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: up 0.5s ease-in-out;
    flex-direction: column;
    .ishave-account {
      display: flex;

      button {
        color: #3bc66f;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.el-input {
  width: 400px;
}
#register-btn {
  width: 400px;
  background: #3bc66f;
  border: none;
  margin-top: 10px;
  &:hover {
    background: #53da84;
  }
}
@keyframes up {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes down {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
