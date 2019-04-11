// pages/clients/client.js
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRight: false,
    citySelArr:[true,false,false] ,  /*城市是否选中列表*/
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


  },

  //项目选择
  bindPickerChange(e) {
    this.setData({
      itemPakerIndex: e.detail.value
    })
  },
  // 时间区间选择
  bindDateChangeStart(e) {
    this.setData({
      dataIntervalStart: e.detail.value
    })
  },
  bindDateChangeEnd(e) {
    this.setData({
      dataIntervalEnd: e.detail.value
    })
  },

  // 遮罩弹出
  toggleRight() {
    this.setData({
      showRight:true
    });
  },
  // 遮罩隐藏
  hideDrawer(){
    this.setData({
      showRight: false
    });
  },
  // 选择城市标签
  selCity(e){
    if (e.target.dataset.citytagid === undefined) return
    let tagId=e.target.dataset.citytagid;
    this.setData({ cityDefaultIndex:tagId})
  },
  // 选择进度标签
  selPlan(e) {
    if (e.target.dataset.plantagid===undefined) return
    let tagId = e.target.dataset.plantagid;
    this.setData({ planDefaultIndex:tagId })
  },
  // 重置
  reset(){
    //城市重置,进度
    this.setData({ cityDefaultIndex: 0, planDefaultIndex:0});
    // 项目重置
    this.setData({ itemPakerIndex: null})
    this.setData({ dataIntervalStart: null, dataIntervalEnd: null})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.findCustomList();
    this.getRecommendItemList();
    this.findRecommendPerson();
  },
  //获取推荐人状态信息
  findCustomList(){
    let promise = { "openID": "oGKIT0fsLqw5ZJPa-IxUO2EwQt_I" }
    $http(apiSetting.recommendFindCustomList, promise).then((data) => {
      console.log(data.data)
      this.setData({ recommendPersonList:data.data})
    }, (error) => {
      console.log(error)
    });
  },
  //推荐客户人数
  findRecommendPerson(){
    let promise = { "openID": "oGKIT0fsLqw5ZJPa-IxUO2EwQt_I"}
    $http(apiSetting.recommendFindRecommendPerson, promise).then((data) => {
      this.setData({ peoplesArray:data.data})
    }, (error) => {
      console.log(error)
    });
  },
  //筛选条目获取
  getRecommendItemList(){
    let promise = { openID: "oGKIT0fsLqw5ZJPa-IxUO2EwQt_I"}
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
  
})