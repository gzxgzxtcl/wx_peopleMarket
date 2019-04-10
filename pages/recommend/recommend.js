// pages/recommend/recommend.js
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportList: {
      city: '上海',
      customName: '',
      customPhone: '',
      hkProjectId: '',
      mobileFlag: '+86',
      openId: '',
      projectId: '',
      remark: '',
      reportMobile: '',
      reportName: '',
      reportType: '',
      sex: ''
    },
    //性别
    gender: 1,
    visible: false,

    arrayProject: [],
    arrayProjectIndex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    console.log(app.globalData.bindUserInfo)
    if (app.globalData.isCheck) {
      let reportList = that.data.reportList
      reportList.openId = app.globalData.bindUserInfo.wxid
      reportList.reportMobile = app.globalData.bindUserInfo.phone
      reportList.reportName = app.globalData.bindUserInfo.myname
      reportList.reportType = app.globalData.bindUserInfo.brokertype
      reportList.sex = '男'
      that.setData({
        reportList: reportList
      })
      that.getRecommendGetProjectList()
    } else {
      that.setData({
        visible: true
      })
    }
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
  customNameBind(e) {
    this.data.reportList.customName = e.detail.value
  },
  customPhoneBind(e) {
    this.data.reportList.customPhone = e.detail.value
  },
  remarkBind(e) {
    this.data.reportList.remark = e.detail.value
  },
  genderChange(e) {
    let val = e.target.dataset.val
    if (val == 1) {
      this.data.reportList.sex = '男'
    } else {
      this.data.reportList.sex = '女'
    }
    this.setData({
      gender: val
    })
  },

  // 获取推荐楼盘
  getRecommendGetProjectList() {
    let that = this
    let promise = {
      cityId: '0-166-884-202-',
    }
    $http(apiSetting.recommendGetProjectList, promise).then((data) => {
      console.log(data.data)
      that.setData({
        arrayProject: data.data
      })
    })
  },
  arrayProjectChange(e) {
    // console.log(e.detail.value)
    // console.log(this.data.array[e.detail.value])
    this.setData({
      arrayProjectIndex: e.detail.value
    })
    this.data.reportList.projectId = this.data.arrayProject[e.detail.value].wxProjectId
  },

  visibleOk() {
    wx.navigateTo({
      url: "../bindUser/bindUser"
    })
  },

  visibleOkClose() {
    wx.reLaunch({
      url: "../index/index"
    })
  },

  bindSub() {
    console.log(this.data.reportList)
  },
})