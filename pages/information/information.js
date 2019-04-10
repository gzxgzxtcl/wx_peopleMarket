// pages/information/information.js
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'

Page({
  data: {
    imgpath:'http://39.98.191.16/zhwx/userfiles',     //图片根路径
    isAttention: false,
    /*是否关注*/
    imgUrls: [],
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
    projectname_hk:'',                  	/*海客案名（项目名）*/
    issale:'',                          	/*在售状态，如（开盘）*/
    salesaddr:'',                         /*售楼地址*/
    showhall:'',  	                      /*展厅地址*/
    couponinfo:'',       	                /*优惠信息*/
    mainprice:'',                       	/*主力产品均价*/
    mainpricedescription:'',            	/*主力产品均价后方价格说明详情*/
    mainhouseholdList: [],                /*主力房型*/	
    labelsList: [],                       /*卖点标签*/
    brightspotsList: [],                  /*楼盘亮点*/
    isbuildsimg:false,                    /*是否有楼盘图*/
    project_id:'',                        /*项目id*/         

    /*
      楼盘图假数据
    */
    buildsimg:[
      {
        name:'效果图',
        imgs: [
          'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
          'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        ]
      },
      {
        name: '配套图',
        imgs: [
          'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640'
        ]
      },
      {
        name: '规划图',
        imgs: [
          'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
        ]
      }
    ],

    /*
    项目详情
    */ 
    project_info:{
      developer: {
        name:'开发商',
        value: '南昌市海欣房地产开发建设有限公司'
      },  	                                        /*开发商*/
      propertycompany:{
        name:'物业公司',
        value:'深圳中海物业管理有限公司'
      },	                                           /*物业公司*/
      opening_date: {
        name:'开盘时间',
        value: '2019年5月10日'
      },                                            	/*开盘时间*/
      delivery_date: {
        name:'交房时间',
        value:''
      },	                                            /*交房时间*/
      years: {
        name:'产权年限',
        value:'70年'
      },                                          	/*产权年限*/
      buildingtype:  {
        name:'建筑类别',
        value:'高层'
      },                                           	/*建筑类别*/
      isup: {
        name:'装修状态',
        value:'毛坯'
      },                                          	/*装修状态*/
      propertyexpenses: {
        name:'物业费',
        value:'暂无资料'
      },                                            	/*物业费*/
      exemption: {
        name:'免责条款',
        value:'这是免责条款'
      },	                                           /*免责条款*/
      commissioninfo: {
        name:'佣金信息',
        value:'佣金信息'
      },                                             /*佣金信息*/
      couponinfo: {
        name:'优惠信息',
        value:'优惠信息'
      },                                               /*优惠信息*/
      district: {
        name:'所属区县',
        value:'所属区县'
      },                                              /*所属区县*/
      floorarea: {
        name:'建筑面积',
        value:'建筑面积'
      },                                              /*建筑面积*/
      mainarea: {
        name:'主面积',
        value:'主面积'
      },                                                /*主面积*/
      greencoverage: {
        name:'绿化情况',
        value:'绿化情况'
      },                                            /*绿化情况*/
      highlights: {
        name:'亮点概述',
        value:'亮点概述'
      },                                            /*亮点概述*/
      panning: {
        name:'建筑规划',
        value:'建筑规划'
      },                                         /*建筑规划*/
      phone: {
        name:'咨询电话',
        value:'咨询电话'
      },                                        /*咨询电话*/
      plotratio: {
        name:'容积率',
        value:'容积率'
      },                                        /*容积率*/
      presalepermit: {
        name:'预售许可证',
        value:'预售许可证'
      },                                      /*预售许可证*/
      projectaddr: {
        name:'楼盘地址',
        value:'楼盘地址'
      },                                      /*楼盘地址*/
      propertytype: {
        name:'物业类别',
        value:'物业类别'
      },                                      /*物业类别*/
    },
    getmore:false,                          /*是否查看更多*/
    exemption:'免责条款',                     /*免责条款*/
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
    hourseimg:'/574016EAC21E4F44ADDE74416AC1C76B/54A657CD261142869BACD03D08AF47E3.gif'
      // 户型图片对象
    // houserimglist:[
    //   {
    //     "upload_file_path": ''
    //   },
    // ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let project_id=options.project_id          //index-->information 项目id
    let imgurl=options.imgurl                 //index-->information  项目主图
    console.log(options)

    this.resetBanner(imgurl);                     //初始化轮播图
    this.getSpotLength();                         //获取亮点条数
    this.getProjectInfo(project_id);              // 通过id获取项目信息
    this.getProjectDetails(project_id);          //通过id获取项目详情
    this.getProjectHouserholdList(project_id);    //通过id查询户型列表
  },
  //通过id获取户型图片列表
  getProjectHouserholdFileList(id) {
    let promise = { houserhold_id:id}
    $http(apiSetting.projectApiFindProjectHouserholdFileListById, promise).then((data) => {
      let imgArr=data.data[0]
      this.setData({ hourserimglist:imgArr})
    }), (error) => {
      console.log(error)
    }
  },
  //通过id查询户型列表
  getProjectHouserholdList(id){
    let promise = { project_id: id}
    $http(apiSetting.projectApiFindProjectHouserholdListById, promise).then((data) => {
      let hourserholdlist=data.data[0];
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
      this.getProjectHouserholdFileList(hourserholdlist.id);
    }), (error) => {
      console.log(error)
    }
  },
  //通过id获取项目详情
  getProjectDetails(id){
    let promise = { project_id:id}
    $http(apiSetting.projectApiFindProjectDetailsById,promise).then((data)=>{
      let projectdetails=data.data
      console.log(projectdetails)
      this.setData({
        'project_info.developer.value': projectdetails.developer, 
        'project_info.propertycompany.value': projectdetails.propertycompany,
        'project_info.opening_date.value': projectdetails.opening_date, 
        'project_info.delivery_date.value': projectdetails.delivery_date,	
        'project_info.years.value': projectdetails.years,           
        'project_info.buildingtype.value': projectdetails.buildingtype,  
        'project_info.isup.value': projectdetails.isup,           
        'project_info.propertyexpenses.value': projectdetails.propertyexpenses,  
        'project_info.exemption.value': projectdetails.exemption,	
        'project_info.commissioninfo.value': projectdetails.commissioninfo,            
        'project_info.couponinfo.value': projectdetails.couponinfo,                 
        'project_info.district.value': projectdetails.district,                    
        'project_info.floorarea.value': projectdetails.floorarea,                  
        'project_info.mainarea.value': projectdetails.mainarea,                     
        'project_info.greencoverage.value': projectdetails.greencoverage,              
        'project_info.highlights.value': projectdetails.highlights,                 
        'project_info.panning.value': projectdetails.panning,                     
        'project_info.phone.value': projectdetails.phone,                           
        'project_info.plotratio.value': projectdetails.plotratio,                     
        'project_info.presalepermit.value': projectdetails.presalepermit,              
        'project_info.projectaddr.value': projectdetails.projectaddr,                   
        'project_info.propertytype.value': projectdetails.propertytype,      
        exemption: projectdetails.exemption
      })

    }),(error)=>{
      console.log(error)
    }
  },
  // 通过id获取项目信息
  getProjectInfo(id) {
    let promise = { project_id:id}
    $http(apiSetting.projectApiFindProjectInfoById, promise).then((data) => {
      let projectinfo=data.data
      console.log(projectinfo)
      this.setData({
        project_id: projectinfo.id,
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
  //判断是否有楼盘图
  isHaveBuildsImg(){
    let imgs = this.data.buildsimg;
    if(imgs===[]){
      this.setData({ isbuildsimg:false})
    }else{
      this.setData({ isbuildsimg: true })
    }
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
  // 初始化轮播图
  resetBanner(url) {
    this.setData({ 'imgUrls[0]': url })
    this.setData({ bannerlength: this.data.imgUrls.length })    //初始化轮播展示图数量
  },
  //图片轮播
  bannerChange(e){
    let current = e.detail.current
    this.setData({ bannerindex: current})
  },
  //查看更多详细信息
  getMoreInfo(){
    this.setData({ getmore:true})
  },
  //判断亮点条数
  getSpotLength() {
    let spots = this.data.brightspotsList.length
    if (spots > 4) {
      ishaveall: true
      this.setData({ ishaveall: true })
    } else {
      return
    }
  },
  //查看佣金规则
  getMoneyRule(){
    console.log('佣金规则')
  },
  //去推荐
  goRecommend(){
    console.log('推荐')
    wx.navigateTo({
      url: '../recommend/recommend?project_id='+this.data.project_id,
    })
  },

  toPhone() {
    wx.makePhoneCall({
      phoneNumber: '1340000'
    })
  },
  pageToMap() {
    wx.navigateTo({
      url: '../map/map?projectName=中海天钻'
    })
  }
})