// pages/coupon /coupon.js
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGet: false,                  /*是否领取*/
    couponList:[],                 //优惠券列表
    couponIndex:null,                  //领取优惠券下标
    showBgpack: false,    //是否显示授权弹窗
    // 翻页
    pageData: {
      page: 1,
      perpage: 20,
      isPage: true
    },
  },
  //点击领取优惠券
  getCoupon(e) {
    let index = e.target.dataset.index
    let that=this
    let promise = {
      couponId: e.currentTarget.dataset.couponid,    //卡券ID
      userId: app.globalData.userId                 //用户ID
    }
    // console.log(promise)
    $http(apiSetting.apiCouponGetCoupon, promise).then((data) => {
       if(data.code===0){
        wx.showToast({
          title: '领取成功',
          icon: '../../images/getOK.png',
          duration: 2000
        })
        //  let a = 'couponList['+index+'].receivedStatus'
        //  this.setData({ a:true})
         this.setData({ couponList: [], 'pageData.page':1})
          this.getAllCouponList()
       }
    }, (error) => {
      console.log(error)
    });
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
  cancelTip() {
    this.setData({ showBgpack: false })
    wx.navigateBack({
      delta: 1
    })
  },


//-------------------------------------------------------------------↑
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this
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


    that.getAllCouponList()
  },
  //获取未领取优惠券
  getAllCouponList(){
    // console.log(app.globalData)
    let that=this
    let promise = {
      city: app.globalData.storLocalCity.id,
      page: that.data.pageData.page,
      perpage: that.data.pageData.perpage,
      userId: app.globalData.userId
    }
    $http(apiSetting.apiCouponCouponForCityList, promise).then((data) => {
      let _arr = []
      if (data.data.list.length>0){
        _arr = [...that.data.couponList, ...data.data.list]
      }else{
        that.data.pageData.isPage = false
        return
      }
      
      for(let i=0;i<_arr.length;i++){
        _arr[i].startDate = _arr[i].startDate.split(' ')[0].split('-').join('.')
        _arr[i].endDate = _arr[i].endDate.split(' ')[0].split('-').join('.')
        _arr[i].couponname = parseFloat(_arr[i].couponname) 
      } 
    
      this.setData({ couponList: _arr})
    }, (error) => {
      console.log(error)
    });
  },

  // 页面到达底部
  onReachBottom() {
    // 判断是否翻页
    if (this.data.pageData.isPage) {
      this.data.pageData.page++
      this.getAllCouponList()
    }
  }
})