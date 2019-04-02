// pages/mycoupon/mycoupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usedVal: '未使用',/*是否使用的列表值*/
    isOverDate:0  /*是否过期*/
  },
  clickItem(e){
    var val=e.currentTarget.dataset.val
    this.setData({ usedVal:val})
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})