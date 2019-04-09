// pages/housestype/housestype.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selIndex:0,
    hourses:[],       /*户型列表*/
    // caption: '98m² 舒适两居室',	  /*标题*/
    // houserhold: '两室一厅一卫',  	/*户型*/
    // price: '暂无定价',         	/*定价*/
    // buyingpoint: '户型优势',   	/*户型优势*/
    // area: '98m²',            	/*建筑面积*/
    // category: '高层',         	/*产品类型*/
    // decoration: '精装修',    	/*装修情况*/
    // houserholdremark: '高端海景洋房，享受高端定制服务。',  	/*户型描述*/
  },
  changeHouse(e){
    let index = e.currentTarget.dataset.index
    this.setData({ selIndex: index})
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
    this.getHourseList(options)
  },

  //获取详情传递的户型列表数据
  getHourseList(options){
    let hourselist = JSON.parse(options.hourselist)
    this.setData({ hourses: hourselist })
    console.log(hourselist)
    // this.setData({
    //   caption: '98m² 舒适两居室',	  /*标题*/
    //   houserhold: '两室一厅一卫',  	/*户型*/
    //   price: '暂无定价',         	/*定价*/
    //   buyingpoint: '户型优势',   	/*户型优势*/
    //   area: '98m²',            	/*建筑面积*/
    //   category: '高层',         	/*产品类型*/
    //   decoration: '精装修',    	/*装修情况*/
    //   houserholdremark: '高端海景洋房，享受高端定制服务。',  	/*户型描述*/
    // })
  }

})