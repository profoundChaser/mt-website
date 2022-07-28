<template>
  <el-row :gutter="5">
    <el-col span="6">
      <Card :height="625">
        <div id="userInfo-box">
          <UserAvatar></UserAvatar>
          <div id="userInfo">
            <div>用户名：</div>
            <div>邮箱：</div>
            <div>性别：</div>
            <div>年龄：</div>
          </div>

        </div>
      </Card>
    </el-col>
    <el-col span="18">
      <Card :height="625" class="animate__animated animate__fadeInUp">
        <div class="form-container">
          <el-form ref="form" :model="user" :rules="rules" label-width="80px">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="user.nickName" />
            </el-form-item>
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="user.phonenumber" maxlength="11" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="user.email" maxlength="50" />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="user.sex">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="submit">保存</el-button>
              <el-button type="danger" size="mini" @click="close">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </Card>
    </el-col>
  </el-row>
</template>

<script>
import UserAvatar from './userAvatar.vue'
import Card from '@/components/common/Card.vue'
export default {
  data() {
    return {
      user: {
        nickName: '',
        email: '',
        phonenumber: null,
      },
      rules: {
        nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change'],
          },
        ],
        phonenumber: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  components: { UserAvatar, Card, Card },
}
</script>

<style lang="scss" scoped>
#userInfo-box{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
