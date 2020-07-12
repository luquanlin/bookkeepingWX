const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_account: '',
    user_password: '',
    loginFlag: true,
    sex: [{
      name: '男',
      value: '男',
      checked: 'true'
    }, {
      name: '女',
      value: '女'
    }],
    reName: '',
    reAcoount: '',
    rePassword: '',
    reSurePas: '',
    reSex: '',
  },
  account: function(e) {

    this.data.user_account = e.detail.value
  },
  password: function(e) {

    this.data.user_password = e.detail.value
  },
  reName: function(e) {
    console.log("注册昵称：", e)
    this.data.reName = e.detail.value
  },
  reAcoount: function(e) {
    console.log("注册账号：", e)
    this.data.reAcoount = e.detail.value
  },
  rePassword: function(e) {
    console.log("注册密码：", e)
    this.data.rePassword = e.detail.value
  },
  reSurePas: function(e) {
    console.log("注册确认密码：", e)
    this.data.reSurePas = e.detail.value
  },
  reSex: function(e) {
    console.log("注册昵称：", e)
    this.data.reSex = e.detail.value
  },

  login: function() {
    if (this.data.user_account && this.data.user_password) {
      wx.request({
        url: app.globalData.serviceUrl + 'Login/selectUserLogin',
        data: {
          user_account: this.data.user_account,
          user_password: this.data.user_password
        },
        success: (res) => {
          let result = res.data.data
          if (result != 1 && result != 0) {
            app.globalData.userId = res.data.user[0].user_id
            app.globalData.userData = res.data.user[0]
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else {
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'none'
            })
          }

        }
      })
    } else {
      wx.showToast({
        title: '请输入用户名或密码',
        icon: 'none'
      })
    }

  },
  register: function() {
    let reName = this.data.reName
    let reAcoount = this.data.reAcoount
    let rePassword = this.data.rePassword
    let reSurePas = this.data.reSurePas
    let reSex = this.data.reSex
    if (reName === '' || reAcoount === '' || rePassword === '' || reSurePas === '' || reSex === '') {
      wx.showToast({
        title: '信息未填写完整',
        icon: 'none'
      })
    } else {
      if (rePassword != reSurePas) {
        wx.showToast({
          title: '两次密码输入不同',
          icon: 'none'
        })
      } else {
        wx.request({
          url: app.globalData.serviceUrl + 'Login/insertUser',
          data: {
            user_name: reName,
            user_account: reAcoount,
            user_password: rePassword,
            user_sex: reSex
          },
          success: (res) => {
            let result = res.data.data
            if (result === "1") {
              wx.showToast({
                title: '注册成功',
              })
              this.setData({
                loginFlag: true
              })
            } else {
              wx.showToast({
                title: '注册失败',
                icon: 'none'
              })
            }
          }
        })
      }
    }

  },
  goRegister: function() {
    this.setData({
      loginFlag: !this.data.loginFlag
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