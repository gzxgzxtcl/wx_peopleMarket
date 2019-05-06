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


    requestData: {
      isUsage: 0,                            //使用状态
      page: 1,                               //页码
      perpage: 10,                           //每页数
      userId: ''                            //用户ID
    },
    isPage:true                             //是否加载
  },


  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    this.setData({ 'requestData.userId': app.globalData.userId })         //用户ID
    this.getMyConuponList()
  },
  
  //获取我的优惠券列表
  getMyConuponList(){
    this.setData({ 'requestData.isUsage': this.data.usedIndex})
    let promise = this.data.requestData
    $http(apiSetting.apiCouponList, promise).then((data) => {
      let _arr = data.data.list
      let _arr1=[]
      if(_arr.length>0){
        for (let i = 0; i < _arr.length; i++) {
          _arr[i].startDate = _arr[i].startDate.split(' ')[0].split('-').join('.')
          _arr[i].endDate = _arr[i].endDate.split(' ')[0].split('-').join('.')
          _arr[i].couponname = parseFloat(_arr[i].couponname)             //数据转换
        }
        _arr1 = [...this.data.myCouponList,..._arr]
        this.setData({ myCouponList: _arr1 })
        wx.hideLoading()
      }else{
        this.data.isPage = false
        wx.hideLoading()
        return
      }
    }, (error) => {
      console.log(error)
    });
  },
  // 页面到达底部
  onReachBottom() {
    // 判断是否翻页
    if (this.data.isPage) {
      this.data.requestData.page++
      this.getMyConuponList()
    }
  },
  //选择卡券类型
  clickItem(e) {
    if (e.target.dataset.type === undefined) return
    let type = e.target.dataset.type
    if(type!==this.data.usedIndex){
      this.setData({ myCouponList: [] })
      this.setData({ 'requestData.page': 1 })
      this.setData({ usedIndex: type ,isPage:true})
      this.getMyConuponList()
    }
  },
})