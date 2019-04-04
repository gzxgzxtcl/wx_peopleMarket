//index.js
//获取应用实例
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
  },
  // 切换城市
  changeCity() {
    wx.navigateTo({
      url: '../cityList/cityList'
    })
  },
  // 切换banner图
  changeImg(e) {
    console.log(e)
    this.setData({
      swiperCurrent: e.currentTarget.dataset.index
    })
  },
  swiperChange(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //跳转详情页
  goInformation() {
    wx.navigateTo({
      url: '../information/information'
    })
  },

  onLoad: function(option) {
    let that = this
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userLocation'])
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              console.log(res)
              that.getMapLocation();
            },
            fail(res) {
              console.log(res)
            }
          })
        } else {
          that.getMapLocation();
        }
      }
    })
  },

  getMapLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(JSON.stringify(res))
      },
      fail: function(res) {

      },
      complete: function(res) {

      }
    })
  },

  // 页面跳转
  pageTobind(e) {
    let pageUrl = e.target.dataset.url
    wx.navigateTo({
      url: pageUrl
    })
  }
})