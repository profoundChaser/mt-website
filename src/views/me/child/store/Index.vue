<template>
  <div id="store-index">
    <h1>我的收藏</h1>
    <ul class="images-container">
      <li
        class="image-box mt10 ml10"
        v-for="(item, index) in readyPics"
        :key="item.id"
        @click="showPreview(item, index)"
        @dragstart="dragStart($event, index)"
        @drop="drop($event, index)"
        @dragenter="dragenter"
        @dragover="dragover"
      >
        <img :src="item.imgUrl" alt="图片" />
      </li>
    </ul>
    <ToolBar :showFullScreen="false" :showShot="false">
      <div
        class="icon-box mt10"
        ref="trashBtn"
        @drop="dropDelete"
        @dragenter="dragenter"
        @dragover="dragover"
      >
        <i class="el-icon-delete-solid"></i>
      </div>
    </ToolBar>
    <!-- 预览图片 -->
    <PreviewImage
      :preview="preview"
      :previewVisible="previewVisible"
      :images="readyPics"
      propName="imgUrl"
      :closePreview="closePreview"
    ></PreviewImage>
  </div>
</template>

<script>
import { deleteStore, getAllStores } from '@/api/store'
import ToolBar from '@/components/toolBar/ToolBar.vue'
import PreviewImage from '@/components/preview/PreviewImage.vue'
import dragJS from '@/utils/drag'

export default {
  components: { ToolBar, PreviewImage },
  data() {
    return {
      readyPics: [],
      waterFallSize: 5,
      dialogVisible: false,
      deleteImgId: null,
      previewVisible: false,
      preview: {
        index: 0,
        img: null,
      },
    }
  },
  methods: {
    async getAllStores() {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const res = await getAllStores(userInfo.id)
      if (res.status !== 200) return
      this.readyPics = res.data
    },
    dragStart(e, i) {
      dragJS.dragStart(e)
      console.log(e.target.src)
      this.dragItemIndex = i
      this.deleteImgId = this.readyPics[this.dragItemIndex].id
    },
    drop(e, i) {
      dragJS.drop(e)
      this.$forceUpdate()
      let temp = this.readyPics[this.dragItemIndex]
      this.readyPics.splice(this.dragItemIndex, 1, this.readyPics[i])
      console.log(this.readyPics)
      this.readyPics.splice(i, 1, temp)
    },
    async dropDelete(e) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      const res = await deleteStore(this.deleteImgId)
      if (res.status !== 200) return
      this.$message.success(res.msg)
      this.getAllStores()
    },
    dragenter(e) {
      dragJS.dragEnter(e)
    },
    dragover(e) {
      dragJS.dragOver(e)
    },
    showPreview(item, i) {
      this.previewVisible = true
      this.preview.img = item.imgUrl
      this.preview.index = i
    },
    closePreview() {
      this.previewVisible = false
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
.images-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 45px;
  .image-box {
    width: calc(100% / 4 - 40px);
    min-width: 284px;
    height: 280px;
    overflow: hidden;
    justify-content: space-around;
    border-radius: 10px;
    cursor: pointer;
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>
