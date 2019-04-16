// pages/mycoupon/mycoupon.js
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    usedVal: '未使用',            /*是否使用的列表值*/
    isOverDate: 0,               /*是否过期*/
    viewList:[],                      //视图列表
    myCouponNoUseList:[],             //我的优惠券列表-未使用              
    myCouponIsUsedList: [],            //我的优惠券列表-已使用       
    myCouponOldUsedList: [],            //我的优惠券列表-已过期  
  },
  //选择卡券类型
  clickItem(e) {
    var val = e.currentTarget.dataset.val
    this.setData({
      usedVal: val
    })
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    this.getMyConuponList()
  },
  //获取我的优惠券列表
  getMyConuponList(){
    let that=this
    let promise ={
      isUsage: 0,                            //使用状态
      page: 1,                               //页码
      perpage: 10,                           //每页数
      userId: app.globalData.userId          //用户ID
    }
    $http(apiSetting.apiCouponList, promise).then((data) => {
      console.log(data.data.list)
      let _arr = data.data.list
      for(let i=0;i<_arr.length;i++){
        _arr[i].startDate = _arr[i].startDate.split(' ')[0].split('-').join('.')
        _arr[i].endDate = _arr[i].endDate.split(' ')[0].split('-').join('.')
      }
      console.log(_arr)
      that.setData({ myCouponNoUseList: _arr, viewList: _arr})
    }, (error) => {
      console.log(error)
    });
  },
})