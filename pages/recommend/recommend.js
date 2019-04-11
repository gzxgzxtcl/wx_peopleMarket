// pages/recommend/recommend.js
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible2: false,      //确认推荐模态窗

    reportList: {
      city: '上海',
      customName: '',
      customPhone: '',
      hkProjectId: '',
      mobileFlag: '+86',
      openId: '',
      projectId: '',
      remark: '',
      reportMobile: '',
      reportName: '',
      reportType: '',
      sex: ''
    },
    city_id: '',   

    //性别
    gender: 1,
    visible: false,

    arrayProject: [],
    arrayProjectIndex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    //判断是否有传递的项目id，如果有，直接复制给data中的变量，即详情页的跳转
    if (options.project_id) {
      this.setData({ 'reportList.projectId': options.project_id, city_id: options.city_id})
      this.getCityInfo(options.project_id);
    }else{
      this.getRecommendGetProjectList()
    }
    // console.log(app.globalData.bindUserInfo)
    if (app.globalData.isCheck) {
      let reportList = that.data.reportList
      reportList.openId = app.globalData.bindUserInfo.wxid
      reportList.reportMobile = app.globalData.bindUserInfo.phone
      reportList.reportName = app.globalData.bindUserInfo.myname
      reportList.reportType = app.globalData.bindUserInfo.brokertype
      reportList.sex = '男'
      that.setData({
        reportList: reportList
      })
   
    } else {
      that.setData({
        visible: true
      })
    }
  },


  customNameBind(e) {
    this.data.reportList.customName = e.detail.value
  },
  customPhoneBind(e) {
    this.data.reportList.customPhone = e.detail.value
  },
  remarkBind(e) {
    this.data.reportList.remark = e.detail.value
  },
  genderChange(e) {
    let val = e.target.dataset.val
    if (val == 1) {
      this.data.reportList.sex = '男'
    } else {
      this.data.reportList.sex = '女'
    }
    this.setData({
      gender: val
    })
  },
  //详情(id)-->推荐，获取城市信息
  getCityInfo(id){
    let promise = { project_id: id }
    $http(apiSetting.projectApiFindProjectInfoById, promise).then((data) => {
      let projectInfo = data.data
      console.log(projectInfo)
      this.setData({ 'reportList.city': projectInfo.city_text, city_id: projectInfo.city})
      this.getRecommendGetProjectList()
    }, (error) => {
      console.log(error)
    });
  },
  // 获取推荐楼盘
  getRecommendGetProjectList() {
    let that = this
    if(!this.data.city_id){
      let cityInfo = wx.getStorageSync('storLocalCity')
      this.setData({ 'reportList.city': cityInfo.city, city_id: cityInfo.id})
    }
    let promise = { cityId: this.data.city_id}   // cityId: '0-166-884-202-',

    //获取楼盘列表
    $http(apiSetting.recommendGetProjectList, promise).then((data) => {
      console.log(data.data)
      if (this.data.reportList.projectId){
        for(let i=0;i<data.data.length;i++){
          if (data.data[i].wxProjectId === this.data.reportList.projectId){
            that.setData({ 'arrayProject[0]': data.data[i]})
            return
          }
        }
      }else{
        this.setData({
          arrayProject: data.data
        })
      }
    },(error)=>{
      console.log(error)
    })
  },
 
  //选择推荐楼盘列表
  arrayProjectChange(e) {
    // console.log(e.detail.value)
    // console.log(this.data.array[e.detail.value])
    this.setData({
      arrayProjectIndex: e.detail.value
    })
    this.data.reportList.projectId = this.data.arrayProject[e.detail.value].wxProjectId
  },

  visibleOk() {
    wx.navigateTo({
      url: "../bindUser/bindUser"
    })
  },

  visibleOkClose() {
    wx.reLaunch({
      url: "../index/index"
    })
  },
//确认推荐
  bindSub() {
    // console.log(this.data.reportList)
    let promise = this.data.reportList
    console.log(promise)
    $http(apiSetting.recommendAddAgencyCustom, promise).then((data) => {
      console.log(data)
      if(!data.code){
        this.setData({ visible2: true })
      }
    }, (error) => {
      console.log(error)
    });
  },

  //确认模态窗
  handleCloseOk() {
    wx.navigateTo({
      url: '../clients/client'
    })
    this.setData({
      visible2: false
    });
  },
  handleCloseNo() {
    wx.reLaunch({
      url: '../index/index'
    })
    this.setData({
      visible2: false
    });
  }
})