<template>
  <div id="users-Index">
    <!-- 分隔布局 -->
    <el-row :gutter="20">
      <!-- 搜索区域 -->
      <el-col>
        <SearchBar :handleReset="handleReset" :handleSearch="handleSearch">
          <Input
            placeholder="请输入名字"
            v-model="queryInfo.query"
            clearable
            label="姓名"
            size="small"
            :change="changeNameSearch"
            :clear="clearNameSearch"
            ref="inputName"
          >
          </Input>
          <Select
            placeholder="请选择性别"
            class="ml20"
            :selectOptions="selectOptions"
            label="性别"
            :change="changeSex"
            ref="selectSex"
          ></Select>
          <Select
            placeholder="请选择角色"
            class="ml20"
            :selectOptions="selectOptions2"
            label="角色"
            :autoDefined="true"
            :change="changeRole"
            ref="selectRole"
          >
            <el-option
              v-for="item in selectOptions2"
              :key="item.id"
              :label="item.roleName === 'admin' ? '管理员' : '用户'"
              :value="item.id"
            >
            </el-option>
          </Select>
        </SearchBar>
      </el-col>
      <!-- 添加区域 -->
    </el-row>
    <el-row class="mt20">
      <BtnList :btnList="btnList"></BtnList>
    </el-row>
    <el-row class="mt20">
      <Table
        :tableData="tableData"
        :columns="columns"
        :tableMutiSelect="true"
        @handleSizeChange="handleSizeChange"
        @handleIndexChange="handleIndexChange"
        :handleSelectionChange="handleSelectionChange"
        :pageInfo="pageInfo"
      >
        <template slot-scope="scope" slot="slotColumn">
          <div v-if="scope.column.prop == 'roleId'">
            <div v-if="scope.row.roleId == 1">用户</div>
            <div v-else>管理员</div>
          </div>
        </template>
      </Table>
    </el-row>
    <!-- 新增用户 -->
    <el-dialog :visible.sync="addDialogVisible" title="新增用户" width="50%">
      <el-form
        :model="user"
        status-icon
        :rules="rules"
        ref="user"
        label-width="100px"
        class="register-user"
        label-position="left"
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
        <el-form-item label="选择身份" prop="checkPwd">
          <el-select placeholder="请选择角色" ref="selectRole" v-model="user.roleId">
            <el-option
              v-for="item in selectOptions2"
              :key="item.id"
              :label="item.roleName === 'admin' ? '管理员' : '用户'"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="operateBar">
            <el-button type="success" id="register-btn" @click="addUserSubmit('user')"
              >注册</el-button
            >
            <el-button type="default" id="cancel-btn" @click="addUserCancel('user')"
              >取消</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog
      :visible.sync="updateDialogVisible"
      title="修改用户"
      width="50%"
      @close="closeUpdateDialog"
    >
      <el-form
        :model="updateUser"
        status-icon
        :rules="updateUserRules"
        ref="updateUser"
        label-width="100px"
        class="register-user"
        label-position="left"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="updateUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="updateUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group>
            <el-radio-group v-model="updateUser.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择身份" prop="checkPwd">
          <el-select placeholder="请选择角色" ref="selectRole" v-model="updateUser.roleId">
            <el-option
              v-for="item in selectOptions2"
              :key="item.id"
              :label="item.roleName === 'admin' ? '管理员' : '用户'"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="operateBar">
            <el-button type="success" @click="updateUserSubmit('updateUser')">确认</el-button>
            <el-button type="default" @click="updateUserCancel('updateUser')">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'
import Table from '@/components/common/table/Table.vue'
import BtnList from '@/components/common/Button/BtnList.vue'
import Input from '@/components/common/input/Input.vue'
import SearchBar from '@/components/common/searchBar/SearchBar.vue'
import Select from '@/components/common/input/Select.vue'
import { deleteUser, deleteUsers, getAllUsers, register, updateUserInfo } from '@/api/user'
import { getAllRoles } from '@/api/role'
import handleRes from '@/utils/res'
export default {
  components: { Card, Input, BtnList, SearchBar, Table, Select },
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
      addDialogVisible: false,
      queryInfo: {
        query: '',
      },
      //选择器
      selectOptions: [
        {
          id: 0,
          label: '男',
        },
        {
          id: 1,
          label: '女',
        },
      ],
      selectOptions2: [],
      btnList: [],
      tableData: [],
      columns: [
        {
          prop: 'name',
          label: '用户名',
        },
        {
          prop: 'email',
          label: '邮箱',
        },
        {
          prop: 'sex',
          label: '性别',
        },
        {
          prop: 'roleId',
          label: '角色',
          slot: true,
        },
      ],
      searchContent: {
        name: '',
        sex: null,
        roleId: null,
      },
      //分页
      pageInfo: {
        pageTotal: 0,
        pageSize: 8,
        pageIndex: 1,
      },
      singleSelectFlag: false,
      multipleSelectFlag: false,
      selectUsers: [],
      user: {
        pwd: null,
        checkPwd: null,
        username: null,
        email: null,
        sex: '0',
        roleId: 1,
      },
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
      //新增
      addDialogVisible: false,
      //修改
      updateDialogVisible: false,
      updateUser: {
        username: null,
        email: null,
        sex: '0',
        roleId: 1,
      },
      updateUserId: null,
      updateUserRules: {
        email: [
          {
            validator: validateEmail,
            trigger: 'blur',
            required: true,
          },
        ],
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
      },
      deleteUserId: null,
    }
  },
  methods: {
    async getUserList() {
      const res = await getAllUsers({
        params: {
          pageSize: this.pageInfo.pageSize,
          pageIndex: this.pageInfo.pageIndex,
          searchContent: {
            name: this.searchContent.name,
            sex: this.searchContent.sex,
            roleId: this.searchContent.roleId,
          },
        },
      })
      if (res.status !== 200) return
      this.tableData = res.data.users
      this.pageInfo.pageTotal = this.tableData.length
    },
    async getRoleList() {
      const res = await getAllRoles()
      if (res.status !== 200) return
      this.selectOptions2 = res.data.rows
    },
    //初始化按钮
    initBtnList() {
      this.btnList = [
        {
          name: '新增',
          icon: 'el-icon-plus',
          handleClick: this.handleAddClick,
          type: 'primary',
        },
        {
          name: '修改',
          icon: 'el-icon-edit',
          handleClick: this.handleUpdateClick,
          type: 'success',
          disabled: !this.singleSelectFlag,
        },
        {
          name: '删除',
          icon: 'el-icon-delete',
          handleClick: this.handleDeleteClick,
          type: 'danger',
          disabled: !this.singleSelectFlag && !this.multipleSelectFlag,
        },
        {
          name: '导出',
          icon: 'el-icon-download',
          handleClick: function () {},
          type: 'warning',
          disabled: !this.multipleSelectFlag,
        },
      ]
    },
    //分类选择选中
    changeSex(val) {
      this.searchContent.sex = val
    },
    changeRole(val) {
      this.searchContent.roleId = val
    },
    changeNameSearch(val) {
      this.searchContent.name = val
    },
    //清空input触发相应效果
    clearNameSearch() {
      this.searchContent.name = ''
      this.getUserList()
    },
    //点击搜索
    handleSearch() {
      this.getUserList()
    },
    //重置搜索
    handleReset() {
      const selectSex = this.$refs.selectSex
      const inputName = this.$refs.inputName
      const selectRole = this.$refs.selectRole
      this.searchContent.roleId = null
      this.searchContent.sex = null
      this.searchContent.name = ''
      //让子类表单全部重置
      inputName.clearInputVal()
      selectSex.clearSelectVal()
      selectRole.clearSelectVal()
      this.getUserList()
    },
    //分页大小
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.getUserList()
    },
    //分页页数
    handleIndexChange(index) {
      this.pageInfo.pageIndex = index
      this.getUserList()
    },
    //选择框
    handleSelectionChange(selectArr) {
      const { length } = selectArr
      //状态为单选
      if (length === 1) {
        this.singleSelectFlag = true
        this.multipleSelectFlag = false
      } else if (length > 1) {
        //多选
        this.multipleSelectFlag = true
        this.singleSelectFlag = false
      } else {
        //无
        this.singleSelectFlag = false
        this.multipleSelectFlag = false
      }
      this.selectUsers = selectArr
      //重新渲染button
      this.initBtnList()
    },
    //显示增加图片窗口
    showAddDialog() {
      this.addDialogVisible = true
    },
    //点击增加
    handleAddClick() {
      this.showAddDialog()
    },
    addUserCancel(formName) {
      this.addDialogVisible = false
      this.$refs[formName].resetFields()
    },
    addUserSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUser()
        } else {
          return false
        }
      })
    },
    //添加用户
    async addUser() {
      const res = await register({
        name: this.user.username,
        email: this.user.email,
        password: this.user.pwd,
        sex: this.user.sex,
        roleId: this.user.roleId,
      })
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success('添加用户成功')
      this.closeAddDialog()
    },
    //增加窗口关闭
    closeAddDialog() {
      this.addDialogVisible = false
      this.getUserList()
    },
    //修改部分
    showUpdateDialog() {
      this.updateDialogVisible = true
      this.updateUser.username = this.selectUsers[0].name
      this.updateUser.email = this.selectUsers[0].email
      this.updateUser.sex = this.selectUsers[0].sex === '男' ? '0' : '1'
      this.updateUser.roleId = this.selectUsers[0].roleId
      this.updateUserId = this.selectUsers[0].id
    },
    handleUpdateClick() {
      this.showUpdateDialog()
    },
    closeUpdateDialog() {
      this.updateDialogVisible = false
    },
    updateUserSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //发请求
          this.updateUserAjax()
          this.closeUpdateDialog()
        } else {
          return false
        }
      })
    },
    //修改请求部分
    async updateUserAjax() {
      const res = await updateUserInfo({
        id: this.updateUserId,
        user: {
          name: this.updateUser.username,
          email: this.updateUser.email,
          sex: this.updateUser.sex,
          roleId: this.updateUser.roleId,
        },
      })
      if (res.status !== 200) return
      this.$message.success(res.msg)
      this.getUserList()
    },
    //删除部分
    async handleDeleteClick() {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      if (this.selectUsers.length === 1) {
        this.deleteUserId = this.selectUsers[0].id
        this.deleteUser()
      } else {
        this.deleteUsers()
      }
      this.getUserList()
    },
    async deleteUser() {
      const res = await deleteUser(this.deleteUserId)
      if (res.status !== 200) return
      this.$message.success(res.msg)
    },
    async deleteUsers() {
      let idList = []
      this.selectUsers.forEach((user) => {
        idList.push(user.id)
      })
      console.log(idList)
      const res = await deleteUsers({ idList })
      handleRes(res)
    },
  },
  created() {
    this.getUserList()
    this.initBtnList()
    this.getRoleList()
  },
}
</script>

<style lang="scss" scoped></style>
