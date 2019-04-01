// pages/bindUser/bindUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      id: 1,
      name: '独立经纪人'
    }, {
      id: 2,
      name: '中海业主'
    }, {
      id: 3,
      name: '中介'
    }],
    arrayIndex: 0
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

  bindPickerChange(e) {
    // console.log(e.detail.value)
    // console.log(this.data.array[e.detail.value])
    this.setData({
      arrayIndex: e.detail.value
    })
  }


})