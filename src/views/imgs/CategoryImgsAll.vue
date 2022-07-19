<template>
  <div id="imgs-index">
    <TextContent :title="textContent.title" :content="textContent.content"></TextContent>
    <ScrollCategory></ScrollCategory>
  </div>
</template>

<script>
import TextContent from '@/components/textcontent/TextContent.vue'
import ScrollCategory from '@/components/scrollcategory/ScrollCategory.vue'
export default {
  components: { TextContent, ScrollCategory },
  data() {
    return {
      textContent: {
        title: '所有的精美图片',
        content:
          '这里有海量的精美图片，可以通过分类来进行查找，所有的图片也都免费下载。',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
#imgs-index{
    padding: 0 100px;
    color:#000;
    font-size: 1.125rem;
}
</style>
