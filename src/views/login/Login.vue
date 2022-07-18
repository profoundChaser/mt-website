<template>
  <div id="login-index">
    <div class="login-content">
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
        <!-- <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="password" v-model="ruleForm.checkPwd" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" id="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="panel"></div>
    <div class="circle"></div>
    <div class="rect"></div>
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
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
    /* top:0;
    left:0; */
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
