// pages/coupon /coupon.js
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGet: false /*是否领取*/
  },
  //点击领取优惠券
  getCoupon(e) {
    let that=this
    let promise = {
      couponId: e.currentTarget.detail.id,          //卡券ID
      userId: app.globalData.userId                 //用户ID
    }
    console.log(app.globalData.userId)
    $http(apiSetting.apiCouponGetCoupon, promise).then((data) => {
     console.log(data)
    }, (error) => {
      console.log(error)
    });
    // wx.showToast({
    //   title: '领取成功',
    //   icon: '../../images/getOK.png',
    //   duration: 2000
    // })
    // this.setData({
    //   isGet: true
    // })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})