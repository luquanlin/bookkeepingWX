//app.js
App({
  //登录
  login: function() {
    let that = this
    wx.login({
      success: (res) => {
        if (res.code) {
          let code = res.code
          wx.getSetting({
            success: (res) => {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: (res) => {
                    const userInfo = res.userInfo;

                  }
                })
              } else {
                wx.showModal({
                  title: '请登录',
                  content: "登录已获得更好的使用体验",
                  success: (res) => {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '/pages/mine/mine',
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }
            }
          })
        } else {

        }
      }
    })
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.login()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("res", res)
    
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    serviceUrl: 'http://101.132.167.21:8081/',
    userId: '2',
    userData: {},
  }
})