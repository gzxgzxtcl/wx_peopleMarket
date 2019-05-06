// pages/attention/attention.js
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
import fileUrl from '../../http/fileServeUrl.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultImg: '../../images/defaultImg.png',
    imgpath: fileUrl, //图片根路径
    isHide: false,
    attentionList: [], //我的关注列表
    tagList: [], //标签数组
    // 翻页
    pageData: {
      page: 1,
      perpage: 5,
      isPage: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    this.getProjectApiFindProjectListByMyConc(this.data.attentionList)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.isHide){
      this.setData({ 'pageData.page': 1,'pageData.isPage':true})
      // this.data.pageData.isPage = false
      this.getProjectApiFindProjectListByMyConc([])
    }
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.data.isHide = true
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
   
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  //获取我的关注列表
  // getProjectApiFindProjectListByMyConc(list) {
  //   let promise = {
  //     page: this.data.pageData.page,
  //     perpage: this.data.pageData.perpage,
  //     login_by: app.globalData.userId
  //   }
  //   $http(apiSetting.projectApiFindProjectListByMyConc, promise).then((data) => {
  //     let attentions=data.list
  //     if(!attentions.length)  return
  //     for (let i = 0; i < attentions.length; i++) {
  //       if (attentions[i].pictureurl === 'null') {
  //         attentions[i].pictureurl = ''
  //       } else {
  //         attentions[i].pictureurl = this.data.imgpath + attentions[i].pictureurl
  //       }
  //     }
  //     let newArr = []
  //     if (data.list.length > 0) {
  //       newArr = [...list, ...attentions]
  //     } else {
  //       this.data.pageData.isPage = false
  //       return
  //     }
      
  //     this.setData({
  //       attentionList: newArr
  //     })

  //     let _arr = newArr
  //     let _arr1 = []
  //     for (let i = 0; i < _arr.length; i++) {
  //       if (!_arr[i].labels) {
  //         _arr1.push('')
  //       } else {
  //         _arr1.push(_arr[i].labels.split(','))
  //       }
  //     }
  //     this.setData({
  //       tagList: _arr1
  //     })
  //   })
  // },




  //获取我的关注列表
  getProjectApiFindProjectListByMyConc(list) {
    let promise = {
      page: this.data.pageData.page,
      perpage: this.data.pageData.perpage,
      login_by: app.globalData.userId
    }
    $http(apiSetting.projectApiFindProjectListByMyConc, promise).then((data) => {
      let attentions = data.list
      if (attentions.length >= 0) {
        //修改图片路径
        for (let i = 0; i < attentions.length; i++) {
          if (attentions[i].pictureurl === 'null') {
            attentions[i].pictureurl = ''
          } else {
            attentions[i].pictureurl = this.data.imgpath + attentions[i].pictureurl
          }
        }
        let _arr1 = []
        for (let i = 0; i < attentions.length; i++) {
          if (!attentions[i].labels) {
            attentions[i].labels = []
          } else {
             attentions[i].labels = attentions[i].labels.split(',')
          }
        }
        let newArr=[]
        newArr = [...list, ...attentions]
        this.setData({
          attentionList: newArr
        })
        wx.hideLoading()
      }else {
        this.data.pageData.isPage = false
        wx.hideLoading()
        return
      }
    })
  },

  //查看关注列表楼盘详情
  goInformation(e) {
    let project_id = e.currentTarget.dataset.project_id
    wx.navigateTo({
      url: '../information/information?project_id=' + project_id,
    })
  },

  // 页面到达底部
  onReachBottom() {
    // 判断是否翻页
    if (this.data.pageData.isPage) {
      this.data.pageData.page++;
      this.getProjectApiFindProjectListByMyConc(this.data.attentionList)
    }
  },

  //关注列表图片错误
  erroImage(e){
    if (e.type == 'error') {
      this.data.attentionList[e.target.dataset.index].pictureurl = this.data.defaultImg
      this.setData({
        attentionList: this.data.attentionList
      })
    }
  }
})