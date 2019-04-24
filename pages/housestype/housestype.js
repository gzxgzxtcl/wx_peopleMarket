// pages/housestype/housestype.js
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
import fileUrl from '../../http/fileServeUrl.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultImg: '../../images/defaultImg.png',
    imgpath: fileUrl,           //图片根路径
    selIndex:-1,                  //选择条默认下标
    hourseViewList:[],              //户型显示列表
    allhourseList:[],                //全部户型列表
    onehourse:[],                   //一室户型列表
    twohourse:[],                   //两室户型列表
    threehourse:[],                   //三室户型列表
    fourhourse: [],                   //四室户型列表
    otherhourse: [],                   //其他户型列表

    pointViewList:[],             //优势显示列表
    allPointList:[],              //全部优势列表
    onePointList: [],               //一室优势列表
    twoPointList:[],               //两室优势列表
    threePointList:[],            //三室优势列表
    fourPointList: [],               //四室优势列表
    otherPointList: [],               //其他优势列表

    hourseTypeList:[],            //户型分类列表
    hourseImgList:[],             //户型图片列表
    _hourseImgList:[],
    t:0,                        //循环变量
  },
  changeHouse(e){
    let index = e.currentTarget.dataset.index
    this.setData({ selIndex: index})
    let type = e.currentTarget.dataset.type
    //筛选符合类型户型
    if(type===-1){
      this.setData({ hourseViewList: this.data.allhourseList, pointViewList: this.data.allPointList})
    }else if(type===0){
      this.setData({ hourseViewList: this.data.onehourse, pointViewList: this.data.onePointList })
    }else if(type===1){
      this.setData({ hourseViewList: this.data.twohourse, pointViewList: this.data.twoPointList })
    } else if (type === 2) {
      this.setData({ hourseViewList: this.data.threehourse, pointViewList: this.data.threePointList })
    }
    else if (type === 3) {
      this.setData({ hourseViewList: this.data.fourhourse, pointViewList: this.data.fourPointList })
    }
    else if (type === 4) {
      this.setData({ hourseViewList: this.data.otherhourse, pointViewList: this.data.otherPointList })
    }
  },
  // 查看户型图
  // goHouseimg(e){
  //   let id=e.currentTarget.dataset.id
  //   wx.navigateTo({
  //     url: '../houseimg/houseimg?id='+id
  //   })
  // },
  // 获取大图
  goHouseimg(e) {
    let index = e.currentTarget.dataset.imgindex
    let _arr = this.data.allhourseList[index].imgArr
    let urlList=[]
    for (let i = 0; i < _arr.length;i++){
      urlList.push(_arr[i].upload_file_path)
    }  
    let current = this.data.allhourseList[index].imgArr[0].upload_file_path
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urlList // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHourseTypeList(options)
  },

  //获取详情传递的户型列表数据
  getHourseList(options){
    let hourselist = JSON.parse(options.hourselist)
    //this.setData({ allhourseList: hourselist, hourseViewList:hourselist })     //赋值给全部户型列表
    let _arr0=[]      //全部户型数组
    let _arr1=[]      //一室临时数组
    let _arr2=[]      //二室临时数组
    let _arr3 = []    //三室临时数组
    let _arr4 = []    //四室临时数组
    let _arr5 = []    //其他房型临时数组

    // let point=[]        //全部亮点
    // let point1=[]       //一室亮点
    // let point2=[]       //二室亮点
    // let point3 = []     //三室亮点
    // let point4 = []     //四室亮点
    // let point5 = []     //其他房型亮点
    // hourselist
    for (let i = 0; i < hourselist.length;i++){
      //绑定优势卖点
      let _point = hourselist[i].buyingpoint
      if (_point){
        _point=_point.split(',')
      }
      hourselist[i].buyingpoint=_point
      if (hourselist[i].housetype == this.data.hourseTypeList[0]){    //一室
        _arr1.push(hourselist[i])
        _arr0.push(hourselist[i])
      } else if (hourselist[i].housetype == this.data.hourseTypeList[1]){   //二室
        _arr2.push(hourselist[i])
        _arr0.push(hourselist[i])
      } else if (hourselist[i].housetype == this.data.hourseTypeList[2]) {    //三室
        _arr3.push(hourselist[i])
        _arr0.push(hourselist[i])
      } else if (hourselist[i].housetype == this.data.hourseTypeList[3]) {    //四室
        _arr4.push(hourselist[i])
        _arr0.push(hourselist[i])
      } else if (hourselist[i].housetype == this.data.hourseTypeList[4]) {    //其他
        _arr5.push(hourselist[i])
        _arr0.push(hourselist[i])
      }
    }
    this.setData({
      allhourseList:_arr0,
      // hourseViewList:_arr0,
      onehourse:_arr1,
      twohourse:_arr2,
      threehourse:_arr3,
      fourhourse:_arr4,
      otherhourse:_arr5
      })
  
    // let typeList = this.data.hourseTypeList
    // for (let j = 0; j < hourselist.length; j++) {
    //   if (hourselist[j].housetype == typeList[0]) {
    //     _arr1.push(hourselist[j])                                       //一室
    //     point.push(hourselist[j].buyingpoint.split(','))
    //     point1.push(hourselist[j].buyingpoint.split(','))               //一室优势
    //   } else if (hourselist[j].housetype == typeList[1]){
    //     _arr2.push(hourselist[j])                                        //二室
    //     point.push(hourselist[j].buyingpoint.split(','))
    //     point2.push(hourselist[j].buyingpoint.split(','))                //二室优势
    //   } else if (hourselist[j].housetype == typeList[2]){
    //     _arr3.push(hourselist[j])                                       //三室
    //     point.push(hourselist[j].buyingpoint.split(','))
    //     point3.push(hourselist[j].buyingpoint.split(','))               //三室优势
    //   } else if (hourselist[j].housetype == typeList[3]) {
    //     _arr4.push(hourselist[j])                                       //四室
    //     point.push(hourselist[j].buyingpoint.split(','))
    //     point4.push(hourselist[j].buyingpoint.split(','))               //四室优势
    //   } else if (hourselist[j].housetype == typeList[4]) {
    //     _arr5.push(hourselist[j])                                       //其他
    //     point.push(hourselist[j].buyingpoint.split(','))
    //     point5.push(hourselist[j].buyingpoint.split(','))               //其他优势
    //   } else{
    //     point.push(hourselist[j].buyingpoint.split(','))                  //全部优势
    //   }
    // }

    // this.setData({ onehourse: _arr1, twohourse: _arr2, threehourse: _arr3, fourhourse: _arr4, otherhourse:_arr5})
    // this.setData({ allPointList: point, pointViewList: point, onePointList: point1, twoPointList: point2, threePointList: point3, fourPointList: point4, otherPointList:point5})
   
    //查询户型图片列表
    // for (let i = 0; i < hourselist.length; i++){
    //   this.getProjectHouserholdFileList(hourselist[i].id)
    // }
    let houserHoldFileLength = hourselist.length
    this.getProjectHouserholdFileList(houserHoldFileLength)
  },
  //查询户型分类列表
  getHourseTypeList(options){
    let promise = { dictname: "户型分类"}
    $http(apiSetting.projectApiFindOtherDictValues, promise).then((data) => {
      let _arr=data.data.split(',')
      this.setData({ hourseTypeList:_arr})
      this.getHourseList(options)
    }), (error) => {
      console.log(error)
    }
  },

  //通过id获取户型图片列表
//   getProjectHouserholdFileList(id) {
//     let promise = { houserhold_id: id }
//     let _arr = this.data.hourseImgList
//     console.log(promise)
//     $http(apiSetting.projectApiFindProjectHouserholdFileListById, promise).then((data) => {
//       // if(!data.data)  return
//       _arr.push(data.data)
//       this.setData({ hourseImgList: _arr })
//     }), (error) => {
//       console.log(error)
//     }
//     console.log("显示列表：", _arr)
//   },

  getProjectHouserholdFileList(imgListLength) {
    let _t=this.data.t
    if (_t >= imgListLength){
      let _arr1 = this.data._hourseImgList
      for (let i = 0; i < _arr1.length; i++) {
        for (let j = 0; j < _arr1[i].length; j++) {
          if (_arr1[i][j]!==null){
            _arr1[i][j].upload_file_path = this.data.imgpath + _arr1[i][j].upload_file_path
          }else{
            _arr1[i][j] = {upload_file_path: this.data.imgpath} 
          }
        }
      }
      //将图片挂在到户型列表上
      let allList = this.data.allhourseList
      for (let i = 0; i < allList.length;i++){
        allList[i].imgArr = _arr1[i]
      }
      this.setData({ allhourseList: allList, hourseViewList: allList})
      return
    }  
    let promise = { houserhold_id: this.data.allhourseList[_t].id }
    let _arr = this.data._hourseImgList
    
    $http(apiSetting.projectApiFindProjectHouserholdFileListById, promise).then((data) => {
      _arr.push(data.data)
      this.setData({ _hourseImgList: _arr,t:_t+1})
      this.getProjectHouserholdFileList(imgListLength)
    }), (error) => {
      console.log(error)
    }
  },
  //户型图页图片错误
  erroImage1(e){
    if (e.type == 'error') {
      this.data.allhourseList[e.target.dataset.index].imgArr[0].upload_file_path = this.data.defaultImg
      this.data.hourseViewList[e.target.dataset.index].imgArr[0].upload_file_path = this.data.defaultImg
      this.setData({
        hourseViewList: this.data.hourseViewList
      })
    }
  }
})
