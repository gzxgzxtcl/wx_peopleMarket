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
       console.log(data)
       if(data.code===0){
        wx.showToast({
          title: '领取成功',
          icon: '../../images/getOK.png',
          duration: 2000
        })
        //  let a = 'couponList['+index+'].receivedStatus'
        //  this.setData({ a:true})
         this.getAllCouponList()
       }
    }, (error) => {
      console.log(error)
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAllCouponList()
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
      console.log(data.data.list)
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