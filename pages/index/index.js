//index.js
//获取应用实例
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
Page({
  data: {
    cityNametext: '',
    imgUrls: [],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,

    // 查询城市参数
    cityInfo: {
      latitude: '',
      longitude: '',
      cityName: ''
    },
    //楼盘信息列表
    buildinfolist:[],
    //楼盘信息标签列表
    buildinfotaglist:[],
    // 楼盘信息图片
    buildinfoimg: '',
    //周边楼盘信息列表
    rimbuildinfolist: [],
    //周边楼盘信息标签列表
    rimbuildinfotaglist: [],
    // 周边楼盘信息图片
    rimbuildinfoimg: ''
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
  goInformation(e) {
    let project_id = e.currentTarget.dataset.project_id
    let imgurl = e.currentTarget.dataset.imgurl
    wx.navigateTo({
      url: '../information/information?project_id=' + project_id+'&&imgurl='+imgurl
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
    this.getRimBuildInfo();
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
        cityNametext: data.data.cityInfo.city,
        imgUrls: data.data.rollImg,
        buildinfolist: data.data.buildInfo,
      })
      // console.log(this.data.buildinfolist)
      // console.log(app.globalData.storLocalCity)
      // that.hideLoading()
      let _arr=[]
      for (let i = 0; i < data.data.buildInfo.length;i++){
        _arr.push(data.data.buildInfo[i].labels.split(','))
        // console.log(_arr)
      }
      that.setData({ buildinfotaglist:_arr})
    }, (error) => {
      console.log(error)
      // that.hideLoading()
    });
  },

  //获取周边城市信息
  getRimBuildInfo(){
    let that = this
    // console.log(app.globalData.storLocalCity.id)
    let promise = {
      page:1,
      perpage:10,
      login_by:'',
      city: app.globalData.storLocalCity.id
    }
    // console.log(promise)
    $http(apiSetting.cityFindBuildInfoByCity, promise).then((data) => {
      let rimbuildinfo = data.data.buildInfo
      that.setData({
        rimbuildinfolist: rimbuildinfo
      })
      let _arr = []
      for (let i = 0; i < rimbuildinfo.length; i++) {
        _arr.push(rimbuildinfo[i].labels.split(','))
      //  console.log(_arr)
      }
      that.setData({ rimbuildinfotaglist:_arr })
    }, (error) => {
      console.log(error)
      
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