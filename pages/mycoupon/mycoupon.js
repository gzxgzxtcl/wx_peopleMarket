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
    myCouponList:[],             //我的优惠券列表              


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
      keyword: "string",                     //卡券名称
      page: 2,                               //页码
      perpage: 10,                           //每页数
      userId: app.globalData.userId          //用户ID
    }
    $http(apiSetting.apiCouponList, promise).then((data) => {
      console.log(data.data.list)

    }, (error) => {
      console.log(error)
    });
  },
})