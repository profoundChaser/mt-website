<template>
  <div class="line-chart" ref="lineChart"></div>
</template>

<script>
export default {
  data() {
    return {
      lineChart: null,
      options: {
        grid: {
          bottom: '10%',
          right: '5%',
          left: '5%',
          top: '10%',
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
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: {
            //x轴文字的配置
            show: true,
            color: '#C2C3C4',
            fontSize: 12,
            // rotate: 8,
            // textStyle: {

            // }
          },
          axisLine: {
            lineStyle: {
              color: '#E3E4E8',
            },
          },
        },
        yAxis: {
          type: 'value',
          //轴线颜色
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            // textStyle: {

            // }
            color: '#C2C3C4',
            fontSize: 12,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: '#E3E4E8',
              type: 'dashed',
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          // triggerOn:'mousemove|click',
          // backgroundColor:'#fff',
          axis: 'auto',
          padding: 10,
          // axisPointer: {
          //   type: 'shadow',
          //   shadowStyle: {
          //     color: {
          //       type: 'linear',
          //       x: 0,
          //       y: 0,
          //       x2: 0,
          //       y2: 1,
          //       colorStops: [
          //         {
          //           offset: 0,
          //           color: 'rgba(255, 151, 159, 0)',
          //         },
          //         {
          //           offset: 1,
          //           color: '#fae8ea',
          //         },
          //       ],
          //       globalCoord: false,
          //     },
          //   },
          // },
          formatter: (params) => {
            const { name, value, marker } = params[0]
            return (
              name + '</br>' + marker + '累计浏览' + ' '.repeat(30) + '<b>' + value + '张' + '</b>'
            )
          },
        },
        series: [
          {
            data: [],
            type: 'bar',
            showSymbol: false,
            showBackground: true,
            itemStyle: {
              // color: '#F30502',
              label: {
                shadowBlur: 3,
              },
            },
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
            // markPoint: {
            // 	data: [{
            // 		type: 'max',
            // 		name: 'Max'
            // 	}, ]
            // },
          },
          {
            data: [],
            type: 'line',
            showSymbol: false,
            showBackground: true,
            itemStyle: {
              // color: '#F30502',
              label: {
                shadowBlur: 3,
              },
            },
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
            // markPoint: {
            // 	data: [{
            // 		type: 'max',
            // 		name: 'Max'
            // 	}, ]
            // },
          },
        ],
        backgroundColor: '',
      },
    }
  },
  onLoad() {},
  methods: {
    initChart() {
      let that = this
      this.lineChart = this.$echarts.init(this.$refs.lineChart)
      this.lineChart.setOption(that.options)
      window.addEventListener('resize', () => {
        this.lineChart.resize()
      })
    },
    setData(res) {
      let that = this
      this.options.xAxis.data = res.xdata
      this.options.series[0].data = res.data
      this.options.series[1].data = res.data
      this.lineChart.setOption(that.options, true)
    },
    setBackground(isDark) {
      let that = this
      this.options.backgroundColor = isDark ? '#000' : ''
      this.lineChart.setOption(that.options, true)
    },
  },
  mounted() {
    this.initChart()
  },
}
</script>

<style lang="scss" scoped>
.line-chart {
  width: 100%;
  height: 100%;
}
</style>
