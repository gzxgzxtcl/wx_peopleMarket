// pages/houseimg/houseimg.js
import fileUrl from '../../http/fileServeUrl.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath: fileUrl,     //图片根路径
    isLeftSel:true,   /*是否选中户型图*/
    isRightSel: false,   /*是否选中样板图*/
    // selArr:[
    //   ['户型图'],
    //   [ '效果图', '配套图', '规划图']
    // ],
    // selIndex:0,   /*默认分类数组下标*/
    selItem:0,     /*默认选中第一项*/

    buildImgList:[],    //楼盘图片列表

    //swiper参数
    indicatorDots: false,
    autoplay: false,
    interval: 100,
    duration: 100,


    // swiperHeight:0,            //swiper高度
    // imgHeightArr:[],             //图片高度数组
    // imgCurrent:0,               //滑动图片下表
    imgCurrent:0

  },
  // 户型图切换
  selImg(e){
    var num = e.currentTarget.dataset.num;
    this.setData({ selItem:num})
    this.setData({imgCurrent:0})
  },
  // 获取大图
  getBigImg(e){
    let imgIndex=e.currentTarget.dataset.imgindex
    let imgList = e.currentTarget.dataset.imglist
    for(let i=0;i<imgList.length;i++){
      imgList[i] = imgList[i]
    }
    let current = imgList[imgIndex]
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  //获取图片高度
  // getImgHeigth(e){
  //   if (!this.data.imgHeightArr) return
  //   let that=this
  //   console.log(e)
  //   if(!e||e.type!=='load') return
  //   let imgHeight=e.detail.height
  //   let imgWidth=e.detail.width
  //   let viewWidth = wx.getSystemInfoSync().windowWidth*2; //获取当前屏幕的宽度
  //   let swiperHeight = viewWidth*imgHeight/imgWidth
  //   let _heiArr = that.data.imgHeightArr
  //   _heiArr.push(swiperHeight*2)
  //   that.setData({ imgHeightArr: _heiArr})
  //   console.log(that.data.imgHeightArr)
  // },
  //图片滑动
  changeImg(e){
       
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.selIndex !== "undefined"){
      this.setData({ selItem: Number(options.selIndex)+1})
    }else{
      this.setData({ selItem: 0 })
    }
    let arr = JSON.parse(options.buildsimg)
    let _arr=[]
    for(let i=0;i<arr.length;i++){
      if(arr[i].imgs.length){
        _arr.push(arr[i])
      }
    }
    this.setData({ buildImgList:_arr})
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})