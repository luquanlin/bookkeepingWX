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
  name: function(e) {
    this.data.name = e.detail.value
  },
  account: function(e) {
    this.data.account = e.detail.value
  },
  save: function() {
    console.log("name", this.data.name)
    console.log("account", this.data.account)
    if (this.data.name == '' || this.data.account == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return false
    }
    if (this.data.name != this.data.account) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      })
      return false
    }

    wx.request({
      url: app.globalData.serviceUrl + 'User/updateOnePassword',
      data: {
        user_id: app.globalData.userId,
        user_password: this.data.name,
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