// pages/clients/client.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRight: false,
    citySelArr:[true,false,false] ,  /*城市是否选中列表*/
    planSelArr:[true,false,false,false,false],   /*进度是否选中*/
    array: ['项目1', '项目2', '项目3', '项目4'],
    itemPakerIndex: null,
    dataIntervalStart:null,
    dataIntervalEnd:null
       
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
    let tagId=e.target.dataset.citytagid;
    for (let i = 0; i < this.data.citySelArr.length;i++){
      this.setData({ ['citySelArr['+i+']']: false })
    }
    this.setData({ ['citySelArr['+tagId+']']:true})
  },
  // 选择进度标签
  selPlan(e) {
    if (e.target.dataset.plantagid===undefined) return
    let tagId = e.target.dataset.plantagid;
    for (let i = 0; i < this.data.planSelArr.length; i++) {
      this.setData({ ['planSelArr[' + i + ']']: false })
    }
    this.setData({ ['planSelArr[' + tagId + ']']: true })
  },
  // 重置
  reset(){
    //城市重置
    for(let i=0;i<this.data.citySelArr.length;i++){
      if(i===0){
        this.setData({ ['citySelArr[0]']: true });
        continue;
      }else{
        this.setData({ ['citySelArr[' + i + ']']: false })
      }
    }
    // 项目重置
    this.setData({ itemPakerIndex: null})
    this.setData({ dataIntervalStart: null, dataIntervalEnd: null})
    // 进度重置
    for (let i = 0; i < this.data.planSelArr.length; i++) {
      if(i===0){
        this.setData({ ['planSelArr[0]']: true });
        continue;
      }
      this.setData({ ['planSelArr[' + i + ']']: false })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})