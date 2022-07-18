<template>
  <div class="register-index">
    <div class="left"></div>
    <div class="right">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :label-position="labelPosition"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="password" v-model="ruleForm.checkPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" id="register-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'top',
      ruleForm: {
        pwd: null,
        checkPwd: null,
        username: null,
        email: null,
      },
    }
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
    background-position: center;
  }
  .right {
    width: calc(100% - 600px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.el-input {
  width: 400px;
}
#register-btn {
  width: 400px;
  background:#3bc66f;
  border: none;
  margin-top: 10px;
}

</style>
