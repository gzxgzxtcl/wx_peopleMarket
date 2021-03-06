//index.js
//获取应用实例
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
import fileUrl from '../../http/fileServeUrl.js'
const {
  $Message
} = require('../../dist/base/index');
Page({
  data: {
    defaultImg:'../../images/defaultImg.png',
    // 授权窗口
    showBgpack: false,
    // 是否显示优惠券
    isHaveCoupon: true,
    // 是否有使用权限
    isPermit: false,
    imgpath: fileUrl,
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
    // 周边翻页
    rimBuildPage: {
      page: 1,
      perpage: 10,
      isPage: true
    },
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
          app.globalData.status = data.data.status
          if (data.data.isCheck == 0) {
            app.globalData.isCheck = true
          } else {
            app.globalData.isCheck = false
          }

          if (data.data.status == 401) {
            that.setData({
              isPermit: true
            })
          }
          app.globalData.userId = data.data.USERID
          that.getUserGetUserInfo(data.data.openid)
        }, (error) => {
          console.log(error)
        });
      }
    })

    // that.accreditOperate()

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.hideTabBar()
          that.setData({
            showBgpack: true
          })
        } else {
          that.accreditOperate();
        }
      }
    })
  },

  // 获取微信用户信息
  onGotUserInfo(e) {
    wx.showTabBar()
    // console.log(e.detail.userInfo)
    wx.setStorageSync('wxUserInfo', e.detail.userInfo)
    // wx.getUserInfo({
    //   success(res) {
    //     console.log(res.userInfo)
    //   }
    // })
    this.accreditOperate()
  },

  // 位置授权操作
  accreditOperate() {
    wx.showTabBar()
    this.setData({
      showBgpack: false
    })
    let that = this;
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
        isHaveCoupon: data.data.isHaveCoupon
      })
      let buildInfo = data.data.buildInfo
      let _tagArr = []
      for (let j = 0; j < buildInfo.length; j++) {
        if (buildInfo[j].labels === undefined) {
          _tagArr.push('')
        } else {
          _tagArr.push(buildInfo[j].labels.split(','))
        }
      }
      this.setData({
        buildinfotaglist: _tagArr
      })

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
      page: that.data.rimBuildPage.page,
      perpage: that.data.rimBuildPage.perpage,
      login_by: app.globalData.userId,
      city: app.globalData.storLocalCity.id
    }
    $http(apiSetting.projectApiFindProjectListByCity, promise).then((data) => {
      let rimbuildinfo = []
      if (data.list.length > 0) {
        rimbuildinfo = [...that.data.rimbuildinfolist, ...data.list]
      } else {
        that.data.rimBuildPage.isPage = false
        return
      }
      that.setData({
        rimbuildinfolist: rimbuildinfo
      })
      let _arr = []
      // if (rimbuildinfo.length<=1) return
      for (let i = 0; i < rimbuildinfo.length; i++) {
        if (rimbuildinfo[i].labels) {
          _arr.push(rimbuildinfo[i].labels.split(','))
        } else {
          _arr.push('')
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

      that.stopRefresh()
    })
  },

  // 页面跳转
  pageTobind(e) {
    let pageUrl = e.target.dataset.url
    wx.navigateTo({
      url: pageUrl
    })
  },

// 错误图片
  erroImage(e){
    if(e.type == 'error'){
      this.data.buildinfolist[e.target.dataset.index].pictureurl = this.data.defaultImg
      this.setData({
        buildinfolist: this.data.buildinfolist
      })
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    // 显示导航栏加载框
    wx.showNavigationBarLoading()
    this.onLoad()
  },
  // 停止刷新
  stopRefresh() {
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  // 页面到达底部
  onReachBottom() {
    // 判断是否翻页
    if (this.data.rimBuildPage.isPage) {
      this.data.rimBuildPage.page++
      this.getRimBuildInfo()
    }
  }
})