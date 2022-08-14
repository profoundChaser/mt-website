<template>
  <div id="home-index">
    <Head></Head>
    <main>
      <div class="content">
        <TextContent :title="textContent.title" :content="textContent.content"></TextContent>
        <section class="image-section">
          <h2>在Vein上浏览数千张免费图片</h2>
          <div class="img-row">
            <div class="img-big-box" v-for="item in rowImgs" :key="item.id">
              <div class="img-box">
                <img :src="item.img" alt="图片" />
                <p class="center-text">{{ item.text }}</p>
                <div class="mask"></div>
              </div>
              <p class="text-describe">{{ item.drc }}</p>
            </div>
          </div>
        </section>
        <section class="waterfall-section">
          <h2>免费高分辨率Vein照片</h2>
          <water-fall
            :pics="readyPics.slice(0, waterFallSize)"
            :waterFallSize="waterFallSize"
            :readyPics="readyPics.slice(waterFallSize, readyPics.length)"
            class="waterfall"
          ></water-fall>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import IO from '@/utils/IO.js'
import WaterFall from '@/components/waterfall/WaterFall.vue'
import TextContent from '@/components/textcontent/TextContent.vue'
import { getAllImages } from '@/api/image'
export default {
  name: 'App',
  components: { WaterFall, TextContent },
  data() {
    return {
      rowImgs: [
        {
          id: 0,
          text: '背景',
          img: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
          drc: '免费下载桌面和手机背景。',
        },
        {
          id: 1,
          text: '图片',
          img: 'https://images.unsplash.com/photo-1448387473223-5c37445527e7?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
          drc: '下载精彩的照片和图片。',
        },
        {
          id: 2,
          text: '壁纸',
          img: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?dpr=1&auto=format&fit=crop&w=440&h=220&q=60',
          drc: '发现下一张桌面或手机壁纸。',
        },
      ],
      waterFallSize: 4,
      readyPics: [],
      textContent: {
        title: '探索更多的优质图片',
        content:
          ' Vein有超过一百万张免费的高分辨率照片。在Vein上探索这些流行的照片类别。在Vein许可下，可以免费下载和使用此处的所有照片。',
      },
    }
  },
  methods: {
    async getAllImages() {
      const res = await getAllImages({
        params: {
          useRandom: true,
        },
      })
      if (res.status !== 200) return
      this.readyPics = res.data.imgsArr
    },
  },
  created() {
    //获取所有的图片
    this.getAllImages()
    //   const io = IO.of(null)
    //   const requireContext = require.context(
    //     '@/assets/img/mv',
    //     true,
    //     /^\.\/.*\.(jpg|jpeg|webp|mp4|png)$/i
    //   )
    //   this.readyPics = io.mergeFiles(
    //     io.getAllFiles(requireContext, '@/assets/img/mv').map()
    //   )
  },
}
</script>

<style scoped lang="scss">
main {
  width: 100%;
  padding: 0 100px;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  color: #000;
  h1,
  h2 {
    color: #3bc66f;
  }
  .image-section {
    margin-top: 80px;

    .img-row {
      display: flex;
      margin-top: 20px;
      .img-big-box {
        &:nth-child(2),
        &:nth-child(3) {
          margin-left: 15px;
        }
        .text-describe {
          margin-top: 20px;
        }
      }
      .img-box {
        height: auto;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;

        img {
          border-radius: 10px;
        }
        .center-text {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          letter-spacing: 0.5rem;
          z-index: 1;
        }

        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% - 5px);
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          transition: all 0.1s linear;
        }

        &:hover .mask {
          background: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  .waterfall-section {
    margin-top: 80px;

    .waterfall {
      margin-top: 20px;
    }
  }
}
</style>
