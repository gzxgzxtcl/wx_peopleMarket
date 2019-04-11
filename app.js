//app.js
import apiSetting from 'http/apiSetting.js'
import $http from 'http/http.js'
App({
  onLaunch: function() {
    let that = this
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 获取本地存储的城市
    this.globalData.storLocalCity = wx.getStorageSync('storLocalCity') || null

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res.code)
        let promise = {
          code: res.code
        }
        $http(apiSetting.userDecodeUserInfo, promise).then((data) => {
          console.log(data.data.openid)
          that.globalData.openid = data.data.openid
          if (data.data.isCheck == 0) {
            that.globalData.isCheck = true
          } else {
            that.globalData.isCheck = false
          }
          // that.getUserGetUserInfo(data.data.openid)
        }, (error) => {
          console.log(error)
        });
      }
    })
  
  },



  // 全局参数
  globalData: {
    isCheck: false,
    openid: null,
    storLocalCity: null,
    bindUserInfo: {}
  }
})