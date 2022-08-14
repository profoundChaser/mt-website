<template>
  <div id="users-Index">
    <!-- 分隔布局 -->
    <el-row>
      <!-- 搜索区域 -->
      <el-col>
        <SearchBar :handleSearch="handleSearch" :handleReset="handleReset">
          <Input
            placeholder="请输入图片描述"
            clearable
            label="图片描述"
            size="small"
            :change="changeImgSearch"
            :clear="clearImgSearch"
            ref="inputImg"
          >
          </Input>
          <Input
            placeholder="请输入名字"
            clearable
            label="作者"
            size="small"
            class="ml20"
            :change="changeNameSearch"
            :clear="clearNameSearch"
            ref="inputName"
          >
          </Input>
          <!-- 选择器 -->
          <Select
            placeholder="请选择分类"
            class="ml20"
            :selectOptions="selectOptions"
            label="分类"
            :autoDefined="true"
            :change="changeCategory"
            ref="selectCategory"
          >
            <el-option
              v-for="item in selectOptions"
              :key="item.id"
              :label="item.name"
              :value="item.name"
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
        :pageInfo="pageInfo"
        @handleSizeChange="handleSizeChange"
        @handleIndexChange="handleIndexChange"
        :handleSelectionChange="handleSelectionChange"
        :rowClick="tableRowClick"
      >
        <template slot-scope="scope" slot="slotColumn">
          <el-table-column v-if="scope.column.prop=='imgUrl'">
          <!-- <img :src="scope.row.imgUrl" alt="图片资源" style="height:60px;" v-if="scope.rowIndex==0"> -->
          </el-table-column>
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
    <!-- 新增窗口 -->
    <el-dialog :fullscreen="true" :visible.sync="addDialogVisible" @close="closeAddDialog">
      <Upload></Upload>
    </el-dialog>
    <!-- 修改窗口 -->
    <el-dialog :visible.sync="updateDialogVisible" title="修改图片" width="30%">
      <img :src="updateImageUrl" alt="" style="width: 200px" />
      <el-form
        :model="updateImage"
        status-icon
        :rules="updateImageRules"
        ref="updateImageRef"
        label-width="100px"
        class="register-user"
        label-position="top"
      >
        <el-form-item label="描述" prop="name">
          <el-input type="text" v-model.trim="updateImage.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="operateBar">
            <el-button type="success" size="small" @click="updateImgSubmit('updateImageRef')"
              >确认</el-button
            >
            <el-button type="default" size="small" @click="updateImgCancel('updateImageRef')"
              >取消</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 删除窗口 -->
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'
import Table from '@/components/common/table/Table.vue'
import BtnList from '@/components/common/Button/BtnList.vue'
import Input from '@/components/common/input/Input.vue'
import SearchBar from '@/components/common/searchBar/SearchBar.vue'
import Select from '@/components/common/input/Select.vue'
import { deleteImage, deleteImages, getAllImages, updateImage } from '@/api/image'
import { getAllCategories } from '@/api/category'
import { queryWidthBlur, queryWidthExact } from '@/utils/utils'
import Dialog from '@/components/common/dialog/Dialog.vue'
import Upload from '@/views/upload/Upload.vue'
import PreviewImage from '@/components/preview/PreviewImage.vue'

export default {
  components: { Card, Input, BtnList, SearchBar, Table, Select, Dialog, Upload, PreviewImage },
  data() {
    return {
      addDialogVisible: false,
      //选择器
      selectOptions: [],
      tableData: [],
      checkTableData: [],
      btnList: [],
      columns: [
        {
          prop: 'imgName',
          label: '描述',
          width: '200',
        },
        {
          prop: 'imgUrl',
          label: '资源',
          width: '440',
          // slot:true
        },
        {
          prop: 'uploader',
          label: '贡献者',
        },
        {
          prop: 'views',
          label: '被浏览次数',
          sortable: true,
        },
        {
          prop: 'downloads',
          label: '被下载次数',
          sortable: true,
        },
        {
          prop: 'category_name',
          label: '分类',
        },
      ],
      searchContent: {
        imgName: '',
        name: '',
        categoryId: null,
      },
      // 预览
      preview: {
        index: 0,
        img: null,
      },
      previewVisible: false,
      //分页
      pageInfo: {
        pageTotal: 0,
        pageSize: 8,
        pageIndex: 1,
      },
      //单选标识
      singleSelectFlag: false,
      multipleSelectFlag: false,
      selectImages: [],
      //增删改查窗口标识
      addDialogVisible: false,
      updateDialogVisible: false,
      updateImage: {
        name: '',
      },
      //修改表单图片
      updateImageUrl: '',
      updateImageId: null,
      //校验规则
      updateImageRules: {
        imgName: [{ required: true, message: '描述名称不能为空', trigger: 'blur' }],
      },
      //删除的数据
      deleteImageId: null,
      deleteImageUrl: '',
    }
  },
  methods: {
    async getAllImages() {
      const res = await getAllImages({
        params: {
          pageSize: this.pageInfo.pageSize,
          pageIndex: this.pageInfo.pageIndex,
          searchContent: {
            imgName: this.searchContent.imgName,
            name: this.searchContent.name,
            categoryId: this.searchContent.categoryId,
          },
          useRandom:true
        },
      })
      if (res.status !== 200) return
      this.tableData = res.data.imgsArr
      this.checkTableData = res.data.imgsArr
      this.pageInfo.pageTotal = res.data.count
    },
    async getAllCategories() {
      const res = await getAllCategories()
      if (res.status !== 200) return
      this.selectOptions = res.data.categories
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
    changeCategory(val) {
      this.selectOptions.forEach((item) => {
        if (item.name === val) {
          this.searchContent.categoryId = item.id
        }
      })
    },
    changeImgSearch(val) {
      this.searchContent.imgName = val
    },
    changeNameSearch(val) {
      this.searchContent.name = val
    },
    //清空input触发相应效果
    clearImgSearch() {
      this.handleSearch()
    },
    clearNameSearch() {
      this.handleSearch()
    },
    //点击搜索
    handleSearch() {
      // this.tableData = this.checkTableData.filter((item) => {
      //   return this.searchContent.imgName
      //     ? queryWidthBlur(item, 'imgName', this.searchContent.imgName)
      //     : true && this.searchContent.name
      //     ? queryWidthExact(item, 'uploader', this.searchContent.name)
      //     : true && this.searchContent.category
      //     ? queryWidthExact(item, 'category_name', this.searchContent.category)
      //     : true
      // })
      this.getAllImages()
    },
    //重置搜索
    handleReset() {
      const inputImg = this.$refs.inputImg
      const inputName = this.$refs.inputName
      const selectCategory = this.$refs.selectCategory
      this.searchContent.categoryId = null
      this.searchContent.imgName = ''
      this.searchContent.name = ''
      //让子类表单全部重置
      inputImg.clearInputVal()
      inputName.clearInputVal()
      selectCategory.clearSelectVal()
      this.getAllImages()
    },
    //分页大小
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.getAllImages()
    },
    //分页页数
    handleIndexChange(index) {
      this.pageInfo.pageIndex = index
      this.getAllImages()
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
      this.selectImages = selectArr
      //重新渲染button
      this.initBtnList()
    },
    //表格选中行
    tableRowClick(row, col) {
      this.preview.img = row.imgUrl
      this.previewVisible = true
    },
    //关闭预览
    closePreview() {
      this.previewVisible = false
    },
    //显示增加图片窗口
    showAddDialog() {
      this.addDialogVisible = true
    },
    //点击增加
    handleAddClick() {
      this.showAddDialog()
    },
    //增加窗口关闭
    closeAddDialog() {
      this.addDialogVisible = false
      this.getAllImages()
    },
    //修改部分
    showUpdateDialog() {
      this.updateDialogVisible = true
      this.updateImageUrl = this.selectImages[0].imgUrl
      this.updateImage.name = this.selectImages[0].imgName
      this.updateImageId = this.selectImages[0].id
    },
    handleUpdateClick() {
      this.showUpdateDialog()
    },
    closeUpdateDialog() {
      this.updateDialogVisible = false
      this.getAllImages()
    },
    updateImgSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //发请求
          this.updateImageAjax()
          this.closeUpdateDialog()
        } else {
          return false
        }
      })
    },
    //修改请求部分
    async updateImageAjax() {
      const res = await updateImage(this.updateImageId, { image: this.updateImage })
      if (res.status !== 200) return
      this.$message.success(res.msg)
      this.getAllImages()
    },
    updateImgCancel(formName) {
      this.updateDialogVisible = false
      this.$refs[formName].resetFields()
    },
    //删除部分
    async handleDeleteClick() {
      const confirmResult = await this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      if (this.selectImages.length === 1) {
        this.deleteImageId = this.selectImages[0].id
        this.deleteImageUrl = this.selectImages[0].imgUrl
        this.deleteImage()
      } else {
        this.deleteImages()
      }
    },
    async deleteImage() {
      const res = await deleteImage({ id: this.deleteImageId, url: this.deleteImageUrl })
      if (res.status !== 200) return
      this.$message.success(res.msg)
      this.getAllImages()
    },
    async deleteImages() {
      const idList = []
      const urlList = []
      this.selectImages.forEach((item) => {
        idList.push(item.id)
        urlList.push(item.imgUrl)
      })
      const res = await deleteImages({ idList, urlList })
      console.log(res)
      if (res.status !== 200) return
      this.$message.success(res.msg)
      this.getAllImages()
    },
  },
  created() {
    this.getAllImages()
    this.getAllCategories()
    this.initBtnList()
  },
  destroyed() {
    this.$off('handleSizeChange')
    this.$off('handleIndexChange')
  },
}
</script>

<style lang="scss" scoped></style>
