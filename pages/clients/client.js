// pages/clients/client.js
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRight: false,
    //citySelArr:[true,false,false] ,  /*城市是否选中列表*/
    // planSelArr:[true,false,false,false,false],   /*进度是否选中*/
    // array: ['项目1', '项目2', '项目3', '项目4'],
    itemPakerIndex: null,
    dataIntervalStart:null,
    dataIntervalEnd:null,

    peoplesArray:[],            //人数数组
    drawerList:[],              //筛选条目列表
    cityInfo:[],              //城市列表
    itemInfo:[],              //项目列表
    recommendInfo: [],      //进度列表   
    planDefaultIndex:0,       //进度默认下标
    cityDefaultIndex: 0,       //城市默认下标

    recommendPersonList:[],     //推荐人信息列表
    _val:'',                    //搜索框临时数据
    //筛选条件
    selectList:{
      startRow: 0,        
      perRow: 10,
      searchType: "",                  //进度
      startDate: "",                 //开始时间
      endDate: "",                    //结束时间
      cityId: "",                     //城市id
      projectID: "",                  //项目id
      searchVal: "",                  //搜索框条件                
      openID: ""    
    },             

  },

  //项目选择
  bindPickerChange(e) {
    // console.log(e.detail.value)
    // console.log(this.data.itemInfo)
    this.setData({
      itemPakerIndex: e.detail.value
    })
    this.setData({ 'selectList.projectID': this.data.itemInfo[e.detail.value].projectId})
    // console.log(this.data.selectList)
  },
  // 时间区间选择
  bindDateChangeStart(e) {
    console.log(e.detail.value)
    this.setData({
      dataIntervalStart: e.detail.value
    })
    this.setData({ 'selectList.startDate': e.detail.value})
  },
  bindDateChangeEnd(e) {
    let endDate=e.detail.value
    if (endDate < this.data.dataIntervalStart){
      this.handleWarning()
      return
    }
    this.setData({
      dataIntervalEnd: e.detail.value
    })
    this.setData({ 'selectList.endDate': e.detail.value })
  },
  handleWarning() {
    wx.showToast({
      title: '请选择正确的结束时间!',
      icon: 'none',
      duration: 2000
    })
  },
  // 选择城市标签
  selCity(e){
    // console.log(e.target.dataset, this.data.cityInfo)
    if (e.target.dataset.citytagid === undefined) return
    let tagId=e.target.dataset.citytagid;
    this.setData({ cityDefaultIndex:tagId})
    this.setData({ 'selectList.cityId': this.data.cityInfo[e.target.dataset.citytagid].cityId})
  },
  // 选择进度标签
  selPlan(e) {
    // console.log(e.target.dataset, this.data.recommendInfo)
    if (e.target.dataset.plantagid===undefined) return
    let tagId = e.target.dataset.plantagid;
    this.setData({ planDefaultIndex:tagId })
    this.setData({ 'selectList.searchType': this.data.recommendInfo[e.target.dataset.plantagid] })
  },
  // 重置
  reset(){
    //城市重置,进度
    this.setData({ cityDefaultIndex: 0, planDefaultIndex:0});
    // 项目重置
    this.setData({ itemPakerIndex: null})
    this.setData({ dataIntervalStart: null, dataIntervalEnd: null})
    this.resetParameter();
  },
  // 确认筛选
  submit(){
    let promise = this.data.selectList
    $http(apiSetting.recommendFindCustomList, promise).then((data) => {
      this.setData({ recommendPersonList: data.data })
    }, (error) => {
      console.log(error)
    });
    this.setData({ showRight: false });
    this.resetParameter();
  },
  //搜索图标点击
  selItem(){
    this.setData({ 'selectList.searchVal': this.data._val })
    let promise = this.data.selectList
    $http(apiSetting.recommendFindCustomList, promise).then((data) => {
      this.setData({ recommendPersonList: data.data })
    }, (error) => {
      console.log(error)
    });
    this.resetParameter();
  },
  //文本框监听
  valueChange(e){
    this.setData({ _val: e.detail.value})
  },

  // 遮罩弹出
  toggleRight() {
    this.setData({
      showRight: true
    });
  },
  // 遮罩隐藏
  hideDrawer() {
    this.setData({
      showRight: false
    });
    this.resetParameter();
  },
  //初始化请求参数
  resetParameter(){
    this.setData({
      'selectList.searchType': '',            //进度
      'selectList.startDate': '',      //开始时间
      'selectList.endDate': '',        //结束时间
      'selectList.cityId': '',       //城市id
      'selectList.projectID': '',                  //项目id
      'selectList.searchVal': '',                  //搜索框条件                
    })
    // console.log(this.data.selectList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({ 'selectList.openID': app.globalData.openid})
    this.findCustomList();
    this.getRecommendItemList();
    this.findRecommendPerson();
  },
  //获取推荐人状态信息
  findCustomList(){
    let promise = { openID: app.globalData.openid }
    $http(apiSetting.recommendFindCustomList, promise).then((data) => {
      // console.log(data.data)
      this.setData({ recommendPersonList:data.data})
    }, (error) => {
      console.log(error)
    });
  },
  //推荐客户人数
  findRecommendPerson(){
    let promise = { openID: app.globalData.openid}
    $http(apiSetting.recommendFindRecommendPerson, promise).then((data) => {
      this.setData({ peoplesArray:data.data})
      console.log(data.data)
    }, (error) => {
      console.log(error)
    });
  },
  //筛选条目获取
  getRecommendItemList(){
    let promise = { openID: app.globalData.openid }
    $http(apiSetting.recommendItemList, promise).then((data) => {
      this.setData({
        cityInfo: data.data.cityInfo,
        itemInfo: data.data.itemInfo,
        recommendInfo: data.data.recommendInfo
      })
    }, (error) => {
      console.log(error)
    });
  },
  //跳转推荐页面
  goRecommend(){
    wx.navigateTo({
      url: '../recommend/recommend',
    })
  },
})