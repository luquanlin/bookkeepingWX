const app = getApp()
const utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    biiName: ''
  },
  biiName: function(e) {
    this.data.biiName = e.detail.value
  },
  save: function() {
    let biiName = this.data.biiName
    let bill_date = utils.formatTime(new Date())
    console.log("bill_date", bill_date)
    if (biiName == '') {
      wx.showToast({
        title: '请输入账单名称',
        icon: 'none'
      })
      return false
    }
    wx.request({
      url: app.globalData.serviceUrl + 'Bill/insertBill',
      data: {
        user_id: app.globalData.userId,
        bill_name: biiName,
        bill_date,
      },
      success: (res) => {
        let result = res.data.data
        let bill_id = res.data.bill_id[0].bill_id
        if (result == 1) {
          wx.request({
            url: app.globalData.serviceUrl + 'Bill/insertMineBill',
            data: {
              user_id: app.globalData.userId,
              bill_id,
              buser_time: bill_date,
            },
            success: (myRes) => {
              let myResult = myRes.data.data
              if (myResult == 1) {
                wx.showToast({
                  title: '账单添加成功',

                })
                wx.navigateBack({
                  delta: 1

                })
              } else {
                wx.showToast({
                  title: '账单生成失败',
                  icon: 'none'
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '账单添加失败',
            icon: 'none'
          })
        }


      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})