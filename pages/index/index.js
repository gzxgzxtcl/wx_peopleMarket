//index.js
//获取应用实例
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
Page({
  data: {
    cityNametext: '',
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,

    // 查询城市参数
    cityInfo: {
      latitude: '',
      longitude: '',
      cityName: ''
    }
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
    console.log(app.globalData.storLocalCity)
    if (app.globalData.storLocalCity) {
      that.data.cityInfo.cityName = app.globalData.storLocalCity.city
      that.getCityFindBuildInfoByCity()
    } else {
      wx.getSetting({
        success(res) {
          // console.log(res.authSetting['scope.userLocation'])
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success(res) {
                // console.log(res)
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
    }

  },

  // 获取位置
  getMapLocation() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        // console.log(res.latitude)
        // console.log(res.longitude)
        that.data.cityInfo.latitude = res.latitude.toString()
        that.data.cityInfo.longitude = res.longitude.toString()
        // console.log(that.data.cityInfo.latitude)
        that.getCityFindBuildInfoByCity()
      },
      fail: function(res) {

      },
      complete: function(res) {

      }
    })
  },

  // 获取轮播图及城市信息
  getCityFindBuildInfoByCity() {
    let that = this
    let promise = that.data.cityInfo
    $http(apiSetting.cityFindBuildInfoByCity, promise).then((data) => {
      // console.log(data.data.cityInfo)
      app.globalData.storLocalCity = data.data.cityInfo
      that.setData({
        cityNametext: data.data.cityInfo.city
      })
      // console.log(app.globalData.storLocalCity)
      // that.hideLoading()
    }, (error) => {
      console.log(error)
      // that.hideLoading()
    });
  },

  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  // 页面跳转
  pageTobind(e) {
    let pageUrl = e.target.dataset.url
    wx.navigateTo({
      url: pageUrl
    })
  }
})