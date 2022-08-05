<template>
  <Card :height="625">
    <!-- 分隔布局 -->
    <el-row :gutter="20">
      <!-- 搜索区域 -->
      <el-col>
        <SearchBar>
          <Input
            placeholder="请输入名字"
            v-model="queryInfo.query"
            clearable
            label="姓名"
            size="small"
          >
          </Input>
          <Select placeholder="请输入性别" class="ml20" :selectOptions="selectOptions"></Select>
        </SearchBar>
      </el-col>
      <!-- 添加区域 -->
    </el-row>
    <el-row class="mt20">
      <BtnList></BtnList>
    </el-row>
    <el-row class="mt20">
      <Table></Table>
    </el-row>
  </Card>
</template>

<script>
import Card from '@/components/common/Card.vue'
import Table from '@/components/common/table/Table.vue'
import BtnList from '@/components/common/Button/BtnList.vue'
import Input from '@/components/common/input/Input.vue'
import SearchBar from '@/components/common/searchBar/SearchBar.vue'
import Select from '@/components/common/input/Select.vue'
export default {
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
    }
  },
  methods: {
    getUserList() {},
  },
  components: { Card, Input, BtnList, SearchBar, Table, Select },
}
</script>

<style lang="scss" scoped></style>
