<template>
  <div>
    <div class="headBar">
      <btn-list :btnList="btnList" size=""></btn-list>
      <div class="time-line" v-if="activeIndex === 2">
        <div class="timeRange" ref="timeRange" @click="checkTimeRange">
          <span>7天</span>
          <span class="ml10">15天</span>
          <span class="ml10">本月</span>
          <span class="ml10">上月</span>
        </div>
        <el-date-picker
          v-model="timeVal"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="ml10 data-picker"
          @change="selectTime"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="change-btn">
        <el-switch v-model="isDark" @change="changeTheme"></el-switch>
        <span class="ml10">深色模式</span>
      </div>
    </div>
    <div class="views">
      <template v-if="activeIndex === 0 || activeIndex === 1">
        <LineChart ref="lineChart" class="mt20"></LineChart>
        <PieChart ref="pieChart" class="mt20"></PieChart>
      </template>
      <template v-else>
        <LineChart2 ref="lineChart2"></LineChart2>
      </template>
    </div>
  </div>
</template>

<script>
import BtnList from '@/components/common/Button/BtnList.vue'
import LineChart from '../../../components/echarts/LineChart.vue'
import { getAllCategories } from '@/api/category'
import { getCountInfo, getImageByTime } from '@/api/image'
import PieChart from '../../../components/echarts/PieChart.vue'
import LineChart2 from '../../../components/echarts/LineChart2.vue'
import {
  getPreMonthFirstDay,
  getPreMonthLastDay,
  getCurMonthFirstDay,
  getDates,
  getTodayStart,
  getPast7daysStart,
  getPast15daysStart,
} from '@/utils/time.js'
export default {
  components: { BtnList, LineChart, PieChart, LineChart2 },
  data() {
    return {
      btnList: [],
      xdata: [],
      viewsData: [],
      downloadsData: [],
      viewsTotal: null,
      downloadsTotal: null,
      isDark: false,
      activeIndex: 0,
      timeVal: [],
      endDate: '',
      startDate: '',
      timeXData: [],
      timeYData: [],
    }
  },
  methods: {
    initBtnList() {
      this.btnList = [
        {
          name: '浏览量',
          icon: 'el-icon-search',
          handleClick: this.handleSearchClick,
          type: 'primary',
        },
        {
          name: '下载量',
          icon: 'el-icon-download',
          handleClick: this.handleDownloadClick,
          type: 'success',
        },
        {
          name: '上传量',
          icon: 'el-icon-upload',
          handleClick: this.handleUploadClick,
          type: 'warning',
        },
      ]
    },
    handleSearchClick() {
      this.activeIndex = 0
      this.$nextTick(() => {
        this.setChartData()
      })
    },
    handleDownloadClick() {
      this.activeIndex = 1
      this.$nextTick(() => {
        this.setChartData()
      })
    },
    handleUploadClick() {
      this.activeIndex = 2
      this.$nextTick(() => {
        this.setChartData()
      })
    },
    //处理图表数据
    setChartData() {
      let dataset = []
      const lineChart = this.$refs.lineChart
      const pieChart = this.$refs.pieChart
      const lineChart2 = this.$refs.lineChart2
      if (this.activeIndex === 0) {
        lineChart.setData({ xdata: this.xdata, data: this.viewsData })
        this.xdata.forEach((item, i) => {
          dataset.push({ value: this.viewsData[i], name: item })
        })
        pieChart.setData(dataset)
      } else if (this.activeIndex === 1) {
        lineChart.setData({ xdata: this.xdata, data: this.downloadsData })
        this.xdata.forEach((item, i) => {
          dataset.push({ value: this.downloadsData[i], name: item })
        })
        pieChart.setData(dataset)
      } else {
        lineChart2.setData({ xdata: this.timeXData, data: this.timeYData })
      }
    },
    //检测选择的时间范围
    checkTimeRange(e) {
      const val = e.target.innerHTML
      this.endDate = getTodayStart()
      if (val === '7天') {
        this.startDate = getPast7daysStart()
      } else if (val === '15天') {
        this.startDate = getPast15daysStart()
      } else if (val === '本月') {
        this.startDate = new Date(getCurMonthFirstDay()).getTime()
      } else {
        this.startDate = new Date(getPreMonthFirstDay()).getTime()
        this.endDate = new Date(getPreMonthLastDay()).getTime()
      }
      this.timeVal = [
        this.$dayjs(this.startDate).format('YYYY-MM-DD'),
        this.$dayjs(this.endDate).format('YYYY-MM-DD'),
      ]
      //根据时间区间生成数组
      this.createTimeZoom()
      this.getImageByTime()
      //开启自毁定时器
    },
    createTimeZoom() {
      const res = getDates(new Date(this.startDate), new Date(this.endDate))
      this.timeXData = res
    },
    //表单选择时间触发事件
    selectTime() {
      this.startDate = new Date(this.timeVal[0]).getTime()
      this.endDate = new Date(this.timeVal[1]).getTime()
      this.createTimeZoom()
      this.getImageByTime()
    },
    //切换深色模式
    changeTheme() {
      const pieChart = this.$refs.pieChart
      const lineChart = this.$refs.lineChart
      pieChart.setBackground(this.isDark)
      lineChart.setBackground(this.isDark)
    },
    //获取浏览和下载的数据
    async getCountInfo() {
      const res = await getCountInfo()
      if (res.status !== 200) return
      const { countInfo, viewsTotal, downloadsTotal } = res.data
      this.viewsTotal = viewsTotal
      this.downloadsTotal = downloadsTotal
      for (const key in countInfo) {
        if (Object.hasOwnProperty.call(countInfo, key)) {
          this.xdata.push(key)
          this.viewsData.push(countInfo[key].views)
          this.downloadsData.push(countInfo[key].downloads)
        }
      }
      this.setChartData()
    },
    //通过时间来获取数据，参数必须为毫秒值
    async getImageByTime() {
      const lineChart2 = this.$refs.lineChart2
      let timeArr = []
      const res = await getImageByTime({
        endDate: this.endDate,
        startDate: this.startDate,
      })
      if (res.status !== 200) {
        this.timeXData.forEach((time, i) => {
          timeArr[i] = 0
        })
      } else {
        this.timeXData.forEach((time, i) => {
          timeArr[i] = 0
          res.data.forEach((item) => {
            if (item.createdAt.indexOf(time) !== -1) {
              timeArr[i] += 1
            }
          })
        })
      }
      this.timeYData = timeArr
      lineChart2.setData({ xdata: this.timeXData, data: this.timeYData })
    },
  },
  created() {
    this.initBtnList()
    this.getCountInfo()
    this.startDate = getPast7daysStart()
    this.endDate = getTodayStart()
    this.createTimeZoom()
  },
  mounted() {
    this.getImageByTime()
  },
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 30px;
  .nav-item {
    padding: 10px;
    width: calc(100% / 3);
    border-radius: 10px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.headBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .change-btn {
    display: flex;
    align-items: center;
  }

  .time-line {
    display: flex;
    align-items: center;
    .timeRange {
      display: flex;
    }
  }
}
.views {
  display: flex;
  justify-content: space-between;
  height: 550px;
}
.data-picker {
  width: 400px;
}
</style>
