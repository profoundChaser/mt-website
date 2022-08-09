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
        :rowClick="tableRowClick"
      >
        <template slot-scope="scope" slot="slotColumn">
          <div v-if="scope.column.prop == 'imgCover'">
            <img :src="scope.row.imgCover" alt="" style="height: 60px" />
          </div>
          <div v-if="scope.column.prop == 'operate'">
            <i class="el-icon-edit" style="color: #e6a23c" @click="handleUpdateClick"></i>
            <i class="el-icon-delete ml20" style="color: #f56c6c" @click="handleDeleteClick"></i>
          </div>
        </template>
      </Table>
    </el-row>
    <!-- 预览图片 -->
    <PreviewImage
      :preview="preview"
      :previewVisible="previewVisible"
      :images="[]"
      propName="imgUrl"
      :closePreview="closePreview"
    ></PreviewImage>
    <!-- 新增角色 -->
    <el-dialog :visible.sync="addDialogVisible" title="新增分类" width="50%">
      <el-form
        :model="category"
        status-icon
        :rules="addCategoryRules"
        ref="addCategory"
        label-width="100px"
        class="addCategory"
        label-position="left"
      >
        <el-form-item label="分类名" prop="name">
          <el-input type="text" v-model="category.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="categoryDescribe">
          <el-input type="text" v-model="category.nameInEn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="operateBar">
            <el-button type="success" id="register-btn" @click="addCategorySubmit('addCategory')"
              >确认</el-button
            >
            <el-button type="default" id="cancel-btn" @click="addCategoryCancel('addCategory')"
              >取消</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改角色 -->
    <!-- 新增角色 -->
    <el-dialog :visible.sync="updateDialogVisible" title="修改分类" width="50%">
      <el-form
        :model="updateCategory"
        status-icon
        :rules="updateCategoryRules"
        ref="updateCategory"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input type="email" v-model="updateCategory.name"></el-input>
        </el-form-item>
        <el-form-item label="英文路描述" prop="roleDescribe">
          <el-input type="text" v-model="updateCategory.nameInEn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="operateBar">
            <el-button
              type="success"
              id="register-btn"
              @click="updateCategorySubmit('updateCategory')"
              >确认</el-button
            >
            <el-button
              type="default"
              id="cancel-btn"
              @click="updateCategoryCancel('updateCategory')"
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
import {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  deleteCategories,
} from '@/api/category'
import PreviewImage from '@/components/preview/PreviewImage.vue'
export default {
  components: { Card, Input, BtnList, SearchBar, Table, Select, PreviewImage },
  data() {
    return {
      tableData: [],
      columns: [
        {
          prop: 'name',
          label: '分类名',
        },
        {
          prop: 'nameInEn',
          label: '英文路径名',
        },
        {
          prop: 'imgCover',
          label: '封面',
          slot: true,
        },
        {
          prop: 'operate',
          label: '操作',
          slot: true,
        },
      ],
      // 预览
      preview: {
        index: 0,
        img: null,
      },
      //分页
      pageInfo: {
        pageTotal: 0,
        pageSize: 5,
        pageIndex: 1,
      },
      singleSelectFlag: false,
      multipleSelectFlag: false,
      btnList: [],
      selectCategories: [],
      addDialogVisible: false,
      category: {
        name: '',
        nameInEn: '',
      },
      addCategoryRules: {
        name: [{ required: true, message: '分类名不能为空', trigger: 'blur' }],
        nameInEn: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
      },
      updateDialogVisible: false,
      updateCategory: {
        name: '',
        nameInEn: '',
      },
      updateCategoryId: null,
      updateCategoryRules: {
        name: [{ required: true, message: '分类名不能为空', trigger: 'blur' }],
        nameInEn: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
      },
      deleteCategoryId: null,
      deleteCategoryIdList: [],
      previewVisible: false,
    }
  },
  methods: {
    async getCategoryList() {
      const res = await getAllCategories({
        params: {
          pageSize: this.pageInfo.pageSize,
          pageIndex: this.pageInfo.pageIndex,
        },
      })
      if (res.status !== 200) return
      this.tableData = res.data.categories
      this.pageInfo.pageTotal = res.data.count
    },
    tableRowClick(row, col) {
      this.preview.img = row.imgCover
      this.previewVisible = true
    },
    //关闭预览
    closePreview() {
      this.previewVisible = false
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
      this.selectCategorys = selectArr
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
      this.getCategoryList()
    },
    //分页页数
    handleIndexChange(index) {
      this.pageInfo.pageIndex = index
      this.getCategoryList()
    },
    handleAddClick() {
      this.addDialogVisible = true
    },
    addCategorySubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addCategory()
          this.addDialogVisible = false
        } else {
          return false
        }
      })
    },
    async addCategory() {
      const res = await addCategory(this.role)
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getCategoryList()
    },
    addCategoryCancel(formName) {
      this.addDialogVisible = false
      this.$refs[formName].resetFields()
    },
    handleUpdateClick() {
      this.updateDialogVisible = true
      this.updateCategory.name = this.selectCategories[0].name
      this.updateCategory.nameInEn = this.selectCategories[0].nameInEn
      this.updateCategoryId = this.selectCategories[0].id
    },
    updateCategorySubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateCategoryAjax()
          this.updateDialogVisible = false
        } else {
          return false
        }
      })
    },
    updateCategoryCancel(formName) {
      this.updateDialogVisible = false
      this.$refs[formName].resetFields()
    },
    async updateCategoryAjax() {
      const res = await updateCategory({ id: this.updateCategoryId, role: this.updateCategory })
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getCategoryList()
    },
    async handleDeleteClick() {
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      if (this.selectCategories.length === 1) {
        this.deleteCategoryId = this.selectCategories[0].id
        this.deleteCategory()
      } else {
        this.deleteCategories()
      }
      this.getCategoryList()
    },
    async deleteCategory() {
      const res = await deleteCategory(this.deleteCategoryId)
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getCategoryList()
    },
    async deleteCategories() {
      let idList = []
      this.selectCategories.forEach((role) => {
        idList.push(role.id)
      })
      const res = await deleteCategories({ idList })
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getCategoryList()
    },
  },
  created() {
    this.getCategoryList()
    this.initBtnList()
  },
}
</script>

<style lang="scss" scoped></style>
