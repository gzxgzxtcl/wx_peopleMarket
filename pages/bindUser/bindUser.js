// pages/bindUser/bindUser.js
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      agencyAccount:'',
      agencyUid: '',
      brokertype: '',
      channelCode: '',
      code: '',
      idno: '',
      myName: '谷振兴',
      phone: '13313231519',
      wxid: ''
    },
    // 验证码窗
    noteCodeVisible: false,
    noteCodeVal: null,
    noteCodeValLeng: 4,
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
    downTime: 60,
    isnote: true,

    // 记录切换后台时间
    onHideTime: null,

    gender: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    // console.log(e.detail.value)
    // console.log(this.data.array[e.detail.value])
    this.setData({
      arrayIndex: e.detail.value
    })
  },

  // 获取验证码
  getNoteCode() {
    wx.showLoading({
      title: '正在发送',
    })
    let that = this
    let promise = {
      mobile: '13313231519',
      type: 2
    }
    $http(apiSetting.userGetCode, promise).then((data) => {
      wx.hideLoading()
      that.data.setInter = setInterval(function() {
        that.data.downTime = that.data.downTime - 1
        if (that.data.downTime <= 0) {
          that.endSetInter()
          that.setData({
            isnote: true,
            downTime: 60
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
    }, (error) => {
      console.log(error)
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
    this.setData({
      noteCodeVisible: false,
      noteResult: true
    })
  },

  noteCodeModalClose(e) {
    this.setData({
      noteCodeVisible: false
    })
  },

  // 性别选择
  genderChange(e) {
    let val = e.target.dataset.val
    console.log(e.target.dataset)
    this.setData({
      gender: val
    })
  },

  // 验证码输入
  inpBind(e) {
    console.log(e.detail.value)
    this.setData({
      noteCodeVal: e.detail.value
    })
  },

  endSetInter() {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
})