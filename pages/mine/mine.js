const app = getApp();
Page({
  data: {
    serverUser: null, //用户数据信息
    feature: [{
        leftImage: "https://wechat.espot.com.cn/gais/webResource1/staticResource/new/1/123456.png?pfdrid_c=true",
        middleName: "我的账单"
      },
      // {
      //   leftImage: "http://wechat.espot.com.cn/gais/webResource1/staticResource/new/icon1-2.png?pfdrid_c=true",
      //   middleName: "发票中心"
      // },
      {
        leftImage: "https://wechat.espot.com.cn/gais/webResource1/staticResource/new/1/123456.png?pfdrid_c=true",
        middleName: "他人账单"
      },
      {
        leftImage: "https://wechat.espot.com.cn/gais/webResource1/staticResource/new/1/6234242.png?pfdrid_c=true",
        middleName: "结算账单"
      },

      {
        leftImage: "http://wechat.espot.com.cn/gais/webResource1/staticResource/new/returnPrice-icon.png?pfdrid_c=true",
        middleName: "统计分析"
      },
      {
        leftImage: "https://wechat.espot.com.cn/gais/webResource1/staticResource/new/1/523112.png?pfdrid_c=true",
        middleName: "修改密码"
      },
      {
        leftImage: "https://wechat.espot.com.cn/gais/webResource1/staticResource/new/1/1233442.png?pfdrid_c=true",
        middleName: "邀请信息"
      }





    ]
  },
  onLoad: function() {
    this.setData({
      serverUser: app.globalData.userInfo
    })
    console.log(this.data.serverUser)
  },

  goPage: function(e) {
    console.log("1231")

    let pagename = e.currentTarget.dataset.pagename


    if (pagename == "我的账单") {
      wx.navigateTo({
        url: '/pages/bills/myBills/mtBills',
      })
    }
    if (pagename == "他人账单") {
      wx.navigateTo({
        url: '/pages/bills/otherBills/otherBills',
      })
    }
    if (pagename == "结算账单") {
      wx.navigateTo({
        url: '/pages/bills/closeBills/closeBills',
      })
    }
    if (pagename == "统计分析") {
      wx.navigateTo({
        url: '/pages/mine/datas/datas',
      })
    }
    if (pagename == "修改密码") {
      wx.navigateTo({
        url: '/pages/mine/updatePassword/updatePassword',
      })
    }
    if (pagename == "邀请信息") {
      wx.navigateTo({
        url: '/pages/bills/billUser/billUser',
      })
    }

  },
  goToUserInfo: function() {
    wx.navigateTo({
      url: '/pages/mine/updateMine/updateMine',
    })
  },
  getTel: function(e) {

  }

})