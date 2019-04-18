// pages/housestype/housestype.js
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath: 'http://39.98.191.16/zhwx/userfiles',     //图片根路径
    // imgpath: 'https://qmyx.coli688.com/zhwx/userfiles',     //图片根路径
    // imgpath: 'http://haiketest.coli688.com:8090/zhwx/userfiles',     //图片根路径
    selIndex:0,
    hourseViewList:[],              //户型显示列表
    allhourseList:[],                //全部户型列表
    twohourse:[],                   //两室户型列表
    threehourse:[],                   //三室户型列表

    pointViewList:[],             //优势显示列表
    allPointList:[],              //全部优势列表
    twoPointList:[],               //两室优势列表
    threePointList:[],            //三室优势列表

    hourseImgList:[],             //户型图片列表
    t:0,                        //循环变量
  },
  changeHouse(e){
    let index = e.currentTarget.dataset.index
    this.setData({ selIndex: index})
    let type = e.currentTarget.dataset.type
    //筛选符合类型户型
    if(type===0){
      this.setData({ hourseViewList: this.data.allhourseList, pointViewList: this.data.allPointList})
    }else if(type===1){
      this.setData({ hourseViewList: this.data.twohourse, pointViewList: this.data.twoPointList })
    }else if(type===2){
      this.setData({ hourseViewList: this.data.threehourse, pointViewList: this.data.threePointList })
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
    let index = e.currentTarget.dataset.index
    let _arr = this.data.hourseImgList[index]
    let urlList=[]
    for (let i = 0; i < _arr.length;i++){
      urlList.push(this.data.imgpath+_arr[i].upload_file_path)
    }  
    let current = this.data.imgpath + this.data.hourseImgList[index][0].upload_file_path
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urlList // 需要预览的图片http链接列表
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
    console.log("列表：",hourselist)
    this.setData({ allhourseList: hourselist, hourseViewList:hourselist })     //赋值给全部户型列表
    let _arr1=[]
    let _arr2=[]
    let point=[]
    let point1=[]
    let point2=[]
    for (let j = 0; j < hourselist.length; j++) {
      if (hourselist[j].houserhold.indexOf('两室') >= 0
        || hourselist[j].houserhold.indexOf('2室') >= 0
        || hourselist[j].houserhold.indexOf('两房') >= 0
        || hourselist[j].houserhold.indexOf('2房') >= 0) {
        _arr1.push(hourselist[j])
        point.push(hourselist[j].buyingpoint.split(','))
        point1.push(hourselist[j].buyingpoint.split(','))                     //两室优势
      } else if (hourselist[j].houserhold.indexOf('三室') >= 0
        || hourselist[j].houserhold.indexOf('3室') >= 0
        || hourselist[j].houserhold.indexOf('三房') >= 0
        || hourselist[j].houserhold.indexOf('3房') >= 0){
        _arr2.push(hourselist[j])
        point.push(hourselist[j].buyingpoint.split(','))
        point2.push(hourselist[j].buyingpoint.split(','))                   //三室优势
        }else{
        point.push(hourselist[j].buyingpoint.split(','))                  //全部优势
        }
    }
    this.setData({ twohourse: _arr1, threehourse:_arr2})
    this.setData({ allPointList: point, pointViewList: point, twoPointList: point1, threePointList:point2})

    //查询户型图片列表
    // for (let i = 0; i < hourselist.length; i++){
    //   this.getProjectHouserholdFileList(hourselist[i].id)
    // }
    let houserHoldFileLength = hourselist.length
    this.getProjectHouserholdFileList(houserHoldFileLength)
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
    if (_t >= imgListLength)  return
    let promise = { houserhold_id: this.data.allhourseList[_t].id }
    let _arr = this.data.hourseImgList
    $http(apiSetting.projectApiFindProjectHouserholdFileListById, promise).then((data) => {
      _arr.push(data.data)
      this.setData({ hourseImgList: _arr,t:_t+1})
      this.getProjectHouserholdFileList(imgListLength)
    }), (error) => {
      console.log(error)
    }
  },
})
