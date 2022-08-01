<template>
  <div>
    <h1 class="form-title">忘记密码</h1>
    <el-steps :active="activeStep" finish-status="success" simple style="margin-top: 20px">
      <el-step title="邮件校验"> </el-step>
      <el-step title="重置密码"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <div class="forget-step-box">
      <template v-if="activeStep === 1">
        <div class="input-box">
          <label for="code">邮箱验证码:</label>
          <input type="text" name="code" id="code" ref="inputCode" v-model="code" />
          <button class="getcode-btn" ref="getCodeBtn" @click="getCode">获取验证码</button>
        </div>
      </template>
      <template v-else-if="activeStep === 2">
        <el-form ref="user" :model="user" :rules="rules" label-width="150px" label-position="top">
          <el-form-item label="新密码" prop="new_password">
            <el-input v-model="user.new_password" />
          </el-form-item>
          <el-form-item label="再次确认新密码" prop="new_password2">
            <el-input v-model="user.new_password2" style="width: 400px" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" style="width: 100%" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <div class="info">
          密码重置完成!&nbsp;请重新登录进行校验&nbsp;<span class="loginOut" @click="loginOut"
            >退出登录</span
          >
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'
import { getCode, verifyCode, updateUserPwd } from '@/api/user'
import { debounce } from '@/utils/utils'
export default {
  props: {
    userInfo: Object,
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.user.pwd !== '') {
          this.$refs.user.validateField('pwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.new_password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      activeStep: 1,
      timer: null,
      code: null,
      isSend: false,
      user: {
        new_password: null,
        new_password2: null,
      },
      rules: {
        new_password: [
          {
            validator: validatePass,
            trigger: 'blur',
          },
        ],
        new_password2: [
          {
            validator: validatePass2,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    async getCode() {
      let ts = 59
      const getCodeBtn = this.$refs.getCodeBtn
      getCodeBtn.disabled = true
      //是否发送
      this.isSend = true
      const res = await getCode({ email: this.userInfo.email })
      if (res.status === 200) {
        this.$message.success('验证码以发送至qq邮箱')
      }
      this.timer = setInterval(() => {
        getCodeBtn.innerHTML = `${ts--}s后重发`
        if (ts === 0) {
          getCodeBtn.disabled = false
          clearInterval(this.timer)
          this.isSend = false
        }
      }, 1000)
    },
    async checkCode() {
      if (this.isSend) {
        const res = await verifyCode({ code: this.code })
        if (res.status !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        this.activeStep = 2
      }
    },
    checkSend() {
      if (!this.isSend) {
        this.$message.error('请先发送邮件')
      }
    },
    async updateUserPwd() {
      const res = await updateUserPwd({ id: this.userInfo.id, password: this.user.new_password })
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
    },
    submitForm() {
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.updateUserPwd()
          this.activeStep = 3
        } else {
          return false
        }
      })
    },
    loginOut() {
      localStorage.clear()
      this.$router.replace('/login')
    },
  },
  components: { Card },
  mounted() {
    this.$refs.inputCode.addEventListener('input', debounce(this.checkCode, 500))
    this.$refs.inputCode.addEventListener('focus', debounce(this.checkSend, 500))
  },
  destroyed() {
    this.$refs.inputCode.removeEventListener('input', debounce(this.checkCode, 500))
    this.$refs.inputCode.removeEventListener('focus', debounce(this.checkSend, 500))
  },
}
</script>

<style lang="scss" scoped>
.form-title {
  color: #3bc66f;
}
.forget-step-box {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  .input-box {
    width: 50%;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    label {
      width: 25%;
    }
    input {
      width: 100%;
      height: 100%;
      outline: none;
      background: rgb(231, 231, 231);
      border: none;
      &:hover {
        border: 1px solid #3bc66f;
        background: #fff;
      }
    }
    .getcode-btn {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 1;
      width: 100px;
      height: 100%;
      color: #fff;
      background: #3bc66f;
      &:disabled {
        color: rgb(145, 144, 144);
        background: rgb(200, 200, 200);
      }
    }
  }
}
.info {
  font-size: 35px;
  color: #3bc66f;
  font-weight: 700;
  .loginOut {
    color: #000;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
