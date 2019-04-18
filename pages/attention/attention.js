// pages/attention/attention.js
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
import fileUrl from '../../http/fileServeUrl.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath: fileUrl,     //图片根路径
    isHide :false,
    attentionList:[],       //我的关注列表
    tagList:[],             //标签数组
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
    $http(apiSetting.projectApiFindProjectListByMyConc, promise).then((data) => {
      this.setData({ attentionList:data.list})

      let _arr = data.list
      let _arr1 = []
      for (let i = 0; i < _arr.length; i++) {
        if (!_arr[i].labels){
          _arr1.push('')
        }else{
          _arr1.push(_arr[i].labels.split(','))
        }
      }
      this.setData({ tagList: _arr1 })
    })
  },
  //查看关注列表楼盘详情
  goInformation(e){
    let project_id = e.currentTarget.dataset.project_id
    wx.navigateTo({
      url: '../information/information?project_id=' + project_id ,
    })
  },
})