<template>
  <el-row :gutter="5">
    <el-col :span="6">
      <Card :height="625" id="userInfo-card">
        <div id="userInfo-box">
          <UserAvatar :img="user.avatar" :user="user"></UserAvatar>
          <div class="username">{{ user.name }}</div>
          <div id="userInfo" class="mt20 ml20">
            <div class="email">邮箱：{{ user.email }}</div>
            <div class="sex mt10">性别：{{ user.sex }}</div>
            <div class="role mt10">身份：{{ user.role == 'admin' ? '管理员' : '用户' }}</div>
          </div>
        </div>
        <div id="select-box" @click="showSomeInfo($event)">
          <Card class="select-card">编辑信息</Card>
          <Card class="select-card">修改密码</Card>
          <Card class="select-card">忘记密码</Card>
        </div>
      </Card>
    </el-col>
    <el-col :span="18">
      <Card :height="625" class="animate__animated animate__fadeInUp">
        <div class="form-container">
          <template v-if="showEditV">
            <h1 class="form-title">编辑用户信息</h1>
            <keep-alive>
              <el-form
                ref="form"
                :model="user"
                :rules="rules"
                label-width="80px"
                label-position="top"
              >
                <el-form-item label="用户昵称" prop="name">
                  <el-input v-model="editUser.name" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="editUser.email" maxlength="50" />
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="editUser.sex">
                    <el-radio label="0">男</el-radio>
                    <el-radio label="1">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" size="medium" @click="editUserInfo">保存</el-button>
                  <el-button type="default" size="medium" @click="closeEditUserInfo"
                    >关闭</el-button
                  >
                </el-form-item>
              </el-form>
            </keep-alive>
          </template>
          <template v-else-if="showPwdV">
            <keep-alive>
              <UpdatePwd :userInfo="user"></UpdatePwd>
            </keep-alive>
          </template>
          <template v-else-if="showForgetV">
            <keep-alive>
              <ForgetPwd :userInfo="user"></ForgetPwd>
            </keep-alive>
          </template>
        </div>
      </Card>
    </el-col>
  </el-row>
</template>

<script>
import UserAvatar from './userAvatar.vue'
import Card from '@/components/common/Card.vue'
import { updateUserInfo } from '@/api/user'
import UpdatePwd from './updatePwd.vue'
import ForgetPwd from './forgetPwd.vue'
export default {
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
    }
    return {
      user: {
        id: null,
        name: null,
        email: null,
        sex: null,
        avatar: null,
      },
      editUser: {
        name: null,
        email: null,
        sex: null,
      },
      rules: {
        name: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
        email: [
          {
            validator: validateEmail,
            trigger: 'blur',
            required: true,
          },
        ],
      },
      showEditV: true,
      showPwdV: false,
      showForgetV: false,
    }
  },
  components: { UserAvatar, Card, UpdatePwd, ForgetPwd },
  methods: {
    getUserInfo() {
      this.user = JSON.parse(localStorage.getItem('userInfo'))
      this.getEditUserInfo()
    },
    getEditUserInfo() {
      this.editUser.name = this.user.name
      this.editUser.email = this.user.email
      this.editUser.sex = this.user.sex === '男' ? '0' : '1'
    },
    showSomeInfo(e) {
      const val = e.target.innerHTML
      if (val === '编辑信息') {
        this.showEdit()
      } else if (val === '修改密码') {
        this.showPwd()
      } else {
        this.showForget()
      }
    },
    showEdit() {
      this.showEditV = true
      this.showPwdV = false
      this.showForgetV = false
    },
    showPwd() {
      this.showPwdV = true
      this.showEditV = false
      this.showForgetV = false
    },
    showForget() {
      this.showForgetV = true
      this.showPwdV = false
      this.showEditV = false
    },
    async editUserInfo() {
      const res = await updateUserInfo({
        id: this.user.id,
        user: this.editUser,
      })
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      this.getUserInfo()
    },
    closeEditUserInfo() {},
  },
  mounted() {
    this.getUserInfo()
  },
}
</script>

<style lang="scss" scoped>
.form-title {
  color: #3bc66f;
}
#userInfo-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .username {
    font-size: 24px;
    color: rgb(99, 99, 99);
  }
  #userInfo {
    width: 100%;
  }
}
#userInfo-card {
  position: relative;
  #select-box {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .select-card {
    background: #ffccff;
    transition: all 0.2s ease-in-out;

    &:nth-child(2) {
      background: #ffcccc;
    }

    &:nth-child(3) {
      background: #ffff99;
    }
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
}
</style>
