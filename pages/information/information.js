// pages/information/information.js
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
const url = 'http://39.98.191.16/zhwx-api'

Page({
  data: {
    imgpath:'http://39.98.191.16/zhwx-api',     //图片根路径
    isAttention: false,
    /*是否关注*/
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    bannerlength:0,            /*轮播图个数 */
    bannerindex:0,             /*轮播下标*/
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    visible2:false,
    ishaveall:false,          /*是否大于4条亮点 */
    islookall:false,         /*是否查看全部*/

    /*
      项目信息
     */
    projectname_hk:'中海天钻',              	/*海客案名（项目名）*/
    issale:'待售',                          	/*在售状态，如（开盘）*/
    salesaddr:'罗湖-菜屋围-滨河路1005路中..',  /*	售楼地址*/
    showhall:'罗湖-菜屋围-滨河路1005路中..',  	/*展厅地址*/
    couponinfo:'3月31日前认筹享受98折',       	/*优惠信息*/
    mainprice:'98000',                       	/*主力产品均价*/
    mainpricedescription:'主力产品均价后方价格说明详情',  	/*主力产品均价后方价格说明详情*/
    mainhouseholdList: [],                   /*主力房型*/	
    labelsList: [],                         /* 卖点标签*/
    brightspotsList: [],                    /*楼盘亮点*/

    /*
    项目详情
    */ 
    developer: '南昌市海欣房地产开发建设有限公司',  	/*开发商*/
    propertycompany: '深圳中海物业管理有限公司',	 /*物业公司*/ 
    opening_date: '2019年5月10日',          	/*开盘时间*/
    delivery_date: '2021年10月1日',	         /*交房时间*/
    years: '70年',                        	/*产权年限*/
    buildingtype:'高层',                  	/*建筑类别*/
    isup:'毛坯',                          	/*装修状态*/
    propertyexpenses:'暂无资料',          	/*物业费*/
    exemption: '这是免责条款',	             /*免责条款*/

    /*
      房型列表
    */
    hourselist:[],           /*户型列表 */
    upload_file_path:'',      /*房型图片*/   
    caption:'98m² 舒适两居室',	  /*标题*/
    houserhold:'两室一厅一卫',  	/*户型*/
    price:'暂无定价',         	/*定价*/
    buyingpoint:'户型优势',   	/*户型优势*/
    area:'98m²',            	/*建筑面积*/
    category:'高层',         	/*产品类型*/
    decoration:'精装修',    	/*装修情况*/
    houserholdremark:'高端海景洋房，享受高端定制服务。',  	/*户型描述*/

    /*
      房型图片列表
     */
      // 户型图片对象
    houserimglist:[
      {
        "upload_file_path": "/574016EAC21E4F44ADDE74416AC1C76B/FD8A403F170A4EC9BBBCD284B31CD6EC.jpg"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({ bannerlength:this.data.imgUrls.length})    //初始化轮播展示图数量
    this.getSpotLength();
    this.getProjectInfo();
    this.getProjectDetails();
    this.getProjectHouserholdList();
  },
  //通过id获取户型图片列表
  getProjectHouserholdFileList(id) {
    let promise = { houserhold_id:id}
    console.log('houserhold_id:',id)
    $http(apiSetting.projectApiFindProjectHouserholdFileListById, promise).then((data) => {
      let imgArr=data.data
      console.log('a:'+imgArr)
      // this.setData({upload_file_path: imgArr.upload_file_path})
      // console.log(this.data.imgpath + this.data.upload_file_path)
    }), (error) => {
      console.log(error)
    }
  },
  //通过id查询户型列表
  getProjectHouserholdList(){
    let promise = { project_id: '574016EAC21E4F44ADDE74416AC1C76B'}
    $http(apiSetting.projectApiFindProjectHouserholdListById, promise).then((data) => {
      let hourserholdlist=data.data[0];
      console.log(hourserholdlist)
      this.setData({
        hourselist: data.data,
        caption: hourserholdlist.caption,	
        houserhold: hourserholdlist.houserhold,  
        price: hourserholdlist.price,         
        buyingpoint: hourserholdlist.buyingpoint,   	
        area: hourserholdlist.area,            
        category: hourserholdlist.category,         
        decoration: hourserholdlist.decoration,    	
        houserholdremark: hourserholdlist.houserholdremark,  
      })
      console.log(this.data.hourselist)
      this.getProjectHouserholdFileList(hourserholdlist.id);
    }), (error) => {
      console.log(error)
    }
  },
  //通过id获取项目详情
  getProjectDetails(){
    let promise = { project_id:'574016EAC21E4F44ADDE74416AC1C76B'}
    $http(apiSetting.projectApiFindProjectDetailsById,promise).then((data)=>{
      let projectdetails=data.data
      console.log(projectdetails)
      this.setData({
        developer: projectdetails.developer, 
        propertycompany: projectdetails.propertycompany,
        opening_date: projectdetails.opening_date, 
        delivery_date: projectdetails.delivery_date,	
        years: projectdetails.years,           
        buildingtype: projectdetails.buildingtype,  
        isup: projectdetails.isup,           
        propertyexpenses: projectdetails.propertyexpenses,  
        exemption: projectdetails.exemption,	
      })

    }),(error)=>{
      console.log(error)
    }
  },
  // 通过id获取项目信息
  getProjectInfo() {
    let promise = { project_id:"574016EAC21E4F44ADDE74416AC1C76B"}
    $http(apiSetting.projectApiFindProjectInfoById, promise).then((data) => {
      let projectinfo=data.data
      console.log(projectinfo)
      this.setData({
        projectname_hk: projectinfo.projectname_hk,
        issale: projectinfo.issale,
        salesaddr: projectinfo.salesaddr,
        showhall: projectinfo.showhall,
        couponinfo: projectinfo.couponinfo,
        mainprice: projectinfo.mainprice,
        mainpricedescription: projectinfo.mainpricedescription,
        mainhouseholdList: projectinfo.mainhouseholdList,
        labelsList: projectinfo.labelsList,
        brightspotsList: projectinfo.brightspotsList
      })

    }, (error) => {
      console.log(error)
    });
  },
  // 查看更多户型，跳转到户型列表页
  goHousetype() {
    wx.navigateTo({
      url: '../housestype/housestype?hourselist=' +JSON.stringify(this.data.hourselist),
    })
  },
  //户型图片点击事件
  goHouseimg(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../houseimg/houseimg?id=' + id
    })
  },
  //楼盘图查看更多事件
  goHouseimg(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../houseimg/houseimg?id=' + id
    })
  },
  //关注 按钮事件
  toAttention() {
    this.setData({
      isAttention: !this.data.isAttention
    })
  },
  // 主力均价提示
  handleOpen2(){
    this.setData({
      visible2: true
    });
  },
  handleClose2() {
    this.setData({
      visible2: false
    });
  },
  // 查看全部
  lookAll(){
    this.setData({ islookall: !this.data.islookall})
  },
  //图片轮播
  bannerChange(e){
    console.log(e.detail.current)
    let current = e.detail.current
    this.setData({ bannerindex: current})
  },

  toPhone() {
    wx.makePhoneCall({
      phoneNumber: '1340000'
    })
  },
  //判断亮点条数
  getSpotLength(){
    let spots = this.data.brightspotsList.length
    if(spots>4){
      ishaveall:true
      this.setData({ ishaveall:true})
    }else{
      return
    }
  },

  pageToMap() {
    wx.navigateTo({
      url: '../map/map?projectName=中海天钻'
    })
  }
})