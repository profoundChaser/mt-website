<template>
  <div id="users-Index">
    <!-- 分隔布局 -->
    <el-row :gutter="20">
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
          <div v-if="scope.column.prop == 'operate'">
            <i class="el-icon-edit" style="color:#E6A23C;" @click="handleUpdateClick"></i>
            <i class="el-icon-delete ml20" style="color:#F56C6C;" @click="handleDeleteClick"></i>
          </div>
        </template>
      </Table>
    </el-row>
    <!-- 新增角色 -->
    <el-dialog :visible.sync="addDialogVisible" title="新增用户" width="50%">
      <el-form
        :model="role"
        status-icon
        :rules="addRoleRules"
        ref="addRole"
        label-width="100px"
        class="addRole"
        label-position="left"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input type="email" v-model="role.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDescribe">
          <el-input type="text" v-model="role.roleDescribe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="operateBar">
            <el-button type="success" id="register-btn" @click="addRoleSubmit('addRole')"
              >确认</el-button
            >
            <el-button type="default" id="cancel-btn" @click="addRoleCancel('addRole')"
              >取消</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改角色 -->
    <!-- 新增角色 -->
    <el-dialog :visible.sync="updateDialogVisible" title="新增用户" width="50%">
      <el-form
        :model="updateRole"
        status-icon
        :rules="updateRoleRules"
        ref="updateRole"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input type="email" v-model="updateRole.roleName" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDescribe">
          <el-input type="text" v-model="updateRole.roleDescribe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="operateBar">
            <el-button type="success" id="register-btn" @click="updateRoleSubmit('updateRole')"
              >确认</el-button
            >
            <el-button type="default" id="cancel-btn" @click="updateRoleCancel('updateRole')"
              >取消</el-button
            >
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
import { addRole, getAllRoles, updateRole, deleteRole, deleteRoles } from '@/api/role'
import handleRes from '@/utils/res'
export default {
  components: { Card, Input, BtnList, SearchBar, Table, Select },
  data() {
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
      tableData: [],
      columns: [
        {
          prop: 'roleName',
          label: '角色',
        },
        {
          prop: 'roleDescribe',
          label: '描述',
        },
        {
          prop: 'operate',
          label: '操作',
          slot: true,
        },
      ],
      //分页
      pageInfo: {
        pageTotal: 0,
        pageSize: 8,
        pageIndex: 1,
      },
      singleSelectFlag: false,
      multipleSelectFlag: false,
      btnList: [],
      selectRole: [],
      addDialogVisible: false,
      role: {
        roleName: '',
        roleDescribe: '',
      },
      addRoleRules: {
        roleName: [{ required: true, message: '角色名不能为空', trigger: 'blur' }],
        roleDescribe: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
      },
      updateDialogVisible: false,
      updateRole: {
        roleName: '',
        roleDescribe: '',
      },
      updateRoleId: null,
      updateRoleRules: {
        roleDescribe: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
      },
      deleteRoleId: null,
      deleteRoleIdList: [],
    }
  },
  methods: {
    async getRoleList() {
      const res = await getAllRoles()
      if (res.status !== 200) return
      this.tableData = res.data.rows
      this.pageInfo.pageTotal = res.data.count
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
      this.selectRoles = selectArr
      //重新渲染button
      this.initBtnList()
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
    //分页大小
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.getRoleList()
    },
    //分页页数
    handleIndexChange(index) {
      this.pageInfo.pageIndex = index
      this.getRoleList()
    },
    handleAddClick() {
      this.addDialogVisible = true
    },
    addRoleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addRole()
          this.addDialogVisible = false
        } else {
          return false
        }
      })
    },
    async addRole() {
      const res = await addRole(this.role)
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getRoleList()
    },
    addRoleCancel(formName) {
      this.addDialogVisible = false
      this.$refs[formName].resetFields()
    },
    handleUpdateClick() {
      this.updateDialogVisible = true
      this.updateRole.roleName = this.selectRoles[0].roleName
      this.updateRole.roleDescribe = this.selectRoles[0].roleDescribe
      this.updateRoleId = this.selectRoles[0].id
    },
    updateRoleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateRoleAjax()
          this.updateDialogVisible = false
        } else {
          return false
        }
      })
    },
    updateRoleCancel(formName) {
      this.updateDialogVisible = false
      this.$refs[formName].resetFields()
    },
    async updateRoleAjax() {
      const res = await updateRole({ id: this.updateRoleId, role: this.updateRole })
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getRoleList()
    },
    async handleDeleteClick() {
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      if (this.selectRoles.length === 1) {
        this.deleteRoleId = this.selectRoles[0].id
        this.deleteRole()
      } else {
        this.deleteRoles()
      }
      this.getRoleList()
    },
    async deleteRole() {
      const res = await deleteRole(this.deleteRoleId)
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getRoleList()
    },
    async deleteRoles() {
      let idList = []
      this.selectRoles.forEach((role) => {
        idList.push(role.id)
      })
      const res = await deleteRoles({ idList })
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getRoleList()
    },
  },
  created() {
    this.getRoleList()
    this.initBtnList()
  },
}
</script>

<style lang="scss" scoped></style>
