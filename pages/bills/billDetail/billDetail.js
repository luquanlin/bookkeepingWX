// pages/bills/billDetail/billDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bill_id: 0,
    billDetailData: [],
    found: false,
    maskFlag: false,
  },
  selectDetail: function() {
    wx.request({
      url: app.globalData.serviceUrl + 'Bill/selectAllBdetail',
      data: {
        bill_id: this.data.bill_id
      },
      success: (res) => {
        let result = res.data.data
        let billDetailData = this.data.billDetailData
        if (result.length > 0) {
          this.setData({
            bill_add: result[0].bill_add,
            bill_income: result[0].bill_income,
            bill_expend: result[0].bill_expend,
            bill_total: result[0].bill_total,
            bill_average: result[0].bill_average
          })
          if (result[0].user_id == app.globalData.userId) {
            this.setData({
              found: true
            })
          } else {
            this.setData({
              found: false
            })
          }
        }
        result.forEach((item, index) => {

          billDetailData.push({
            item,
            bdetail_remarks: item.bdetail_remarks,
            type_name: item.type_name,
            bdetail_date: item.bdetail_date,
            bdetail_money: item.bdetail_money,
            type_mark: item.type_mark,
            user_name: item.user_name,
            bill_name: item.bill_name,
            uuid: item.uuid,
            bdetail_id: item.bdetail_id,
          })
        })

        this.setData({
          billDetailData,
          userId: app.globalData.userId
        })

      }
    })
  },
  goPeople: function(e) {
    wx.navigateTo({
      url: "/pages/bills/billPeople/billPeople?bill_id=" + this.data.bill_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.bill_id = options.bill_id
    this.setData({
      found: options.users,
      bill_add: options.bill_add
    })

  },
  delete: function(e) {
    console.log(e)
    let bdetail_id = e.currentTarget.dataset.item.bdetail_id
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: (res) => {
        if (res.confirm) {

          wx.request({
            url: app.globalData.serviceUrl + 'Bill/deleteUserBdetail',
            data: {
              bdetail_id
            },
            success: (res) => {
              wx.showToast({
                title: '删除成功',
              })
              this.onShow()
            }
          })

        } else if (res.cancel) {

        }

      }
    })
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
    this.data.billDetailData = []
    this.selectDetail()
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

  },
  addDetail: function(e) {

    wx.navigateTo({
      url: '/pages/bills/billDetail/addDetail/addDetail?bill_id=' + this.data.bill_id,
    })
  },
  closeBill: function(e) {
    console.log(e)

    wx.showModal({
      title: '提示',
      content: '确定要结算吗？',
      success: (res) => {
        if (res.confirm) {

          wx.request({
            url: app.globalData.serviceUrl + 'Bill/closeBill',
            data: {
              bill_id: this.data.bill_id
            },
            success: (res) => {
              wx.showToast({
                title: '结算成功',
              })
              this.onShow()
            }
          })

        } else if (res.cancel) {

        }

      }
    })
  },
  selectOneDetail: function() {
    this.setData({
      maskFlag: true
    })
  },
  mask: function() {
    this.setData({
      maskFlag: false
    })
  }
})