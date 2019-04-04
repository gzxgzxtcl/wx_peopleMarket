// pages/houseimg/houseimg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLeftSel:true,   /*是否选中户型图*/
    isRightSel: false,   /*是否选中样板图*/
    selArr:[
      ['户型图'],
      [ '效果图', '配套图', '规划图']
    ],
    selIndex:0,   /*默认分类数组下标*/
    selItem:0     /*默认选中第一项*/

  },
  // 户型图切换
  selImg(e){
    var num = e.currentTarget.dataset.num;
    this.setData({ selItem:num})
  },
  // 获取大图
  getBigImg(){
    wx.previewImage({
      current: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640', // 当前显示图片的http链接
      urls: ['https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'] // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id=options.id;
    this.setData({ selIndex:id})
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})