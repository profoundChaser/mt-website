<template>
	<el-table :data="tableData" class="table" :border="border" :size="size" :highlight-current-row="highlightCurrentRow"
		:row-style="rowStyle" :cell-style="cellStyle" :lazy="lazy" :header-row-style="headerRowStyle"
		element-loading-text="正在加载中" :header-cell-style="headerCellStyle" style="width:100%;">
		<el-table-column :prop="column.prop" :label="column.label" class="table-column" v-for="(column,index) in columns"
			:sortable="column.sortable?column.sortable:false" :fixed="column.fixed?column.fixed:null"
			:formatter="column.formatter" :key="index" :width="width">
			<template slot-scope="scope">
				<template v-if="column.slot">
					<slot name="slotcolumn" :row="scope.row" :rowIndex="scope.$index" :columnIndex="index" :column="column">
					</slot>
				</template>
				<template v-else>
					{{scope.row[column.prop]}}
				</template>
			</template>	
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			tableData: {
				type: Array,
				default: []
			},
			border: {
				type: Boolean,
				default: false
			},
			highlightCurrentRow: {
				type: Boolean,
				default: false
			},
			size: {
				type: String,
				default: 'mini'
			},
			rowStyle: {
				type: Function
			},
			cellStyle: {
				type: Function
			},
			lazy: {
				type: Boolean,
				default: true
			},
			columns: {
				type: Array,
				default: []
			},
			width: {
				type: String,
				default: ''
			},
			headerRowStyle: {
				type: Function
			},
			headerCellStyle:{
				type:Function
			}
		}
	}
</script>

<style>

</style>
