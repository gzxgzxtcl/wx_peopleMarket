// pages/information/information.js
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
import fileUrl from '../../http/fileServeUrl.js'
const app = getApp()

Page({
  data: {
    defaultImg: '../../images/defaultImg.png',
    mapInfo: {
      name: '',
      salesLongitude: '',
      salesLatitude: '',
      showLongitude: '',
      showLlatitude: '',
    },
    optionsObj: null,
    imgpath: fileUrl, //图片根路径
    isAttention: false,
    /*是否关注*/
    imgUrls: [], //轮播图列表 
    bannerlength: 0,
    /*轮播图个数 */
    bannerindex: 0,
    /*轮播下标*/
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    visible2: false,
    ishaveall: false,
    /*是否大于5条亮点 */
    islookall: false,
    /*是否查看全部*/

    mainpriceOrCommission: 0, //0代表显示主力均价提示，1表示佣金规则

    phone: '', //联系我们-电话
    /*
      项目信息
     */
    projectname_cswx: '',
    /*案名（项目名）*/
    issale: '',
    /*在售状态，如（开盘）*/
    salesaddr: '',
    /*售楼地址*/
    showhall: '',
    /*展厅地址*/
    couponinfo: '',
    /*优惠信息*/
    mainprice: '',
    /*主力产品均价*/
    mainpricedescription: '',
    /*主力产品均价后方价格说明详情*/
    mainhouseholdList: [],
    /*主力房型*/
    labelsList: [],
    /*卖点标签*/
    brightspotsList: [],
    /*楼盘亮点*/
    isbuildsimg: false,
    /*是否有楼盘图*/
    project_id: '',
    /*项目id*/
    city_id: '',
    /*城市id*/

    //楼盘主图,实景图,效果图,配套图,规划图
    buildsRequestArr: ['项目主图', '实景图', '效果图', '配套图', '规划图'],
    buildsimg: [
      // {
      //   name:'项目主图',
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
    projectInfo: [], //项目详情
    isMoreInfo: false, //是否有更多详情
    projectInfoNum: 0, //项目详情条数
    lightspot: '', //亮点概述
    spots: 0, //亮点条数
    exemption: '',
    /*免责条款*/
    // commissionRule: '',     //佣金规则  
    commissioninfo:'',      //佣金信息
    /*
      房型列表
    */
    hourselist: [],
    /*户型列表 */
    upload_file_path: '',
    /*房型图片*/
    caption: '98m² 舒适两居室',
    /*标题*/
    houserhold: '两室一厅一卫',
    /*户型*/
    price: '暂无定价',
    /*定价*/
    buyingpoint: '户型优势',
    /*户型优势*/
    area: '98m²',
    /*建筑面积*/
    category: '高层',
    /*产品类型*/
    decoration: '精装修',
    /*装修情况*/
    houserholdremark: '高端海景洋房，享受高端定制服务。',
    /*户型描述*/
    pointList: [], //房型优势列表
    hourserimglist: [], //房型图片列表

    /*
    关注请求数据
  */
    attentionList: {
      login_by: '', //用户登录id
      project_id: '', //项目id
    },
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /*
      首页传递项目id到详情页，并将项目id进行保存，并使用
    */
    this.data.optionsObj = options
    let project_id = options.project_id          //index-->information 项目id
    //let imgurl = options.imgurl                //index-->information  项目主图

    //对关注接口的请求参数进行赋值
    this.setData({
      'attentionList.login_by': app.globalData.userId,
      'attentionList.project_id': project_id
    })

    this.getProjectInfo(project_id);            // 通过id获取项目信息
    this.getProjectDetails(project_id)          //通过id获取项目详情
    this.getProjectHouserholdList(project_id);  //通过id查询户型列表
    this.getHourseImgList(project_id);         //通过类型查询楼盘图
    this.getClauseAndRule();                  //获取免责条款
    this.isAttentionProject();                //判断是否关注项目
    
  },
  //查询免责条款
  getClauseAndRule() {
    let promise1 = {
      dictname: '免责条款'
    }
    $http(apiSetting.projectApiFindOtherDictValues, promise1).then((data) => {
      this.setData({
        exemption: data.data
      })
    }), (error) => {
      console.log(error)
    }
    // let promise2 = {
    //   dictname: '佣金规则'
    // }
    // $http(apiSetting.projectApiFindOtherDictValues, promise2).then((data) => {
    //   this.setData({
    //     commissionRule: data.data
    //   })
    // }), (error) => {
    //   console.log(error)
    // }

  },

//通过类型查询楼盘图列表
  getHourseImgList(id){
    let promiseTypeIndex=0
    let promise = {
      picturetype: this.data.buildsRequestArr[promiseTypeIndex],
      project_id:id
    }
    $http(apiSetting.projectApiFindProjectImagesListByType, promise).then((data) => {
      console.log(data.data)
      let _arrBannerImg=data.data
      let _arrBannerImg2=[]
      for (let i = 0; i < _arrBannerImg.length;i++){
        if (_arrBannerImg[i].upload_file_path == undefined || _arrBannerImg[i].upload_file_path == null) {
          continue
        } else {
          _arrBannerImg2.push(_arrBannerImg[i].upload_file_path)
        }
      }
      for (let i = 0; i < _arrBannerImg2.length;i++){
        _arrBannerImg2[i] = this.data.imgpath + _arrBannerImg2[i].upload_file_path
      }
      this.resetBanner(_arrBannerImg2)
      promiseTypeIndex++
      promise.picturetype = this.data.buildsRequestArr[promiseTypeIndex]
      return $http(apiSetting.projectApiFindProjectImagesListByType, promise)
    }).then((data) => {
      let _arrSJImg=data.data
      let _arrSJImg2=[]
      for (let i = 0; i < _arrSJImg.length;i++){
        if (_arrSJImg[i].upload_file_path == undefined || _arrSJImg[i].upload_file_path == null) {
          continue
        } else {
          _arrSJImg2.push(_arrSJImg[i].upload_file_path)
        }
      }
      for (let i = 0; i < _arrSJImg2.length; i++) {
        _arrSJImg2[i] = this.data.imgpath + _arrSJImg2[i].upload_file_path
      }
      this.setData({ 'buildsimg[0].imgs': _arrSJImg2 })
      promiseTypeIndex++
      promise.picturetype = this.data.buildsRequestArr[promiseTypeIndex]
      return $http(apiSetting.projectApiFindProjectImagesListByType, promise)
    }).then((data)=>{
      let _arrXGImg=data.data
      let _arrXGImg2=[]
      for (let i = 0; i < _arrXGImg.length; i++) {
        if (_arrXGImg[i].upload_file_path == undefined || _arrXGImg[i].upload_file_path == null) {
          continue
        } else {
          _arrXGImg2.push(_arrXGImg[i].upload_file_path)
        }
      }
      for (let i = 0; i < _arrXGImg2.length; i++) {
        _arrXGImg2[i] = this.data.imgpath + _arrXGImg2[i].upload_file_path
      }
      this.setData({ 'buildsimg[1].imgs': _arrXGImg2 })
      promiseTypeIndex++
      promise.picturetype = this.data.buildsRequestArr[promiseTypeIndex]
      return $http(apiSetting.projectApiFindProjectImagesListByType, promise)
    }).then((data)=>{
      let _arrPTImg=data.data
      let _arrPTImg2=[]
      for (let i = 0; i < _arrPTImg.length; i++) {
        if (_arrPTImg[i].upload_file_path == undefined || _arrPTImg[i].upload_file_path == null) {
          continue
        } else {
          _arrPTImg2.push(_arrPTImg[i].upload_file_path)
        }
      }
      for (let i = 0; i < _arrPTImg2.length; i++) {
        _arrPTImg2[i] = this.data.imgpath + _arrPTImg2[i].upload_file_path
      }
      this.setData({ 'buildsimg[2].imgs': _arrPTImg2 })
      promiseTypeIndex++
      promise.picturetype = this.data.buildsRequestArr[promiseTypeIndex]
      return $http(apiSetting.projectApiFindProjectImagesListByType, promise)
    }).then((data)=>{
      let _arrGHImg=data.data
      let _arrGHImg2=[]
      for (let i = 0; i < _arrGHImg.length; i++) {
        if (_arrGHImg[i].upload_file_path == undefined || _arrGHImg[i].upload_file_path == null) {
          continue
        } else {
          _arrGHImg2.push(_arrGHImg[i].upload_file_path)
        }
      }
      for (let i = 0; i < _arrGHImg2.length; i++) {
        _arrGHImg2[i] = this.data.imgpath + _arrGHImg2[i].upload_file_path
      }
      this.setData({ 'buildsimg[3].imgs': _arrGHImg2 })
    }).then(()=>{
      this.isHaveBuildsImg(this.data.buildsimg)
    }), (error) => {
      console.log(error)
    }
  },


  //通过类型查询楼盘图列表
  // getHourseImgList(id) {
  //   let promise1 = {
  //     project_id: id,
  //     picturetype: "项目主图"
  //   }
  //   this.getHourseImgFun(promise1)
  //   let promise2 = {
  //     project_id: id,
  //     picturetype: "实景图"
  //   }
  //   this.getHourseImgFun(promise2)
  //   let promise3 = {
  //     project_id: id,
  //     picturetype: "效果图"
  //   }
  //   this.getHourseImgFun(promise3)
  //   let promise4 = {
  //     project_id: id,
  //     picturetype: "配套图"
  //   }
  //   this.getHourseImgFun(promise4)
  //   let promise5 = {
  //     project_id: id,
  //     picturetype: "规划图"
  //   }
  //   this.getHourseImgFun(promise5)
  // },

  //请求楼盘图接口函数
  // getHourseImgFun(promise) { //楼盘主图,实景图,效果图,配套图,规划图
  //   $http(apiSetting.projectApiFindProjectImagesListByType, promise).then((data) => {
  //     let _arr = data.data
  //     let _arr2 = []
  //     if (promise.picturetype === "项目主图") {
  //       for (let i = 0; i < _arr.length; i++) {
  //         if (_arr[i].upload_file_path == undefined) {
  //           continue
  //         } else {
  //           _arr2.push(_arr[i].upload_file_path)
  //         }
  //       }

  //       this.resetBanner(_arr2)
  //       // this.setData({['buildsimg[0].imgs']:_arr2})
  //     } else if (promise.picturetype === "实景图") {
  //       for (let i = 0; i < _arr.length; i++) {
  //         if (_arr[i].upload_file_path == undefined) {
  //           continue
  //         } else {
  //           _arr2.push(_arr[i].upload_file_path)
  //         }
  //       }
  //       this.setData({
  //         'buildsimg[0].imgs': _arr2
  //       })
  //     } else if (promise.picturetype === "效果图") {
  //       for (let i = 0; i < _arr.length; i++) {
  //         if (_arr[i].upload_file_path == undefined) {
  //           continue
  //         } else {
  //           _arr2.push(_arr[i].upload_file_path)
  //         }
  //       }
  //       this.setData({
  //         'buildsimg[1].imgs': _arr2
  //       })
  //     } else if (promise.picturetype === "配套图") {
  //       for (let i = 0; i < _arr.length; i++) {
  //         if (_arr[i].upload_file_path == undefined) {
  //           continue
  //         } else {
  //           _arr2.push(_arr[i].upload_file_path)
  //         }
  //       }
  //       this.setData({
  //         'buildsimg[2].imgs': _arr2
  //       })
  //     } else if (promise.picturetype === "规划图") {
  //       for (let i = 0; i < _arr.length; i++) {
  //         if (_arr[i].upload_file_path == undefined) {
  //           continue
  //         } else {
  //           _arr2.push(_arr[i].upload_file_path)
  //         }
  //       }
  //       this.setData({
  //         'buildsimg[3].imgs': _arr2
  //       })
  //     }
  //     this.isHaveBuildsImg()
  //   }), (error) => {
  //     console.log(error)
  //   }
  // },

  //通过id获取户型图片列表
  getProjectHouserholdFileList(id) {
    let promise = {
      houserhold_id: id
    }
    $http(apiSetting.projectApiFindProjectHouserholdFileListById, promise).then((data) => {
      let imgArr = data.data[0]
      if (imgArr) {
        this.setData({
          upload_file_path: this.data.imgpath+imgArr.upload_file_path
        })
      } else {
        this.setData({
          upload_file_path: ''
        })
      }
    }), (error) => {
      console.log(error)
    }
  },
  //通过id查询户型列表
  getProjectHouserholdList(id) {
    let promise = {
      project_id: id
    }
    $http(apiSetting.projectApiFindProjectHouserholdListById, promise).then((data) => {
      let hourserholdlist = data.data[0];
      if (!hourserholdlist) return
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
      //截取亮点标签
      this.setData({
        pointList: hourserholdlist.buyingpoint.split(',')
      })
      //通过户型id请求户型图片
      this.getProjectHouserholdFileList(hourserholdlist.id);
    }), (error) => {
      console.log(error)
    }
  },

  //通过id获取项目详情
  getProjectDetails(id) {
    let promise = {
      project_id: id
    }
    $http(apiSetting.projectApiFindProjectDetailsById, promise).then((data) => {
      let projectdetails = data.data
      if (!projectdetails) return
      this.setData({
        lightspot: projectdetails.highlights,               //亮点概述信息
        commissioninfo: projectdetails.commissioninfo       //佣金规则
      })
      //项目详情列表
      let _projectInfo = []
      _projectInfo.push({
          name: '开发商',
          value: projectdetails.developer
        }, {
          name: '物业公司',
          value: projectdetails.propertycompany
        }, {
          name: '开盘时间',
          value: projectdetails.opening_date
        }, {
          name: '交房时间',
          value: projectdetails.delivery_date
        }, {
          name: '产权年限',
          value: projectdetails.years
        }, {
          name: '建筑类别',
          value: projectdetails.buildingtype
        }, {
          name: '装修状态',
          value: projectdetails.isup
        }, {
          name: '物业费',
          value: projectdetails.propertyexpenses 
        },
        // {
        //   name: '佣金信息',
        //   value: projectdetails.commissioninfo
        // }, {
        //   name: '优惠信息',
        //   value: projectdetails.couponinfo
        // }, 
        {
          name: '所属区县',
          value: projectdetails.district
        }, {
          name: '建筑面积',
          value: projectdetails.floorarea
        }, {
          name: '主面积',
          value: projectdetails.mainarea
        }, {
          name: '绿化情况',
          value: projectdetails.greencoverage
        }, {
          name: '建筑规划',
          value: projectdetails.panning
        }, {
          name: '咨询电话',
          value: projectdetails.phone
        }, {
          name: '容积率',
          value: projectdetails.plotratio
        }, {
          name: '预售许可证',
          value: projectdetails.presalepermit
        }, {
          name: '楼盘地址',
          value: projectdetails.projectaddr
        }, {
          name: '物业类别',
          value: projectdetails.propertytype
        }, )
      //筛选有值的详情项
      let _arr = []
      for (let i = 0; i < _projectInfo.length; i++) {
        if (_projectInfo[i].value && _projectInfo[i].value !== 'null') {
          // if (_projectInfo[i].name === '物业费') {
          //   _projectInfo[i].value = _projectInfo[i].value + '元/㎡'
          // }
          _arr.push(_projectInfo[i])
        }
      }
      //判断符合的数量，大于8个即产生'查看更多'
      if (_arr.length > 8) {
        this.setData({
          isMoreInfo: true,
          projectInfoNum: 8
        })
      } else {
        this.setData({
          isMoreInfo: false,
          projectInfoNum: 8
        })
      }
      //地图名和售楼处及展厅经纬度
      this.data.mapInfo.name = data.data.projectname_cswx
      this.data.mapInfo.salesLongitude = data.data.salesaddry
      this.data.mapInfo.salesLatitude = data.data.salesaddrx
      this.data.mapInfo.showLongitude = data.data.showhally
      this.data.mapInfo.showLlatitude = data.data.showhallx
      
      this.setData({
        projectInfo: _arr,                        //项目详情列表
        //exemption: projectdetails.exemption,      //免责条款
        phone: projectdetails.phone,              //联系电话
        projectname_cswx: projectdetails.projectname_cswx       //项目名
      })

      this.stopRefresh()
    }), (error) => {
      console.log(error)
      this.stopRefresh()
    }
  },

  // 通过id获取项目信息
 
  getProjectInfo(id) {
    let promise = {
      project_id: id
    }
    $http(apiSetting.projectApiFindProjectInfoById, promise).then((data) => {
      let projectinfo = data.data
      if (!projectinfo) return
      this.getSpotLength(projectinfo.brightspotsList);            //获取亮点条数
      this.setData({
        project_id: projectinfo.id,
        // projectname_hk: projectinfo.projectname_hk,
        issale: projectinfo.issale,
        salesaddr: projectinfo.salesaddr,
        showhall: projectinfo.showhall,
        couponinfo: projectinfo.couponinfo,
        mainprice: projectinfo.mainprice,
        mainpricedescription: projectinfo.mainpricedescription,
        mainhouseholdList: projectinfo.mainhouseholdList,
        labelsList: projectinfo.labelsList,
        // brightspotsList: projectinfo.brightspotsList,
        city_id: projectinfo.city
      })
      //判断亮点信息是否为空，并筛选有数据的项
      let _arr=[]
      for (let i = 0; i < projectinfo.brightspotsList.length;i++){
        if (projectinfo.brightspotsList[i].remark !== null && projectinfo.brightspotsList[i].remark !== undefined && projectinfo.brightspotsList[i].remark !== ''){
          _arr.push(projectinfo.brightspotsList[i])
        }
      }
      this.setData({ brightspotsList:_arr})

      //判断是否关注
      // if (projectinfo.is_myconc == 0) {
      //   this.setData({
      //     isAttention: true
      //   })
      // } else {
      //   this.setData({
      //     isAttention: false
      //   })
      // }
    }, (error) => {
      console.log(error)
    });
  },
  // 查看更多户型，跳转到户型列表页
  goHousetype() {
    wx.navigateTo({
      url: '../housestype/housestype?hourselist=' + JSON.stringify(this.data.hourselist),
    })
  },
  //户型图片点击事件
  goHouseimg(e) {
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
  isHaveBuildsImg(data) {
    let _arr = []
    for (let i = 0; i < data.length; i++) {
      if (!data[i].imgs.length) continue
      _arr.push('1')
    }
    if (_arr.length === 0) {
      this.setData({
        isbuildsimg: false
      })
    } else {
      this.setData({
        isbuildsimg: true
      })
    }
  },
  //楼盘图查看更多事件
  goBuildimg(e) {
    // let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../houseimg/houseimg?buildsimg=' + JSON.stringify(this.data.buildsimg)
    })
  },


  //关注 按钮事件
  toAttention() {
    this.setData({
      isAttention: !this.data.isAttention
    })
    if (this.data.isAttention) { //isAttention为true,则发起关注请求
      let promise = this.data.attentionList
      $http(apiSetting.projectApiInsertMyConc, promise).then((data) => {
        console.log(data)
      }, (error) => {
        console.log(error)
      });
    } else { //isAttention为false,则发起取消关注请求
      let promise = this.data.attentionList
      $http(apiSetting.projectApiUpdateMyConc, promise).then((data) => {
        console.log(data)
      }, (error) => {
        console.log(error)
      });
    }
  },
  //判断是否已经关注
  isAttentionProject() {
    let promise = this.data.attentionList
    $http(apiSetting.projectApiUpdateMyConc, promise).then((data) => {
      if (data.code === -1) { //返回值为-1，表示项目暂时没有被关注
        this.setData({
          isAttention: false
        })
      } else {
        $http(apiSetting.projectApiInsertMyConc, promise).then((data) => { //返回值为0，表示已经被关注，取消后发起请求重新关注
          if (data.data) {
            this.setData({
              isAttention: true
            })
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
  handleOpen2(e) {
    let type = e.currentTarget.dataset.type
    if (type === 0) {
      this.setData({
        mainpriceOrCommission: 0
      })
    }
    if (type === 1) {
      this.setData({
        mainpriceOrCommission: 1
      })
    }
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
  lookAll() {
    this.setData({
      islookall: !this.data.islookall
    })
  },
  // 初始化轮播图
  resetBanner(url) {
    this.setData({
      imgUrls: url
    })
    this.setData({
      bannerlength: this.data.imgUrls.length
    }) //初始化轮播展示图数量
  },
  //图片轮播
  bannerChange(e) {
    let current = e.detail.current
    this.setData({
      bannerindex: current
    })
  },
  //查看更多详细信息
  getMoreInfo() {
    this.setData({
      isMoreInfo: false,
      projectInfoNum: this.data.projectInfo.length
    })
  },
  //判断亮点条数
  getSpotLength(list) {
    let spots = list.length
    if (spots > 4) {
      ishaveall: true
      this.setData({
        ishaveall: true,
        spots: 4
      })
    }
    else {
      this.setData({
        spots: spots
      })
    }
  },
  
  //去推荐
  goRecommend() {
    wx.navigateTo({
      url: '../recommend/recommend?project_id=' + this.data.project_id,
    })
  },

  toPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  pageToMap(e) {
    if (e.target.dataset.type == 1) {
      wx.navigateTo({
        url: '../map/map?projectName=' + this.data.mapInfo.name + '&longitude=' + this.data.mapInfo.salesLongitude + '&latitude=' + this.data.mapInfo.salesLatitude
      })
    }
    if (e.target.dataset.type == 2) {
      wx.navigateTo({
        url: '../map/map?projectName=' + this.data.mapInfo.name + '&longitude=' + this.data.mapInfo.showLongitude + '&latitude=' + this.data.mapInfo.showLlatitude
      })
    }
  },
//滑动bug
  stopMove(){
    return
  },
  //户型图片错误
  erroImage1(e){
    console.log(e)
    if (e.type == 'error') {
      this.data.upload_file_path = this.data.defaultImg
      this.setData({
        upload_file_path: this.data.upload_file_path
      })
    }
  },
  //楼盘图错误
  // erroImage2(e){
  //   if (e.type == 'error') {
  //     buildsimg
  //     let _arr = this.data.buildsimg
  //     for (let i = 0; i < _arr.length;i++){
  //       _arr[i] = this.data.defaultImg
  //     }
  //     this.data.upload_file_path = this.data.defaultImg
  //     this.setData({
  //       upload_file_path: this.data.upload_file_path
  //     })
  //   }
  // },


  // 下拉刷新
  onPullDownRefresh() {
    // 显示导航栏加载框
    wx.showNavigationBarLoading()
    this.onLoad(this.data.optionsObj)
  },
  // 停止刷新
  stopRefresh() {
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  }
})