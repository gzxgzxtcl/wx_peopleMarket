// pages/mycoupon/mycoupon.js
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    usedIndex: 0,                      /*类型选择下标*/
    //isOverDate: 0,                    /*是否过期*/
    myCouponList:[],                      //视图列表
    // myCouponNoUseList:[],             //我的优惠券列表-未使用              
    // myCouponIsUsedList: [],            //我的优惠券列表-已使用       
    // myCouponOldUsedList: [],            //我的优惠券列表-已过期  
  },
  //选择卡券类型
  clickItem(e) {
    console.log(e.target.dataset.type)
    if (e.target.dataset.type===undefined) return
    var type = e.target.dataset.type
    this.setData({ usedIndex: type})
    this.getMyConuponList(type)
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    this.getMyConuponList(0)
  },
  //获取我的优惠券列表
  getMyConuponList(type){
    let that=this
    let promise ={
      isUsage: type,                            //使用状态
      page: 1,                               //页码
      perpage: 10,                           //每页数
      userId: app.globalData.userId          //用户ID
    }
    $http(apiSetting.apiCouponList, promise).then((data) => {
      let _arr = data.data.list
      console.log(_arr)
      for(let i=0;i<_arr.length;i++){
        _arr[i].startDate = _arr[i].startDate.split(' ')[0].split('-').join('.')
        _arr[i].endDate = _arr[i].endDate.split(' ')[0].split('-').join('.')
        _arr[i].couponname = parseInt(_arr[i].couponname) 
      }
      that.setData({ myCouponList: _arr})
    }, (error) => {
      console.log(error)
    });
  },
})