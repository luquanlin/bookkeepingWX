// pages/bills/billDetail/addDetail/addDetail.js
const app = getApp()
const utils = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_mark: 0,
    typeNameList: [],
    typeName: '请选择类型名称',
    bdetail_money: '',
    bdetail_remarks: '',
    bill_id: 0,
    type_id: 0
  },
  radioChange: function(e) {
    console.log("e", e)
    this.data.type_mark = e.detail.value
    this.data.typeNameList = []
    this.selectTypeName()
  },
  //根据类别查询名称
  selectTypeName: function() {
    wx.request({
      url: app.globalData.serviceUrl + 'Type/selectTypeMark',
      data: {
        type_mark: this.data.type_mark
      },
      success: (res) => {
        let result = res.data.data
        let typeNameList = this.data.typeNameList
        result.forEach(item => {
          typeNameList.push(item)
        })
        console.log("typeNameList", typeNameList)
        this.setData({
          typeNameList,
          typeName: '请选择类型名称'
        })
      }
    })
  },
  selectType: function(e) {
    console.log("e", e)
    let index = e.detail.value
    let typeNameList = this.data.typeNameList
    let typeName = typeNameList[index].type_name
    let type_id = typeNameList[index].type_id
    console.log("typeName", typeName)
    this.setData({
      typeName,
      type_id

    })
  },
  billPrice: function(e) {
    this.data.bdetail_money = e.detail.value
  },
  remarks: function(e) {
    this.data.bdetail_remarks = e.detail.value
  },
  sure: function() {
    let bdetail_date = new Date()
    bdetail_date = utils.formatTime(bdetail_date)
    wx.request({
      url: app.globalData.serviceUrl + 'Bill/insertUserBdetail',
      data: {
        bill_id: this.data.bill_id,
        user_id: app.globalData.userId,
        type_id: this.data.type_id,
        bdetail_money: this.data.bdetail_money,
        bdetail_remarks: this.data.bdetail_remarks,
        bdetail_date
      },
      success: (res) => {
        wx.showToast({
          title: '添加成功',
        })
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
    this.data.bill_id = options.bill_id
    this.selectTypeName()
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