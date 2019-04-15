// pages/information/information.js
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
const app=getApp()

Page({
  data: {
    imgpath:'http://39.98.191.16/zhwx/userfiles',     //图片根路径
    isAttention: false,          /*是否关注*/
    imgUrls: [],                  //轮播图列表 
    bannerlength:0,            /*轮播图个数 */
    bannerindex:0,             /*轮播下标*/
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    visible2:false,
    ishaveall:false,          /*是否大于4条亮点 */
    islookall:false,         /*是否查看全部*/

    phone:'',                 //联系我们-电话
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
    city_id:'',                           /*城市id*/
   
   //楼盘主图,实景图,效果图,配套图,规划图
    buildsimg:[
      // {
      //   name:'楼盘主图',
      //   imgs:[]
      // },
      {
        name: '实景图',
        imgs: []
      },
      {
        name: '效果图',
        imgs: []
      },
      {
        name: '配套图',
        imgs: []
      },
      {
        name: '规划图',
        imgs: []
      },
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
    exemption:'',                     /*免责条款*/
    commissionRule:'',                    //佣金规则
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
    pointList:[],            //房型优势列表
    hourserimglist: [],     //房型图片列表

    /*
    关注请求数据
  */
  attentionList: {
      login_by: '',         //用户登录id
      project_id: '',       //项目id
    },
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let project_id=options.project_id          //index-->information 项目id
    let imgurl=options.imgurl                 //index-->information  项目主图
    this.setData({
      'attentionList.login_by': app.globalData.userId,
      'attentionList.project_id': project_id
    })
    // console.log(app.globalData,project_id)
    this.isAttentionProject()

    // this.resetBanner(imgurl);                     //初始化轮播图
    this.getSpotLength();                         //获取亮点条数
    this.getProjectInfo(project_id);              // 通过id获取项目信息
    this.getProjectDetails(project_id);          //通过id获取项目详情
    this.getProjectHouserholdList(project_id);    //通过id查询户型列表
    this.getHourseImgList(project_id);            //通过类型查询楼盘图
    this.getClauseAndRule();                      //获取免责条款和佣金规则
  },
  //查询免责条款和佣金规则
  getClauseAndRule(){
    let promise1 = { dictname: '免责条款'}
    $http(apiSetting.projectApiFindOtherDictValues, promise1).then((data) => {
      console.log(data.data)
      this.setData({ exemption:data.data})
    }), (error) => {
      console.log(error)
    }
    let promise2 = { dictname: '佣金规则' }
    $http(apiSetting.projectApiFindOtherDictValues, promise2).then((data) => {
      console.log(data.data)
      this.setData({ commissionRule:data.data})
    }), (error) => {
      console.log(error)
    }

  },
  //通过类型查询楼盘图列表
  getHourseImgList(id) {                        
    let promise1 = { project_id: id, picturetype: "楼盘主图" }
    this.getHourseImgFun(promise1)
    let promise2 = { project_id: id, picturetype: "实景图" }
    this.getHourseImgFun(promise2)
    let promise3 = { project_id: id, picturetype: "效果图" }
    this.getHourseImgFun(promise3)
    let promise4 = { project_id: id, picturetype: "配套图" }
    this.getHourseImgFun(promise4)
    let promise5 = { project_id: id, picturetype: "规划图" }
    this.getHourseImgFun(promise5)
    // console.log(this.data.buildsimg)
  },
  //请求楼盘图接口函数
  getHourseImgFun(promise) {       //楼盘主图,实景图,效果图,配套图,规划图
    $http(apiSetting.projectApiFindProjectImagesListByType, promise).then((data) => {
      let _arr=data.data
      // console.log(_arr)
      let _arr2=[]
      if(promise.picturetype==="楼盘主图"){
        for (let i = 0; i < _arr.length; i++) {
          if (_arr[i].upload_file_path == undefined) {
            continue
          } else {
            _arr2.push(_arr[i].upload_file_path)
          }
        }
       
        this.resetBanner(_arr2)
        // this.setData({['buildsimg[0].imgs']:_arr2})
      } else if (promise.picturetype === "实景图") {
        for (let i = 0; i < _arr.length; i++) {
          if (_arr[i].upload_file_path == undefined) {
            continue
          } else {
            _arr2.push(_arr[i].upload_file_path)
          }
        }
        this.setData({ 'buildsimg[0].imgs': _arr2 })
      } else if (promise.picturetype === "效果图") {
        for (let i = 0; i < _arr.length; i++) {
          if (_arr[i].upload_file_path == undefined) {
            continue
          } else {
            _arr2.push(_arr[i].upload_file_path)
          }
        }
        this.setData({ 'buildsimg[1].imgs': _arr2 })
      } else if (promise.picturetype === "配套图") {
        for (let i = 0; i < _arr.length; i++) {
          if (_arr[i].upload_file_path == undefined) {
            continue
          } else {
            _arr2.push(_arr[i].upload_file_path)
          }
        }
        this.setData({ 'buildsimg[2].imgs': _arr2 })
      } else if (promise.picturetype === "规划图") {
        for (let i = 0; i < _arr.length; i++) {
          if (_arr[i].upload_file_path == undefined) {
            continue
          } else {
            _arr2.push(_arr[i].upload_file_path)
          }
        }
        this.setData({ 'buildsimg[3].imgs': _arr2 })
      }
    }), (error) => {
      console.log(error)
    }
  },

  //通过id获取户型图片列表
  getProjectHouserholdFileList(id) {
    let promise = { houserhold_id:id}
    $http(apiSetting.projectApiFindProjectHouserholdFileListById, promise).then((data) => {
      let imgArr=data.data[0]
      // console.log(data)
      this.setData({ upload_file_path: imgArr.upload_file_path})
    }), (error) => {
      console.log(error)
    }
  },
  //通过id查询户型列表
  getProjectHouserholdList(id){
    let promise = { project_id: id}
    $http(apiSetting.projectApiFindProjectHouserholdListById, promise).then((data) => {
      let hourserholdlist=data.data[0];
      // console.log(data.data)
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
      // console.log(hourserholdlist)
      this.setData({ pointList: hourserholdlist.buyingpoint.split(',')})
      // console.log(this.data.pointList)
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
      // console.log(this.data.project_info)
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
        exemption: projectdetails.exemption,
        phone: projectdetails.phone
      })
      console.log(this.data.project_info)
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
        brightspotsList: projectinfo.brightspotsList,
        city_id: projectinfo.city
      })
      if (projectinfo.is_myconc==0){
        this.setData({ isAttention:true})
      }else{
        this.setData({ isAttention: false })
      }
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
    console.log(e)
    let imgurl = e.currentTarget.dataset.imgurl;
    wx.previewImage({
      current: imgurl, // 当前显示图片的http链接
      urls: [imgurl] // 需要预览的图片http链接列表
    })
    // wx.navigateTo({
    //   url: '../houseimg/houseimg?id=' + id
    // })
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
  goBuildimg(e) {
    // console.log(e)
    // let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../houseimg/houseimg?buildsimg='+JSON.stringify(this.data.buildsimg)
    })
  },


  //关注 按钮事件
  toAttention() {
    this.setData({
      isAttention: !this.data.isAttention
    })
    console.log("is:",this.data.isAttention)
    if (this.data.isAttention) {                  //isAttention为true,则发起关注请求
      let promise = this.data.attentionList
      $http(apiSetting.projectApiInsertMyConc, promise).then((data) => {
        console.log(data)
      }, (error) => {
        console.log(error)
      });
    } else {          //isAttention为false,则发起取消关注请求
      let promise = this.data.attentionList
      $http(apiSetting.projectApiUpdateMyConc, promise).then((data) => {
        console.log(data)
      }, (error) => {
        console.log(error)
      });
    }
  },
  //判断是否已经关注
  isAttentionProject(){
    let promise = this.data.attentionList
    $http(apiSetting.projectApiUpdateMyConc, promise).then((data) => {
      if(data.code===-1){          //返回值为-1，表示项目暂时没有被关注
        this.setData({ isAttention:false})
      }else{
        $http(apiSetting.projectApiInsertMyConc, promise).then((data) => {  //返回值为0，表示已经被关注，取消后发起请求重新关注
          if (data.data){
            this.setData({ isAttention: true })
          }
        }, (error) => {
          console.log(error)
        });
      }
    }, (error) => {
      console.log(error)
    });
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
    this.setData({ imgUrls: url })
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
    // console.log(this.data.city_id)
    wx.navigateTo({
      url: '../recommend/recommend?project_id='+this.data.project_id,
    })
  },

  toPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  pageToMap() {
    wx.navigateTo({
      url: '../map/map?projectName=中海天钻'
    })
  }
})