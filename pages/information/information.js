// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  // 查看更多户型，跳转到户型列表页
  goHousetype(){
    wx.navigateTo({
      url: '../housestype/housestype'
    })
  },
  //户型图片点击事件
  goHouseimg(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../houseimg/houseimg?id=' + id
    })
  },
  //楼盘图查看更多事件
  goHouseimg(e){
    console.log(e)
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../houseimg/houseimg?id=' + id
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  pageToMap() {
    wx.navigateTo({
      url: '../map/map?projectName=中海天钻'
    })
  }
})