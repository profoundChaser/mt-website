<template>
  <div id="imgs-index">
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
import { getAllImages } from '@/api/image'
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
    alterReadyPics() {
      this.readyPics = this.allPics.filter((item) => {
        return item.category_nameInEn === this.nameInEn
      })
    },
  },
  created() {
    this.getAllImages()
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
</style>
