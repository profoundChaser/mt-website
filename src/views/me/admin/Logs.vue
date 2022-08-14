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
          <div v-if="scope.column.prop == 'status'">
          <el-tag type="success" v-if="+scope.row.status===200">成功</el-tag>
          <el-tag type="error" v-else>失败</el-tag>
            <!-- <i class="el-icon-edit" style="color: #e6a23c" @click="handleUpdateClick"></i>
            <i class="el-icon-delete ml20" style="color: #f56c6c" @click="handleDeleteClick"></i> -->
          </div>
          <div v-if="scope.column.prop == 'createdAt'">
          {{loginTime(scope.row.createdAt)}}
          </div>
        </template>
      </Table>
    </el-row>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'
import Table from '@/components/common/table/Table.vue'
import BtnList from '@/components/common/Button/BtnList.vue'
import Input from '@/components/common/input/Input.vue'
import SearchBar from '@/components/common/searchBar/SearchBar.vue'
import Select from '@/components/common/input/Select.vue'
import { addLog, getAllLogs, updateLog, deleteLog, deleteLogs } from '@/api/log'
import handleRes from '@/utils/res'
export default {
  components: { Card, Input, BtnList, SearchBar, Table, Select },
  data() {
    return {
      tableData: [],
      columns: [
        {
          prop: 'username',
          label: '用户名',
        },
        {
          prop: 'host',
          label: '主机',
        },
        {
          prop: 'url',
          label: '路由',
        },
        {
          prop: 'method',
          label: '请求方式',
        },
        {
          prop: 'status',
          label: '状态',
          slot:true
        },
        {
          prop: 'agent',
          label: '浏览器信息等',
          width:'400'
        },
        {
          prop:'createdAt',
          label:'登录时间',
          slot:true
        }
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
      selectLog: [],
      deleteLogId: null,
      deleteLogIdList: [],
    }
  },
  methods: {
    loginTime(time){
      return this.$dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    async getLogList() {
      const res = await getAllLogs({
        params: {
          pageSize: this.pageInfo.pageSize,
          pageIndex: this.pageInfo.pageIndex,
        },
      })
      if (res.status !== 200) return
      this.tableData = res.data.logs
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
      this.selectLogs = selectArr
      //重新渲染button
      this.initBtnList()
    },
    //初始化按钮
    initBtnList() {
      this.btnList = [
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
      this.getLogList()
    },
    //分页页数
    handleIndexChange(index) {
      this.pageInfo.pageIndex = index
      this.getLogList()
    },
    async handleDeleteClick() {
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      if (this.selectLogs.length === 1) {
        this.deleteLogId = this.selectLogs[0].id
        this.deleteLog()
      } else {
        this.deleteLogs()
      }
      this.getLogList()
    },
    async deleteLog() {
      const res = await deleteLog(this.deleteLogId)
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getLogList()
    },
    async deleteLogs() {
      let idList = []
      this.selectLogs.forEach((log) => {
        idList.push(log.id)
      })
      const res = await deleteLogs({ idList })
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
      this.getLogList()
    },
  },
  created() {
    this.getLogList()
    this.initBtnList()
  },
}
</script>

<style lang="scss" scoped></style>
