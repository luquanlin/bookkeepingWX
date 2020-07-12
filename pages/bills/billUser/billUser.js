// pages/bills/billUser/billUser.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addBill: []
  },
  billUserIfZero: function() {
    wx.request({
      url: app.globalData.serviceUrl + 'Bill/billUserIfZero',
      data: {
        user_id: app.globalData.userId,
      },
      success: (res) => {
        let result = res.data.data
        let addBill = this.data.addBill
        result.forEach(item => {
          addBill.push({
            bill_name: item.bill_name,
            buser_time: item.buser_time,
            buser_id: item.buser_id
          })
        })
        this.setData({
          addBill
        })
      }
    })
  },
  sure: function(e) {
    console.log("e", e)
    let buser_id = e.currentTarget.dataset.item.buser_id
    wx.request({
      url: app.globalData.serviceUrl + 'Bill/updateBillUserIfOne',
      data: {
        buser_id,
      },
      success: (res) => {
        let result = res.data.data
        wx.showToast({
          title: '已同意',
        })
        this.data.addBill = []
        this.billUserIfZero()
      }
    })
  },
  delete: function(e) {
    console.log("e", e)
    let buser_id = e.currentTarget.dataset.item.buser_id
    wx.request({
      url: app.globalData.serviceUrl + 'Bill/updateBillUserIfTwo',
      data: {
        buser_id,
      },
      success: (res) => {
        let result = res.data.data
        wx.showToast({
          title: '已解决',
        })
        this.data.addBill = []
        this.billUserIfZero()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.billUserIfZero()
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