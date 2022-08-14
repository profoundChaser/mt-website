<template>
  <div>
    <h1 class="form-title">修改用户密码</h1>
    <el-form ref="user" :model="user" :rules="rules" label-width="80px" label-position="top">
      <el-form-item label="原密码" prop="old_password">
        <el-input v-model="user.old_password" type="password"/>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input v-model="user.new_password" type="password"/>
      </el-form-item>
      <el-form-item label="再次确认新密码" prop="new_password2">
        <el-input v-model="user.new_password2" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="medium" @click="submitForm">保存</el-button>
        <el-button type="default" size="medium" @click="closeEditUserInfo">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateUserPwd, validateUserPwd } from '@/api/user'
export default {
  props: {
    userInfo: {
      type: Object,
    },
  },
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('原密码不能为空'))
      } else {
        this.validateUserPwd(value, callback)
      }
    }
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
      user: {
        old_password: null,
        new_password: null,
        new_password2: null,
      },
      rules: {
        old_password: [
          {
            validator: validateOldPass,
            trigger: 'blur',
            require:true
          },
        ],
        new_password: [
          {
            validator: validatePass,
            trigger: 'blur',
            require:true
          },
        ],
        new_password2: [
          {
            validator: validatePass2,
            trigger: 'blur',
            require:true
          },
        ],
      },
    }
  },
  methods: {
    async validateUserPwd(old_password, callback) {
      const res = await validateUserPwd({ id: this.userInfo.id, old_password })
      if (res.status !== 200) return callback(new Error(res.msg))
      callback()
    },
    async editUserInfo() {
      const res = await updateUserPwd({ id: this.userInfo.id, password: this.user.new_password })
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
    },
    closeEditUserInfo() {},
    submitForm() {
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.editUserInfo()
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-title {
  color: #3bc66f;
}
</style>
