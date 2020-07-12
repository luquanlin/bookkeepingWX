// pages/mine/datas/datas.js
import * as echarts from '../../../ec-canvas/echarts';
const app = getApp()


Page({
  data: {
    ec: {
      onInit: Object
    },
    ecZero: {
      onInit: Object
    },
    ecOne: {
      onInit: Object
    },
    tabIndex: 0,
  },
  onLoad: function(options) {

    this.selectAll()


    this.selectZero()

    this.selectOne()

  },
  selectAll: function() {
    let data = []
    wx.request({
      url: app.globalData.serviceUrl + 'Bill/tjAll',
      data: {
        user_id: app.globalData.userId,
      },
      success: (res) => {
        let result = res.data.data
        result.forEach(item => {
          data.push({
            value: parseInt(item.money),
            name: item.type_mark == '0' ? '支出' : '收入'
          })
        })
        console.log("data", data)

        let option = {

          tooltip: {
            trigger: 'item',
            formatter: '{c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',

          },
          series: [{
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        this.initChart(option)
      }
    })

  },
  initChart: function(options) {
    console.log("options", options)
    let charts = function initChart(canvas, width, height, dpr) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
      });
      canvas.setChart(chart);

      let option = options
      chart.setOption(option);
      return chart;
    }
    this.setData({
      ec: {
        onInit: charts
      }
    })
  },
  tabSelect: function(e) {
    let index = e.currentTarget.dataset.index
    if (index == this.data.tabIndex) {
      return
    }
    this.setData({
      tabIndex: index,
      ec: {
        onInit: Object
      },
    })

  },
  selectZero: function() {
    let data = []
    wx.request({
      url: app.globalData.serviceUrl + 'Bill/tjMarkZero',
      data: {
        user_id: app.globalData.userId,
      },
      success: (res) => {
        let result = res.data.data
        result.forEach(item => {
          data.push({
            value: parseInt(item.money),
            name: item.type_name
          })
        })

        console.log("data", data)

        let option = {

          tooltip: {
            trigger: 'item',
            formatter: '{c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
          },
          series: [{
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };

        this.initChartZero(option)
      }
    })

  },
  initChartZero: function(options) {
    console.log("options", options)
    let charts = function initChart(canvas, width, height, dpr) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
      });
      canvas.setChart(chart);

      let option = options
      chart.setOption(option);
      return chart;
    }
    this.setData({
      ecZero: {
        onInit: charts
      }
    })
  },

  selectOne: function() {
    let data = []
    wx.request({
      url: app.globalData.serviceUrl + 'Bill/tjMarkOne',
      data: {
        user_id: app.globalData.userId,
      },
      success: (res) => {
        let result = res.data.data
        result.forEach(item => {
          data.push({
            value: parseInt(item.money),
            name: item.type_name
          })
        })

        console.log("data", data)

        let option = {

          tooltip: {
            trigger: 'item',
            formatter: '{c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',

          },
          series: [{
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };

        this.initChartOne(option)
      }
    })


  },
  initChartOne: function(options) {
    console.log("options", options)
    let charts = function initChart(canvas, width, height, dpr) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
      });
      canvas.setChart(chart);

      let option = options
      chart.setOption(option);
      return chart;
    }
    this.setData({
      ecOne: {
        onInit: charts
      }
    })
  },
});