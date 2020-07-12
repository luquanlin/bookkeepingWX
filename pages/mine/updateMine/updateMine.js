// pages/mine/updateMine/updateMine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexs: [{
        name: '男',
        value: '男',
        checked: 'true'
      },
      {
        name: '女',
        value: '女',

      }
    ],
    sexNmae: '男',
    name: '',
    account: '',
  },
  myInformation: function() {
    wx.request({
      url: app.globalData.serviceUrl + 'User/selectOneInformation',
      data: {
        user_id: app.globalData.userId,
      },
      success: (res) => {
        console.log(res)
        let result = res.data.data[0]
        let sex = true
        if (result.user_sex == '女') {
          sex = false
        }
        this.setData({
          name: result.user_name,
          account: result.user_account,
          sex
        })
      }
    })
  },
  radioChange: function(e) {
    this.data.sexNmae = e.detail.value
  },
  name: function(e) {
    this.data.name = e.detail.value
  },
  account: function(e) {
    this.data.account = e.detail.value
  },
  save: function() {
    console.log("name", this.data.name)
    console.log("account", this.data.account)
    console.log("sexNmae", this.data.sexNmae)
    wx.request({
      url: app.globalData.serviceUrl + 'User/updateOneInformation',
      data: {
        user_id: app.globalData.userId,
        user_name: this.data.name,
        user_account: this.data.account,
        user_sex: this.data.sexNmae,
      },
      success: (res) => {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.myInformation()
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