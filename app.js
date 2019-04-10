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
          that.getUserGetUserInfo(data.data.openid)
        }, (error) => {
          console.log(error)
        });
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

// 获取绑定用户信息
  getUserGetUserInfo(val) {
    let that = this
    $http(apiSetting.userGetUserInfo, {
      openid: val
    }).then((data) => {
      that.globalData.bindUserInfo = data.data
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