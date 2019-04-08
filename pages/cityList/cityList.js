// pages/cityList/cityList.js
//获取应用实例
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityListData: [{
        key: 'b',
        item: [{
          id: 1,
          name: '北京'
        }]
      },
      {
        key: 'c',
        item: [{
          id: 2,
          name: '重庆'
        }, {
          id: 3,
          name: '成都'
        }, {
          id: 4,
          name: '长沙'
        }]
      }
    ],
    selectCity: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //获取城市列表
    let promise = {}
    $http(apiSetting.cityFindCityItems, promise).then((data) => {
      console.log(data.data)
    }, (error) => {
      console.log(error)
    });
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

  cityChange(e) {
    console.log(e.target.dataset.name)
    this.setData({
      selectCity: e.target.dataset.id
    })
  }
})