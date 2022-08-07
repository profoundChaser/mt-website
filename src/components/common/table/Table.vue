<template>
  <div class="table">
    <el-table
      :data="tableData"
      class="table"
      :border="border"
      :size="size"
      :highlight-current-row="highlightCurrentRow"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :lazy="lazy"
      :header-row-style="headerRowStyle"
      element-loading-text="正在加载中"
      :header-cell-style="headerCellStyle"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
    >
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
        class="table-column"
        v-for="(column, index) in columns"
        :sortable="column.sortable ? column.sortable : false"
        :fixed="column.fixed ? column.fixed : null"
        :formatter="column.formatter"
        :key="index"
        :width="column.width"
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
export default {
  data() {
    return {}
  },
  props: {
    tableData: {
      type: Array,
      default: [],
    },
    border: {
      type: Boolean,
      default: false,
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false,
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
    lazy: {
      type: Boolean,
      default: true,
    },
    headerCellStyle: {
      type: Function,
      default: function () {
        return {
          background:'rgb(230, 230, 230)',
        }
      },
    },
    headerRowStyle:{
      type:Function
    },
    width: {
      type: String,
      default: '',
    },
    columns: {
      type: Array,
      default: [],
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
    indexMethod:{
      type:Function
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
    handleSelectionChange:{
      type:Function
    },
    rowClick:{
      type:Function
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
  },
}
</script>

<style scoped lang="scss">
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
