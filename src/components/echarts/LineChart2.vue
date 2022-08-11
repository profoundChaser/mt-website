<template>
  <div class="line-chart" ref="lineChart"></div>
</template>

<script>
const echarts = require('echarts')
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
            saveAsImage: { show: true },
          },
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisPointer: {
            // value: '2016-10-7',
            // snap: true,
            lineStyle: {
              color: '#7581BD',
              width: 2,
            },
            label: {
              show: true,
              formatter: function (params) {
                return echarts.format.formatTime('yyyy-MM-dd', params.value)
              },
              backgroundColor: '#7581BD',
            },
            // handle: {
            //   show: true,
            //   color: '#7581BD',
            // },
          },
          axisLabel: {
            //x轴文字的配置
            show: true,
            color: '#C2C3C4',
            fontSize: 12,
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
        dataZoom: [
          {
            type: 'inside',
            throttle: 50,
          },
        ],
        tooltip: {
          trigger: 'axis',
          axis: 'auto',
          padding: 10,
          formatter: (params) => {
            const { name, value, marker } = params[0]
            return (
              name +
              '</br>' +
              marker +
              '累计上传数量：' +
              ' '.repeat(30) +
              '<b>' +
              value +
              '张' +
              '</b>'
            )
          },
        },
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            sampling: 'average',
            itemStyle: {
              color: '#0770FF',
            },
            stack: 'a',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(58,77,233,0.8)',
                },
                {
                  offset: 1,
                  color: 'rgba(58,77,233,0.3)',
                },
              ]),
            },
            data: [300, 2, 173, 111, 50, 1],
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
