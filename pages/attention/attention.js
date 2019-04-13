// pages/attention/attention.js
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide :false,
    attentionList:[],       //我的关注列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getProjectApiFindProjectListByMyConc()
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
    if (this.data.isHide){
      this.getProjectApiFindProjectListByMyConc()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.data.isHide = true
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
  //获取我的关注列表
  getProjectApiFindProjectListByMyConc() {
    let promise = {
      page: 1,
      perpage: 10,
      login_by: app.globalData.userId
    }
    console.log(app.globalData.userId)
    console.log(promise)
    $http(apiSetting.projectApiFindProjectListByMyConc, promise).then((data) => {
      console.log(data)
      this.setData({ attentionList:data.list})
      console.log(this.data.attentionList)
    })
  },
  //查看关注列表楼盘详情
  goInformation(e){
    console.log(e)
    let project_id = e.currentTarget.dataset.project_id
    wx.navigateTo({
      url: '../information/information?project_id=' + project_id ,
    })
  },
})