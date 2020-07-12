const app = getApp()
const utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectBillPeopleData: [],
    bill_id: 0,
    account: '',
    found: false,
  },
  selectBillPeople: function() {
    wx.request({
      url: app.globalData.serviceUrl + 'Bill/selectBillAllPeople',
      data: {
        bill_id: this.data.bill_id
      },
      success: (res) => {
        let result = res.data.data
        if (result.length > 0) {
          if (result[0].found_id == app.globalData.userId) {
            this.setData({
              found: true
            })
          } else {
            this.setData({
              found: false
            })
          }
        }
        let selectBillPeopleData = this.data.selectBillPeopleData
        result.forEach((item, index) => {

          selectBillPeopleData.push({
            item,
            user_name: item.user_name,
            user_account: item.user_account,
            buser_time: item.buser_time,
            buser_if: item.buser_if,
            user_id: item.user_id,
            buser_id: item.buser_id
          })
        })
        console.log("app.globalData.userId", app.globalData.userId)
        this.setData({
          selectBillPeopleData,
          userId: app.globalData.userId
        })

      }
    })
  },
  accountInp: function(e) {
    this.data.account = e.detail.value
  },
  save: function() {
    console.log("this.data.account", this.data.account)
    let account = this.data.account
    if (account == '') {
      wx.showToast({
        title: '请输入邀请人的帐号',
        icon: 'none'
      })
      return false
    }
    let buser_time = new Date()
    buser_time = utils.formatTime(buser_time)
    console.log("buser_time", buser_time)

    wx.request({
      url: app.globalData.serviceUrl + 'User/selectAccountUser',
      data: {
        user_account: account
      },
      success: (res) => {
        let result = res.data.data[0]
        if (res.data.data.length == 0) {
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          })
        }
        let user_id = result.user_id
        wx.request({
          url: app.globalData.serviceUrl + 'Bill/insertBillPeople',
          data: {
            bill_id: this.data.bill_id,
            user_id,
            buser_time,
          },
          success: (res) => {
            let result = res.data.data
            if (result == '1') {
              wx.showToast({
                title: '添加成功',
              })
              this.onShow()
            } else {
              wx.showToast({
                title: '添加失败',
                icon: 'none'
              })
            }
          }
        })


      }
    })

  },
  delete: function(e) {
    console.log(e)
    let buser_id = e.currentTarget.dataset.item.buser_id
    wx.showModal({
      title: '提示',
      content: '确定要提出此人吗？',
      success: (res) => {
        if (res.confirm) {

          wx.request({
            url: app.globalData.serviceUrl + 'Bill/updateBillPeople',
            data: {
              buser_id
            },
            success: (res) => {
              if (res.data.data == '1') {
                wx.showToast({
                  title: '删除成功',
                })
                this.onShow()
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                })
              }
            },
          })

        } else if (res.cancel) {

        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.data.bill_id = options.bill_id
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
    this.data.selectBillPeopleData = []
    this.selectBillPeople()
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