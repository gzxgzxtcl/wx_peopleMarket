// pages/houseimg/houseimg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath: 'http://39.98.191.16/zhwx/userfiles',     //图片根路径
    isLeftSel:true,   /*是否选中户型图*/
    isRightSel: false,   /*是否选中样板图*/
    // selArr:[
    //   ['户型图'],
    //   [ '效果图', '配套图', '规划图']
    // ],
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
  getBigImg(e){
    // console.log(e.currentTarget.dataset.imglist)
    let imgList = e.currentTarget.dataset.imglist
    let current = this.data.imgpath + imgList[0]
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let arr = JSON.parse(options.buildsimg)
    console.log(arr)
    let _arr=[]
    for(let i=0;i<arr.length;i++){
      if(arr[i].imgs.length){
        _arr.push(arr[i])
      }
    }
    console.log(_arr)
    this.setData({ buildImgList:_arr})

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})