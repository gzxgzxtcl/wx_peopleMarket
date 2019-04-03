// pages/bindUser/bindUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    console.log(1)
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
    // this.endSetInter()
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
    let that = this
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
      isnote: false
    })
  },

  endSetInter() {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
})