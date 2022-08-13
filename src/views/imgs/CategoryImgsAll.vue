<template>
  <div id="imgs-index">
    <!-- <div class="img-zoom">
      <div class="img-gallery">
        <div class="img-box" v-for="item in galleryImgs" :key="item.id">
          <img :src="item.imgUrl" alt="火热图片" />
        </div>
      </div>
    </div> -->
    <TextContent :title="textContent.title" :content="textContent.content"></TextContent>
    <section class="scroll-category">
      <h4>流行分类</h4>
      <ScrollCategory class="mt20" @showPathImgs="showPathImgs"></ScrollCategory>
    </section>
    <section class="waterfall">
      <h4>下载免费的图片-全部</h4>
      <water-fall
        :pics="readyPics.slice(0, waterFallSize)"
        :waterFallSize="waterFallSize"
        :readyPics="readyPics.slice(waterFallSize, readyPics.length)"
        class="waterfall mt20"
      ></water-fall>
    </section>
  </div>
</template>

<script>
import TextContent from '@/components/textcontent/TextContent.vue'
import ScrollCategory from '@/components/scrollcategory/ScrollCategory.vue'
import WaterFall from '@/components/waterfall/WaterFall.vue'
import { getAllImages, getHotImages } from '@/api/image'
export default {
  components: { TextContent, ScrollCategory, WaterFall },
  data() {
    return {
      textContent: {
        title: '所有的精美图片',
        content: '这里有海量的精美图片，可以通过分类来进行查找，所有的图片也都免费下载。',
      },
      waterFallSize: 4,
      readyPics: [],
      nameInEn: 'mv',
      allPics: [],
      galleryImgs: [],
    }
  },
  methods: {
    showPathImgs(nameInEn) {
      if (this.nameInEn === nameInEn) return
      this.nameInEn = nameInEn
      this.alterReadyPics()
    },
    async getAllImages() {
      const res = await getAllImages()
      if (res.status !== 200) return
      this.allPics = res.data.imgsArr
      this.alterReadyPics()
    },
    async getHotImages() {
      const res = await getHotImages()
      if (res.status !== 200) return
      this.galleryImgs = res.data
    },
    alterReadyPics() {
      this.readyPics = this.allPics.filter((item) => {
        return item.category_nameInEn === this.nameInEn
      })
    },
  },
  created() {
    this.getAllImages()
    // this.getHotImages()  
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
#imgs-index {
  padding: 0 100px;
  color: #000;
  font-size: 1.125rem;
  section {
    margin-top: 80px;
  }
}
.img-zoom {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  background: rgba(0, 0, 0, 0.4);
  .img-gallery {
    display: flex;
    cursor: move;
    .img-box {
      width: 25%;
      min-width: 25%;
      height: 180px;
      overflow: hidden;
      border: 5px solid #fff;
      img {
        width: 100%;
      }
    }
  }
}
</style>
