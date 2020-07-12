//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allBillsData: []
  },

  allBills() {
    // select b.*, u.user_name from buser bu inner join bill b on b.bill_id = bu.bill_id inner join user u on u.user_id = b.user_id where bu.user_id = 2

    wx.request({
      url: app.globalData.serviceUrl + 'Bill/selectOtherBills',
      data: {
        buuser_id: app.globalData.userId,
        buser_id: app.globalData.userId,
      },
      success: (res) => {
        let result = res.data.data
        let allBillsData = this.data.allBillsData
        result.forEach(item => {
          let billMark = ''
          if (item.user_id == app.globalData.userId) {
            billMark = '个人创建'
          } else {
            billMark = '他人创建'
          }
          let add = false
          if (item.bill_add == 1) {
            add = true
          }
          allBillsData.push({
            bill_name: item.bill_name,
            user_name: item.user_name,
            bill_date: item.bill_date,
            add,
            billMark,
            bill_id: item.bill_id,
            bill_add: item.bill_add,
          })
        })

        this.setData({
          allBillsData
        })

      }
    })
  },
  goAddBill: function () {
    wx.navigateTo({
      url: "/pages/bills/addBill/addBill",
    })
  },
  goDetail: function (e) {
    let bill_id = e.currentTarget.dataset.item.bill_id
    let user_id = e.currentTarget.dataset.item.user_id
    let bill_add = e.currentTarget.dataset.item.bill_add
    let users = false
    if (user_id == app.globalData.userId) {
      users = true
    }
    wx.navigateTo({
      url: "/pages/bills/billDetail/billDetail?bill_id=" + bill_id + "&users=" + users + "&bill_add=" + bill_add,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.allBills()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    console.log("app.globalData.userId", app.globalData.userId)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})