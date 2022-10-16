<template>
  <div class="table">
    <el-table
      :data="newTableData"
      class="table"
      ref="commonTable"
      :style="getTableStyle"
      :border="border"
      :size="size"
      :stripe="stripe"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :row-class-name="tableRowClassName"
      :empty-text="emptyText"
      :lazy="lazy"
      :header-row-style="headerRowStyle"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      :span-method="spanMethod"
      :sum-text="sumText"
      v-loading
      :element-loading-text="loadingText"
      :element-loading-spinner="loadingIcon"
      :header-cell-style="headerCellStyle"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
      @row-dblclick="handleRowDbClick"
      @expand-change="handleExpandRow"
      @sort-change="handleSortChange"
    >
      <!-- 自定义表头 -->
      <!-- <el-table-column>
      <template slot="header" slot-scope="scope" v-if="isCustomHeader">
       <slot slot="header" :header="scope"></slot>
    </template>
    </el-table-column> -->
      <!--selection选择框-->
      <el-table-column
        v-if="tableMutiSelect"
        type="selection"
        :selectable="selectable"
        width="60"
        align="center"
      ></el-table-column>
      <!--序号-->
      <el-table-column
        v-if="showIndex"
        type="index"
        :index="indexMethod"
        :width="indexColumnWidth"
        label="序号"
        align="center"
      ></el-table-column>
      <!--展开-->
      <el-table-column v-if="showExpand" type="expand">
        <template slot-scope="scope">
          <slot name="expand" :row="scope.row"></slot>
        </template>
      </el-table-column>
      <!-- 其他 -->
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :align="column.align"
        class="table-column"
        v-for="(column, index) in columns"
        :sortable="column.sortable ? column.sortable : false"
        :resizable="column.resizable ? column.resizable : true"
        :fixed="column.fixed ? column.fixed : null"
        :formatter="column.formatter"
        :key="index"
        :show-overflow-tooltip="column.overflowHidden"
        :filters="column.filters"
        :filter-method="column.filterMethod"
        :filter-placement="column.filter-placement"
        v-if="column.isShow ? column.isShow : true"
      >
        <template slot-scope="scope">
          <template v-if="column.slot">
            <slot
              name="slotColumn"
              :row="scope.row"
              :rowIndex="scope.$index"
              :columnIndex="index"
              :column="column"
            >
            </slot>
          </template>
          <template v-else>
            {{ scope.row[column.prop] }}
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination mt20">
      <el-pagination
        v-if="showPage"
        @size-change="handleSizeChange"
        @current-change="handleIndexChange"
        :page-size="pageInfo.pageSize"
        :page-sizes="[8, 20]"
        :current-page="pageInfo.pageIndex"
        :layout="pageLayout"
        :pager-count="pagerCount"
        :total="pageInfo.pageTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  data() {
    return {}
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      },
    },
    getTableStyle: {
      type: Object,
    },
    border: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    isCustomHeader: {
      type: Boolean,
      default: false,
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'medium',
    },
    rowStyle: {
      type: Function,
    },
    cellStyle: {
      type: Function,
    },
    tableRowClassName: {
      type: Function,
    },
    lazy: {
      type: Boolean,
      default: true,
    },
    /* 合计 */
    showSummary: {
      type: Boolean,
      default: false,
    },
    spanMethod: {
      type: Function,
    },
    sumText: {
      type: String,
      default: 'sum',
    },
    emptyText: {
      type: String,
      default: 'No data',
    },
    loadingText: {
      type: String,
      default: 'loading...',
    },
    loadingIcon: {
      type: String,
      default: 'el-icon-loading',
    },
    headerCellStyle: {
      type: Function,
      default: function () {
        return {
          background: 'rgb(230, 230, 230)',
        }
      },
    },
    headerRowStyle: {
      type: Function,
    },
    width: {
      type: String,
      default: '',
    },
    columns: {
      type: Array,
      default: () => {
        return []
      },
    },
    //是否有序号列
    showIndex: {
      type: Boolean,
      default: true,
    },
    indexColumnWidth: {
      type: String,
      default: '60',
    },
    indexMethod: {
      type: Function,
    },
    //是否有展开列
    showExpand: {
      type: Boolean,
      default: false,
    },
    //是否支持列表项选中功能
    tableMutiSelect: {
      type: Boolean,
      default: false,
    },
    selectable: Function, //判断复选框是否可勾选
    handleSelectionChange: {
      type: Function,
    },
    rowClick: {
      type: Function,
      default: function () {},
    },
    handleRowDbClick: {
      type: Function,
      default: function () {},
    },
    handleExpandRow: {
      type: Function,
      default: function () {},
    },
    //是否后台分页
    remotePaging: {
      type: Boolean,
      default: true,
    },
    //分页器
    showPage: {
      type: Boolean,
      default: true,
    },
    //分页参数
    pageInfo: {
      type: Object,
      default: function () {
        return {
          pageTotal: 0,
          pageSize: 10,
          pageIndex: 1,
        }
      },
    },
    pageLayout: {
      type: String,
      default: 'total,sizes, prev, pager, next,jumper',
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
  },
  computed: {
    newTableData() {
      if (!this.remotePaging) {
        let pageIndex = this.pageInfo.pageIndex
        let pageSize = this.pageInfo.pageSize
        return this.tableData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      } else {
        return this.tableData
      }
    },
  },
  methods: {
    // 切换每页显示的数量
    handleSizeChange(size) {
      this.pageInfo.pageSize = size
      this.$emit('handleSizeChange', size)
    },
    // 切换页码
    handleIndexChange(index) {
      this.pageInfo.pageIndex = index
      this.$emit('handleIndexChange', index)
    },
    //获取所有选中行
    getSelectRows: function () {
      return this.$refs.commonTable.selection
    },
    //清除所有选中行
    clearSelection() {
      this.$refs.commonTable.clearSelection()
    },
    //合计行
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      console.log(columns, data)
      //修复合计行不显示的问题(被挡住)
      this.$nextTick(() => {
        this.$refs.commonTable.doLayout()
      })
      return sums
    },
    //排序
    handleSortChange({ column, prop, order }) {
      console.log(column, prop, order)
      if (!column) return
      //远程排序
      // if (column.sortable == 'custom') {
      //   if (order === 'ascending') {
      //     this.filterForm['sort'] = prop
      //     this.filterForm['order'] = 'asc'
      //     return this.getTableData()
      //   }
      //   if (order === 'descending') {
      //     this.filterForm['sort'] = prop
      //     this.filterForm['order'] = 'desc'
      //     return this.getTableData()
      //   }
      // }
    },
    //列拖拽
    columnDrop() {
      let that = this
      let tableHeaderWrap = that.$refs.commonTable.$refs.headerWrapper
      let wrapperTr = tableHeaderWrap.children[0].children[1].children[0]
      let filterNum = 0 //禁止拖拽的个数
      if (that.showIndex) {
        filterNum++
      }
      if (that.tableMutiSelect) {
        filterNum++
      }
      Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        filter: (evt, item) => {
          console.log(filterNum)
          //返回true不允许拖拽
          if (item.cellIndex < filterNum || item.innerText == '操作') {
            return true
          }
          return false
        },
        onEnd: (evt) => {
          let temp = that.newColumns.concat()
          let oldIndex = evt.oldIndex - filterNum
          let newIndex = evt.newIndex - filterNum
          if (oldIndex < 0) oldIndex = 0
          if (newIndex < 0) newIndex = 0
          const oldItem = that.newColumns[oldIndex]
          temp.splice(oldIndex, 1)
          temp.splice(newIndex, 0, oldItem)
          that.newColumns = []
          that.$nextTick(() => {
            that.newColumns = temp
          })
        },
      })
    },
    reloadTable() {
      this.reFreshTable = false
      this.$nextTick(() => {
        this.reFreshTable = true
        this.$nextTick(() => {
          //等表格重新渲染完成后，重新选中行
          this.selectRows.forEach((row) => {
            this.toggleRowSelection(row, true)
          })
        })
      })
    },
    created() {},
    mounted() {},
  },
}
</script>

<style scoped lang="scss">
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
}
.table {
  width: 100%;
}

.el-table .warning-row {
  background: #e6a23c;
}

.el-table .success-row {
  background: #67c23a;
}
</style>
