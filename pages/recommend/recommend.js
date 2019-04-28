// pages/recommend/recommend.js
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
const {
  $Message
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subDisabled:false,
    placeholderText: '请输入客户相关描述，如意向户型、面积等',
    isCitySelect: false, // 是否选择城市
    visible: false,
    visible2: false, //确认推荐模态窗


    showBgpack: false,//是否显示授权窗口
    reportList: {
      city: '',
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
    city_id: '',

    //性别
    gender: 1,

    arrayProject: [],
    arrayProjectIndex: null,

    index:0,            //客户电话区号选择默认下标
    //+86(港:+852,澳:+853,台:+886)
    array:[
      { city: '大陆', mobileFlag:'+86'},
      { city: '香港', mobileFlag: '+852'},
      { city: '澳门', mobileFlag: '+853' },
      { city: '台湾', mobileFlag: '+886' }
    ]
  },
//新增用户授权------------------------------------------------------------------↓
  // 获取微信用户信息
  onGotUserInfo(e) {
    wx.showTabBar()
    // console.log(e.detail.userInfo)
    wx.setStorageSync('wxUserInfo', e.detail.userInfo)
    this.setData({
      showBgpack: false
    })
   
  },
  //取消授权窗
  cancelTip(){
    this.setData({ showBgpack:false})
    wx.navigateBack({
      delta: 1
    })
  },


//-------------------------------------------------------------------↑
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;

    //新增---》用户信息授权----------↓
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.hideTabBar()
          that.setData({
            showBgpack: true
          })
        }
      }
    })
//----------------------------↑
   
    //判断是否有传递的项目id，如果有，直接复制给data中的变量，即详情页的跳转
    if (options.project_id) {
      this.setData({
        'reportList.projectId': options.project_id,
      })
      this.getCityInfo(options.project_id);
    } else {
      this.getRecommendGetProjectList()
    }
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

    } else {
      that.setData({
        visible: true,
        placeholderText: ''
      })
    }
   
    
  },

  onShow: function() {
    //判断是否是从选择城市进入
    if (this.data.isCitySelect) {
      if (app.globalData.transienceCity.id) {
        this.data.city_id = app.globalData.transienceCity.id
        this.setData({
          'city_id': app.globalData.transienceCity.id,
          'reportList.city': app.globalData.transienceCity.city,
          'reportList.projectId': '',
          'arrayProjectIndex': null
        })
        this.getRecommendGetProjectList()
      }
    }
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
  //电话地区选择
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      'reportList.mobileFlag': this.data.array[e.detail.value].mobileFlag
    })
    console.log(this.data.reportList)
  },

  // 城市选择
  citySelcet() {
    this.data.isCitySelect = true
    wx.navigateTo({
      url: '../citySelect/citySelect?city_id=' + this.data.city_id
    })
  },

  //详情(id)-->推荐，获取城市信息
  getCityInfo(id) {
    let promise = {
      project_id: id
    }
    $http(apiSetting.projectApiFindProjectInfoById, promise).then((data) => {
      let projectInfo = data.data
      this.setData({
        'reportList.city': projectInfo.city_text,
        city_id: projectInfo.city
      })
      this.getRecommendGetProjectList()
    }, (error) => {
      console.log(error)
    });
  },
  // 获取推荐楼盘
  getRecommendGetProjectList() {
    let that = this
    if (!this.data.city_id) {
      let cityInfo = wx.getStorageSync('storLocalCity')
      if (!cityInfo) return           //待定--------------》》可以直接修改首页，存入城市信息
      this.setData({
        'reportList.city': cityInfo.city,
        city_id: cityInfo.id
      })
    }
    let promise = {
      cityId: this.data.city_id,
      openid:app.globalData.bindUserInfo.wxid
    }

    //获取楼盘列表
    $http(apiSetting.recommendGetProjectList, promise).then((data) => {
      if (that.data.reportList.projectId) {
        let findI = data.data.findIndex((n) => {
          return n.wxProjectId == that.data.reportList.projectId
        })
        that.setData({
          arrayProject: data.data,
          arrayProjectIndex: findI
        })
      } else {
        this.setData({
          arrayProject: data.data
        })
      }
    }, (error) => {
      console.log(error)
    })
  },

  //选择推荐楼盘列表
  arrayProjectChange(e) {
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
  //确认推荐
  bindSub() {
    if (this.data.reportList.customName == "") {
      $Message({
        content: '请输入客户姓名',
        type: 'warning'
      });
      return
    }
    if (this.data.reportList.customPhone == "") {
      $Message({
        content: '请输入客户电话',
        type: 'warning'
      });
      return
    }
    if (this.data.reportList.projectId == "") {
      $Message({
        content: '请选择推荐楼盘',
        type: 'warning'
      });
      return
    }
    let promise = this.data.reportList
    this.setData({
      subDisabled: true
    })
    $http(apiSetting.recommendAddAgencyCustom, promise).then((data) => {
      if (!data.code) {
        this.setData({
          visible2: true,
          placeholderText: ''
        })
      } else {
        this.setData({
          subDisabled: false
        })
        $Message({
          content: data.message,
          type: 'error'
        });
      }
    }, (error) => {
      console.log(error)
    });
  },

  //确认模态窗
  handleCloseOk() {
    wx.navigateTo({
      url: '../clients/client'
    })
    this.setData({
      visible2: false,
      placeholderText: '请输入客户相关描述，如意向户型、面积等'
    });
  },
  handleCloseNo() {
    wx.reLaunch({
      url: '../index/index'
    })
    this.setData({
      visible2: false,
      placeholderText: '请输入客户相关描述，如意向户型、面积等'
    });
  }
})