// pages/coupon /coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGet: false /*是否领取*/
  },

  getCoupon() {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    this.setData({ isGet: true })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})