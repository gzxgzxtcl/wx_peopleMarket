// pages/housestype/housestype.js
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'

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
    hoursepointList:[],           //户型优势列表
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
    let pointArr=[]
    for (let i = 0; i < hourselist.length;i++){   //遍历截取亮点文本
      let _arr=[]
      if (hourselist[i].buyingpoint===null) return
      _arr=hourselist[i].buyingpoint.split(',')
      console.log(_arr)
      pointArr.push(_arr)
    }
    this.setData({ hoursepointList: pointArr })
    console.log(this.data.hoursepointList)

    for(let j=0;j<hourselist.length;j++){
      this.getProjectHouserholdFileList(hourselist[j].id)
    }
  },
  //通过id获取户型图片列表
  getProjectHouserholdFileList(id) {
    let promise = { houserhold_id: id }
    $http(apiSetting.projectApiFindProjectHouserholdFileListById, promise).then((data) => {
      console.log(data)
    }), (error) => {
      console.log(error)
    }
  },

})