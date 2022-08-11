<template>
  <div class="pie-chart chart" ref="pieChart"></div>
</template>

<script>
export default {
  data() {
    return {
      pieChart: null,
      options: {
        legend: {
          top: 'bottom',
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
          position: function (point, params, dom, rect, size) {
            let x = 0
            let y = 0
            let pointX = point[0]
            let pointY = point[1]
            let boxWidth = size.contentSize[0]
            let boxHeight = size.contentSize[1]
            if (boxWidth > pointX) {
              x = 5
            } else {
              x = pointX - boxWidth
            }
            if (boxHeight > pointY) {
              y = 5
            } else {
              y = pointY - boxHeight
            }
            return [x, y]
          },
        },
        series: [
          {
            name: 'pie Chart',
            type: 'pie',
            radius: [50, 200],
            center: ['50%', '50%'],
            // roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: [],
          },
        ],
        backgroundColor: '',
      },
    }
  },
  methods: {
    initChart() {
      let that = this
      this.pieChart = this.$echarts.init(this.$refs.pieChart)
      this.pieChart.setOption(that.options)
      window.addEventListener('resize', () => {
        this.pieChart.resize()
      })
    },
    setData(res) {
      let that = this
      this.options.series[0].data = res
      // if (this.roseType) {
      //   this.options.series[0].roseType =roseType
      // }
      this.pieChart.setOption(that.options, true)
    },
    setBackground(isDark) {
      let that = this
      this.options.backgroundColor = isDark ? '#000' : ''
      this.pieChart.setOption(that.options, true)
    },
  },
  mounted() {
    this.initChart(false)
  },
}
</script>

<style lang="scss" scoped>
.pie-chart {
  width: 100%;
  height: 100%;
}
</style>
