// pages/houseimg/houseimg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath: 'http://39.98.191.16/zhwx/userfiles',     //图片根路径
    isLeftSel:true,   /*是否选中户型图*/
    isRightSel: false,   /*是否选中样板图*/
    selArr:[
      ['户型图'],
      [ '效果图', '配套图', '规划图']
    ],
    // selIndex:0,   /*默认分类数组下标*/
    selItem:0,     /*默认选中第一项*/

    buildImgList:[],    //楼盘图片列表

  },
  // 户型图切换
  selImg(e){
    var num = e.currentTarget.dataset.num;
    console.log(num)
    this.setData({ selItem:num})
  },
  // 获取大图
  getBigImg(){
    let current = this.data.imgpath + this.data.buildImgList[this.data.selItem].imgs[0]
    let _arr = this.data.buildImgList[this.data.selItem].imgs
    for(let i=0;i<_arr.length;i++){
      _arr[i] = this.data.imgpath + _arr[i]
    }
    wx.previewImage({
      current: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3022329450,1185405705&fm=27&gp=0.jpg", // 当前显示图片的http链接
      urls: _arr // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let arr = JSON.parse(options.buildsimg)
    console.log(arr)
    this.setData({ buildImgList:arr})

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})