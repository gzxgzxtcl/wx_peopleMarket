// pages/housestype/housestype.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selType:'全部(2)'
  },
  changeHouse(e){
    this.setData({ selType: e.currentTarget.dataset.type})
  },
  // 查看户型图
  goHouseimg(e){
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../houseimg/houseimg?id='+id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})