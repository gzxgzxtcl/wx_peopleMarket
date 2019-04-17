//index.js
//获取应用实例
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
const {
  $Message
} = require('../../dist/base/index');
Page({
  data: {
    isPermit:false,
    imgpath: 'http://39.98.191.16',
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
    buildinfolist: [],
    //楼盘信息标签列表
    buildinfotaglist: [],
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
      url: '../information/information?project_id=' + project_id + '&&imgurl=' + imgurl
    })
  },

  onLoad: function(option) {
    let that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res.code)
        let promise = {
          code: res.code
        }
        $http(apiSetting.userDecodeUserInfo, promise).then((data) => {
          console.log('openid:' + data.data.openid)
          console.log('status:' + data.data.status)
          app.globalData.token = data.data['vx-zhwx-token']
          app.globalData.openid = data.data.openid
          if (data.data.isCheck == 0) {
            app.globalData.isCheck = true
          } else {
            app.globalData.isCheck = false
          }
          
          if (data.data.status == 401){
            that.setData({
              isPermit:true
            })
          }
          app.globalData.userId = data.data.USERID
          that.getUserGetUserInfo(data.data.openid)
        }, (error) => {
          console.log(error)
        });
      }
    })

    // 判断本地是否有数据
    if (app.globalData.storLocalCity) {
      that.data.cityInfo.cityName = app.globalData.storLocalCity.city
      that.getCityFindBuildInfoByCity()
    } else {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success(res) {
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
      app.globalData.storLocalCity = data.data.cityInfo
      that.setData({
        cityNametext: data.data.cityInfo.city,
        imgUrls: data.data.rollImg,
        buildinfolist: data.data.buildInfo,
      })
      let buildInfo = data.data.buildInfo
      let _tagArr=[]
      for (let j = 0; j < buildInfo.length;j++){
        if (buildInfo[j].labels===undefined){
          _tagArr.push('')
        }else{
          _tagArr.push(buildInfo[j].labels.split(','))
        }
      }
      this.setData({ buildinfotaglist: _tagArr})

      // 获取周边楼盘
      this.getRimBuildInfo();

    }, (error) => {
      console.log(error)
    });
  },

  //获取周边城市信息
  getRimBuildInfo() {
    let that = this
    let promise = {
      page: 1,
      perpage: 10,
      login_by: app.globalData.userId,
      city: app.globalData.storLocalCity.id
    }
    $http(apiSetting.projectApiFindProjectListByCity, promise).then((data) => {
      let rimbuildinfo
      if (data.list) {
        rimbuildinfo = data.list
      } else {
        rimbuildinfo = []
      }
      that.setData({
        rimbuildinfolist: rimbuildinfo
      })
      let _arr = []
      // if (rimbuildinfo.length<=1) return
      for (let i = 0; i < rimbuildinfo.length; i++) {
        if (rimbuildinfo[i].labels) {
          _arr.push(rimbuildinfo[i].labels.split(','))
        }
      }
      that.setData({
        rimbuildinfotaglist: _arr
      })
    }, (error) => {
      console.log(error)

    });
  },

  // 获取绑定用户信息
  getUserGetUserInfo(val) {
    let that = this
    $http(apiSetting.userGetUserInfo, {
      openid: val
    }).then((data) => {
      app.globalData.bindUserInfo = data.data
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