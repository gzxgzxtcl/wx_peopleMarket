//app.js
import apiSetting from 'http/apiSetting.js'
import $http from 'http/http.js'
App({
  onLaunch: function() {
    let that = this

    // 获取本地存储的城市
    that.globalData.storLocalCity = wx.getStorageSync('storLocalCity') || null
  },

  // 全局参数
  globalData: {
    isCheck: false,
    openid: null,
    storLocalCity: null,
    bindUserInfo: {},
    userId: null,
    transienceCity:{},
    token:''
  }
})