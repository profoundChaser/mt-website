<template>
  <div id="login-index">
    <div class="login-content">
      <el-form
        :model="user"
        status-icon
        :rules="rules"
        ref="user"
        label-width="100px"
        class="demo-ruleForm"
        :label-position="labelPosition"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="user.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="user.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <div class="navigator-bar">
          <button class="forget" @click="toPwd">忘记密码?</button>
          <button class="to-register" @click="toRegister">注册</button>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('user')" id="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <hua-kuai v-if="verifyVisible" @verify="verify" id="huakuai"></hua-kuai>
    <div class="panel"></div>
    <div class="circle"></div>
    <div class="rect"></div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data() {
    // var validateEmail = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('邮箱不能为空'))
    //   } else {
    //     const regex = /^(?:\w+\.?)\w+@(?:\w+\.)+\w+$/
    //     if (regex.test(value)) {
    //       this.$refs.user.validateField('email')
    //     } else {
    //       callback(new Error('请输入正确的邮箱格式'))
    //     }
    //     callback()
    //   }
    // }
    return {
      labelPosition: 'top',
      user: {
        email: null,
        pwd: null,
      },
      rules: {
        email: [
          // {
          //   validator: validateEmail,
          //   trigger: 'blur',
          //   required: true,
          // },
        ],
        pwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
      },
      verifyVisible: false,
    }
  },
  methods: {
    openVerify() {
      this.verifyVisible = true
    },
    verify(result) {
      if (result) {
        this.login()
        this.verifyVisible = false
      }
    },
    async login() {
      const res = await login({
        email: this.user.email,
        password: this.user.pwd,
      })
      if (res.status !== 200) return this.$message.error(res.msg)
      localStorage.setItem('token',res.data.Token)
      this.$message.success(res.msg)
      this.$router.push('/home')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.openVerify()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    toPwd() {},
    toRegister() {
      this.$router.push('/register')
    },
  },
}
</script>

<style lang="scss" scoped>
.navigator-bar {
  display: flex;
  justify-content: space-between;
  button {
    color: #fff;
    opacity: 0.5;
    transition: all 0.1s linear;
    &:hover {
      text-decoration: underline;
    }
  }
  .forget {
    &:hover {
      color: #3bc66f;
      opacity: 1;
    }
  }
  .to-register {
    &:hover {
      color: rgb(240, 181, 73);
      opacity: 1;
    }
  }
}
#login-index {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background: radial-gradient(circle at 60% 90%, rgba(46, 103, 161, 1), transparent 60%),
    radial-gradient(circle at 20px 20px, rgba(46, 103, 161, 0.8), transparent 25%), #182336;
  .login-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
  .huakuai{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
  }
  .panel {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 400px;
    background: wheat;
    transform: translate(-50%, -50%) rotate(-10deg);
    z-index: 2;
    border-radius: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    background: linear-gradient(to top right, rgba(90, 149, 207, 0.5), rgba(58, 76, 99, 0.8));
    box-shadow: 10px -10px 20px rgba(0, 0, 0, 0.2), -10px 10px 20px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
  }
  .circle {
    width: 320px;
    height: 320px;
    position: absolute;
    left: 300px;
    bottom: 280px;
    background: linear-gradient(to top left, rgb(135 116 249), rgb(75 162 237));
    border-radius: 50%;
    z-index: 1;
  }
  .rect {
    width: 240px;
    height: 240px;
    position: absolute;
    right: 400px;
    bottom: 150px;
    background: linear-gradient(to top left, rgba(135, 116, 249, 0.9), rgba(75, 162, 237, 0.9));
    border-radius: 20px;
    z-index: 1;
    transform: rotate(50deg);
  }
}
::v-deep .el-form-item {
  .el-form-item__label {
    color: #fff;
    opacity: 0.5;
  }
}

.el-input {
  width: 400px;
}
#login-btn {
  width: 400px;
  background: #3bc66f;
  border: none;
  margin-top: 10px;
  &:hover {
    background: #53da84;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
