// pages/bindUser/bindUser.js
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
    isEdit: false,
    userInfo: {
      agencyAccount: '',
      agencyUid: '',
      brokertype: '独立经纪人',
      channelCode: '',
      idno: '',
      myName: '',
      phone: '',
      sex: '男',
      wxid: ''
    },
    showAgencyAccount: '',
    // 验证码窗
    noteCodeVisible: false,
    noteCodeVal: null,
    noteCodeValLeng: 4,
    modalPhone: null,
    // 验证是否成功
    noteResult: false,
    array: [{
      id: 1,
      name: '独立经纪人'
    }, {
      id: 2,
      name: '中海业主'
    }, {
      id: 3,
      name: '中介'
    }],
    arrayIndex: 0,

    // 存放计时器
    setInter: '',
    // 验证倒计时
    downTime: 180,
    isnote: true,

    // 记录切换后台时间
    onHideTime: null,

    gender: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
 
    if (app.globalData.isCheck) {
      // 经纪人账号
      this.data.userInfo.agencyAccount = app.globalData.bindUserInfo.agencyAccount
      // 经纪人uid
      this.data.userInfo.agencyUid = app.globalData.bindUserInfo.agencyHaikeUid
      this.data.userInfo.brokertype = app.globalData.bindUserInfo.brokertype
      // 渠道验证码
      this.data.userInfo.channelCode = app.globalData.bindUserInfo.agencyMobile
      // 身份证号
      this.data.userInfo.idno = app.globalData.bindUserInfo.idno
      this.data.userInfo.myName = app.globalData.bindUserInfo.myname
      this.data.userInfo.phone = app.globalData.bindUserInfo.phone
      this.data.userInfo.sex = app.globalData.bindUserInfo.sex
      this.data.userInfo.wxid = app.globalData.bindUserInfo.wxid

      let findIndex = this.data.array.findIndex((n) => {
        return n.name == app.globalData.bindUserInfo.brokertype
      })

      this.setData({
        userInfo: this.data.userInfo,
        gender: this.data.userInfo.sex,
        arrayIndex: findIndex,
        isEdit: false,
        showAgencyAccount: app.globalData.bindUserInfo.agencyAccount,
        modalPhone: app.globalData.bindUserInfo.phone
      })
    } else {
      this.data.userInfo.wxid = app.globalData.openid
      this.setData({
        gender: this.data.userInfo.sex,
        isEdit: true
      })
    }

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
    if (!this.data.isnote) {
      let diff = Math.round(new Date().getTime() / 1000) - this.data.onHideTime
      this.data.downTime = this.data.downTime - diff
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.data.onHideTime = Math.round(new Date().getTime() / 1000)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.endSetInter()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  bindPickerChange(e) {

    this.setData({
      arrayIndex: e.detail.value
    })
    this.data.userInfo.brokertype = this.data.array[e.detail.value].name
  },

  // 获取验证码
  getNoteCode() {
    if (this.data.userInfo.phone == '') {
      $Message({
        content: '请输入手机号',
        type: 'warning'
      });
      return
    }
    wx.showLoading({
      title: '正在发送',
    })
    let that = this
    let promise = {
      mobile: that.data.userInfo.phone,
      type: 2
    }
    $http(apiSetting.userGetCode, promise).then((data) => {
      wx.hideLoading()
      if (data.code == 0) {
        // 开启计时器
        that.data.setInter = setInterval(function() {
          that.data.downTime = that.data.downTime - 1
          if (that.data.downTime <= 0) {
            that.endSetInter()
            that.setData({
              isnote: true,
              downTime: 180
            })
          }
          that.setData({
            downTime: that.data.downTime
          })
        }, 1000)
        that.setData({
          isnote: false,
          noteCodeVisible: true
        })
      } else {
        $Message({
          content: data.message,
          type: 'error'
        });
      }
    }, (error) => {
      // console.log(error)
      wx.hideLoading()
    });

  },

  // 显示验证窗口
  noteCodeModalShow() {
    this.setData({
      noteCodeVisible: true
    })
  },

  noteCodeModalOk() {
    let that = this
    let promise = {
      mobile: that.data.userInfo.phone,
      code: this.data.noteCodeVal
    }
    $http(apiSetting.userCheckSMSCode, promise).then((data) => {
      if (data.code == 0) {
        $Message({
          content: '验证成功',
          type: 'success'
        });
        that.setData({
          noteCodeVisible: false,
          noteResult: true
        })
      } else {

      }
    })
  },

  noteCodeModalClose(e) {
    this.setData({
      noteCodeVal: '',
      noteCodeVisible: false
    })
  },

  // 性别选择
  genderChange(e) {
    let val = e.target.dataset.val
    this.data.userInfo.sex = val
    this.setData({
      gender: val
    })
  },

  myNameBind(e) {
    this.data.userInfo.myName = e.detail.value
  },
  phoneBind(e) {
    this.setData({
      modalPhone: e.detail.value
    })
    this.data.userInfo.phone = e.detail.value
  },
  idnoBind(e) {
    this.data.userInfo.idno = e.detail.value
  },
  channelCodeBind(e) {
    let val = e.detail.value
    this.data.userInfo.channelCode = e.detail.value
    if (val.length >= 11) {
      this.getUserGetHaikeAgencyInfo(val)
    }
  },
  agencyAccountBind(e) {
    this.data.userInfo.agencyAccount = e.detail.value
  },
  // 验证码输入
  inpBind(e) {
    this.setData({
      noteCodeVal: e.detail.value
    })
  },

  endSetInter() {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },

  // 获取海客中介用户
  getUserGetHaikeAgencyInfo(val) {
    let that = this
    let promise = {
      channelCode: val,
      openid: app.globalData.openid
    }
    $http(apiSetting.userGetHaikeAgencyInfo, promise).then((data) => {
      if (data.code == 0) {
        that.data.userInfo.agencyAccount = data.data.agencyAccount
        that.data.userInfo.agencyUid = data.data.agencyUid
        that.setData({
          showAgencyAccount: data.data.agencyAccount,
        })
      }
      if (data.code == -1) {
        $Message({
          content: data.message,
          type: 'warning'
        });
      }
    })
  },

  // 用户信息提交
  bindSub() {
    // console.log(this.data.userInfo)
    // 是否填写姓名
    if (this.data.userInfo.myName == '') {
      $Message({
        content: '请输入姓名',
        type: 'warning'
      });
      return
    }

    // 短信是否验证通过
    if (!this.data.noteResult) {
      $Message({
        content: '请进行短信验证',
        type: 'warning'
      });
      return
    }

    if (this.data.arrayIndex == 1) {
      if (this.data.userInfo.idno == "") {
        $Message({
          content: '请输入身份证号',
          type: 'warning'
        });
        return
      }
    }

    if (this.data.arrayIndex == 2) {
      if (this.data.userInfo.showAgencyAccount == "") {
        $Message({
          content: '请正确填写渠道验证码',
          type: 'warning'
        });
        return
      }
    }

    let that = this
    let promise = this.data.userInfo
    wx.showLoading()
    $http(apiSetting.userIdentifyUser, promise).then((data) => {
      if (data.code == 0) {
        that.getUserGetUserInfo(app.globalData.openid)
      }else{
        $Message({
          content: data.message,
          type: 'error'
        });
      }
      wx.hideLoading()
    })

  },


// 修改
  amendSub(){
    this.setData({
      isEdit:true
    })
  },

  // 获取绑定用户信息
  getUserGetUserInfo(val) {
    let that = this
    $http(apiSetting.userGetUserInfo, {
      openid: val
    }).then((data) => {
      if (data.data.ischeck == 0){
        app.globalData.ischeck = true
      }
      app.globalData.bindUserInfo = data.data
      wx.reLaunch({
        url: '../index/index'
      })
    })
  }
})