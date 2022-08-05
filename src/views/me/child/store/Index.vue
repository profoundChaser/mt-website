<template>
  <div id="store-index">
    <h1>我的收藏</h1>
    <WaterFall
      :pics="readyPics.slice(0, waterFallSize)"
      :waterFallSize="waterFallSize"
      :readyPics="readyPics.slice(waterFallSize, readyPics.length)"
      :closeOperateBar="true"
      class="waterFall mt20"
      @sendStoreIndex="getStoreIndex"
      ref="waterFall"
    >
    </WaterFall>
    <ToolBar :showFullScreen="false" :showShot="false">
      <div
        class="icon-box mt10"
        ref="trashBtn"
        @click="deleteStore"
        @drop="drop"
        @dragenter="dragenter"
        @dragover="dragover"
      >
        <i class="el-icon-delete-solid"></i>
      </div>
    </ToolBar>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div class="content">
        <i class="el-icon-warning"></i><span class="ml10">确认是否删除该图片</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteStore">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deleteStore, getAllStores } from '@/api/store'
import WaterFall from '@/components/waterfall/WaterFall.vue'
import ToolBar from '@/components/toolBar/ToolBar.vue'
export default {
  components: { WaterFall, ToolBar },
  data() {
    return {
      readyPics: [],
      waterFallSize: 5,
      dialogVisible: false,
      deleteImgId: null,
    }
  },
  methods: {
    async getAllStores() {
      const userInfo=JSON.parse(localStorage.getItem('userInfo'))
      const res = await getAllStores(userInfo.id)
      if (res.status !== 200) return
      console.log(res.data)
      this.readyPics = res.data
    },
    async deleteStore() {
      const res = await deleteStore(this.deleteImgId)
      if (res.status !== 200) return
      this.$message.success(res.msg)
      this.dialogVisible = false
      this.getAllStores()
      //通知瀑布流组件更新
      this.$refs.waterFall.waterFall(this.waterFallSize)
    },
    //接受自定义事件
    getStoreIndex(id) {
      this.deleteImgId = id
    },
    drop() {
      this.dialogVisible = true
    },
    dragenter(e) {
      e.preventDefault()
    },
    dragover(e) {
      e.preventDefault()
    },
  },
  created() {
    this.getAllStores()
  },
  destroyed() {
    this.$off('sendStoreIndex')
  },
}
</script>

<style lang="scss" scoped>
body {
  overflow: hidden;
}
#store-index {
  h1 {
    color: #3bc66f;
  }
}
.content {
  display: flex;
  align-items: center;
}
.el-icon-warning {
  font-size: 24px;
  color: #e6a23c;
}
</style>
