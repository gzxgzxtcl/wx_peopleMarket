// pages/cityList/cityList.js
//获取应用实例
const app = getApp()
import apiSetting from '../../http/apiSetting.js'
import $http from '../../http/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 城市列表
    cityListData: [],
    // 当前选中城市id
    selectCity: null,
    // 当前选中城市信息
    localCity: app.globalData.storLocalCity,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data({
      selectCity: localCity.id
    })
    this.getCityList()
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  //城市选择
  cityChange(e) {
    this.setData({
      selectCity: e.target.dataset.item.id,
      localCity: e.target.dataset.item
    })
    wx.setStorageSync('storLocalCity', e.target.dataset.item)
  },

  //获取城市列表
  getCityList() {
    let that = this
    // that.showLoading()
    let promise = {}
    let newData = [{
        "id": "0-166-924-186-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华北区",
        "city": "北京",
        "cityx": null,
        "cityy": null,
        "snumber": 10103,
        "status": null,
        "firstCn": "B"
      },
      {
        "id": "0-166-864-203-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "北方区",
        "city": "长春",
        "cityx": null,
        "cityy": null,
        "snumber": 10105,
        "status": null,
        "firstCn": "C"
      },
      {
        "id": "0-166-1044-204-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "西部区",
        "city": "成都",
        "cityx": null,
        "cityy": null,
        "snumber": 10106,
        "status": null,
        "firstCn": "C"
      },
      {
        "id": "0-166-907-1163-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "长沙",
        "cityx": null,
        "cityy": null,
        "snumber": 10136,
        "status": null,
        "firstCn": "C"
      },
      {
        "id": "0--1-1443-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "常州",
        "cityx": null,
        "cityy": null,
        "snumber": 10151,
        "status": null,
        "firstCn": "C"
      },
      {
        "id": "0-166-864-842-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "北方区",
        "city": "大连",
        "cityx": null,
        "cityy": null,
        "snumber": 10118,
        "status": null,
        "firstCn": "D"
      },
      {
        "id": "0-166-907-2723-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "东莞",
        "cityx": null,
        "cityy": null,
        "snumber": 10185,
        "status": null,
        "firstCn": "D"
      },
      {
        "id": "0-166-907-277-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "佛山",
        "cityx": null,
        "cityy": null,
        "snumber": 10112,
        "status": null,
        "firstCn": "F"
      },
      {
        "id": "0-166-907-1947-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "福州",
        "cityx": null,
        "cityy": null,
        "snumber": 10163,
        "status": null,
        "firstCn": "F"
      },
      {
        "id": "0-166-907-205-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "广州",
        "cityx": null,
        "cityy": null,
        "snumber": 10107,
        "status": null,
        "firstCn": "G"
      },
      {
        "id": "0--1-1124-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "桂林",
        "cityx": null,
        "cityy": null,
        "snumber": 10129,
        "status": null,
        "firstCn": "G"
      },
      {
        "id": "0--1-1376-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "赣州",
        "cityx": null,
        "cityy": null,
        "snumber": 10145,
        "status": null,
        "firstCn": "G"
      },
      {
        "id": "0-166-884-766-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华东区",
        "city": "杭州",
        "cityx": null,
        "cityy": null,
        "snumber": 10115,
        "status": null,
        "firstCn": "H"
      },
      {
        "id": "0--1-1077-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "呼和浩特",
        "cityx": null,
        "cityy": null,
        "snumber": 10128,
        "status": null,
        "firstCn": "H"
      },
      {
        "id": "0--1-1198-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "合肥",
        "cityx": null,
        "cityy": null,
        "snumber": 10140,
        "status": null,
        "firstCn": "H"
      },
      {
        "id": "0-166-864-1519-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "北方区",
        "city": "哈尔滨",
        "cityx": null,
        "cityy": null,
        "snumber": 10156,
        "status": null,
        "firstCn": "H"
      },
      {
        "id": "0-166-907-2684-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "海南",
        "cityx": null,
        "cityy": null,
        "snumber": 10183,
        "status": null,
        "firstCn": "H"
      },
      {
        "id": "0--1-100001-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "惠州",
        "cityx": null,
        "cityy": null,
        "snumber": 999999,
        "status": null,
        "firstCn": "H"
      },
      {
        "id": "0-166-907-100001-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "海口",
        "cityx": null,
        "cityy": null,
        "snumber": 999999,
        "status": null,
        "firstCn": "H"
      },
      {
        "id": "0-166-924-905-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华北区",
        "city": "济南",
        "cityx": null,
        "cityy": null,
        "snumber": 10123,
        "status": null,
        "firstCn": "J"
      },
      {
        "id": "0--1-1164-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "吉林",
        "cityx": null,
        "cityy": null,
        "snumber": 10137,
        "status": null,
        "firstCn": "J"
      },
      {
        "id": "0--1-100003-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "九江",
        "cityx": null,
        "cityy": null,
        "snumber": 999999,
        "status": null,
        "firstCn": "J"
      },
      {
        "id": "0-166-1044-1400-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "西部区",
        "city": "昆明",
        "cityx": null,
        "cityy": null,
        "snumber": 10148,
        "status": null,
        "firstCn": "K"
      },
      {
        "id": "0--1-1257-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "兰州",
        "cityx": null,
        "cityy": null,
        "snumber": 10144,
        "status": null,
        "firstCn": "L"
      },
      {
        "id": "0-166-884-206-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华东区",
        "city": "南京",
        "cityx": null,
        "cityy": null,
        "snumber": 10108,
        "status": null,
        "firstCn": "N"
      },
      {
        "id": "0-166-884-353-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华东区",
        "city": "宁波",
        "cityx": null,
        "cityy": null,
        "snumber": 10113,
        "status": null,
        "firstCn": "N"
      },
      {
        "id": "0-166-884-1184-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华东区",
        "city": "南昌",
        "cityx": null,
        "cityy": null,
        "snumber": 10139,
        "status": null,
        "firstCn": "N"
      },
      {
        "id": "0--1-1251-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "南宁",
        "cityx": null,
        "cityy": null,
        "snumber": 10141,
        "status": null,
        "firstCn": "N"
      },
      {
        "id": "0--1-1431-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "南通",
        "cityx": null,
        "cityy": null,
        "snumber": 10150,
        "status": null,
        "firstCn": "N"
      },
      {
        "id": "0-166-907-100002-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "南航",
        "cityx": null,
        "cityy": null,
        "snumber": 999999,
        "status": null,
        "firstCn": "N"
      },
      {
        "id": "0-166-864-819-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "北方区",
        "city": "青岛",
        "cityx": null,
        "cityy": null,
        "snumber": 10117,
        "status": null,
        "firstCn": "Q"
      },
      {
        "id": "0-166-907-167-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "深圳",
        "cityx": null,
        "cityy": null,
        "snumber": 10102,
        "status": null,
        "firstCn": "S"
      },
      {
        "id": "0-166-884-202-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华东区",
        "city": "上海",
        "cityx": null,
        "cityy": null,
        "snumber": 10104,
        "status": null,
        "firstCn": "S"
      },
      {
        "id": "0-166-884-211-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华东区",
        "city": "苏州",
        "cityx": null,
        "cityy": null,
        "snumber": 10111,
        "status": null,
        "firstCn": "S"
      },
      {
        "id": "0-166-864-850-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "北方区",
        "city": "沈阳",
        "cityx": null,
        "cityy": null,
        "snumber": 10119,
        "status": null,
        "firstCn": "S"
      },
      {
        "id": "0--1-1946-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "绍兴",
        "cityx": null,
        "cityy": null,
        "snumber": 10162,
        "status": null,
        "firstCn": "S"
      },
      {
        "id": "0--1-2086-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "汕头",
        "cityx": null,
        "cityy": null,
        "snumber": 10164,
        "status": null,
        "firstCn": "S"
      },
      {
        "id": "0-166-924-877-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华北区",
        "city": "天津",
        "cityx": null,
        "cityy": null,
        "snumber": 10121,
        "status": null,
        "firstCn": "T"
      },
      {
        "id": "0-166-924-1588-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华北区",
        "city": "太原",
        "cityx": null,
        "cityy": null,
        "snumber": 10160,
        "status": null,
        "firstCn": "T"
      },
      {
        "id": "0-166-924-1255-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华北区",
        "city": "武汉",
        "cityx": null,
        "cityy": null,
        "snumber": 10142,
        "status": null,
        "firstCn": "W"
      },
      {
        "id": "0--1-1551-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "潍坊",
        "cityx": null,
        "cityy": null,
        "snumber": 10158,
        "status": null,
        "firstCn": "W"
      },
      {
        "id": "0-166-1044-1552-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "西部区",
        "city": "乌鲁木齐",
        "cityx": null,
        "cityy": null,
        "snumber": 10159,
        "status": null,
        "firstCn": "W"
      },
      {
        "id": "0-166-884-1832-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华东区",
        "city": "无锡",
        "cityx": null,
        "cityy": null,
        "snumber": 10161,
        "status": null,
        "firstCn": "W"
      },
      {
        "id": "0--1-100006-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "渭南",
        "cityx": null,
        "cityy": null,
        "snumber": 999999,
        "status": null,
        "firstCn": "W"
      },
      {
        "id": "0-166-1044-207-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "西部区",
        "city": "西安",
        "cityx": null,
        "cityy": null,
        "snumber": 10109,
        "status": null,
        "firstCn": "X"
      },
      {
        "id": "0-166-907-1256-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "厦门",
        "cityx": null,
        "cityy": null,
        "snumber": 10143,
        "status": null,
        "firstCn": "X"
      },
      {
        "id": "0--1-100004-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "徐州",
        "cityx": null,
        "cityy": null,
        "snumber": 999999,
        "status": null,
        "firstCn": "X"
      },
      {
        "id": "0--1-100005-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "西宁",
        "cityx": null,
        "cityy": null,
        "snumber": 999999,
        "status": null,
        "firstCn": "X"
      },
      {
        "id": "0--1-1130-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "银川",
        "cityx": null,
        "cityy": null,
        "snumber": 10131,
        "status": null,
        "firstCn": "Y"
      },
      {
        "id": "0-166-864-1183-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "北方区",
        "city": "烟台",
        "cityx": null,
        "cityy": null,
        "snumber": 10138,
        "status": null,
        "firstCn": "Y"
      },
      {
        "id": "0--1-1399-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "扬州",
        "cityx": null,
        "cityy": null,
        "snumber": 10147,
        "status": null,
        "firstCn": "Y"
      },
      {
        "id": "0--1-1467-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "盐城",
        "cityx": null,
        "cityy": null,
        "snumber": 10152,
        "status": null,
        "firstCn": "Y"
      },
      {
        "id": "0-166-907-208-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "中山",
        "cityx": null,
        "cityy": null,
        "snumber": 10110,
        "status": null,
        "firstCn": "Z"
      },
      {
        "id": "0-166-1044-446-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "西部区",
        "city": "重庆",
        "cityx": null,
        "cityy": null,
        "snumber": 10114,
        "status": null,
        "firstCn": "Z"
      },
      {
        "id": "0-166-924-2127-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华北区",
        "city": "郑州",
        "cityx": null,
        "cityy": null,
        "snumber": 10166,
        "status": null,
        "firstCn": "Z"
      },
      {
        "id": "0--1-100002-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "其他城市",
        "city": "淄博",
        "cityx": null,
        "cityy": null,
        "snumber": 999999,
        "status": null,
        "firstCn": "Z"
      },
      {
        "id": "0-166-907-100000-",
        "createBy": null,
        "createDate": null,
        "updateBy": null,
        "updateDate": null,
        "area": "华南区",
        "city": "珠海",
        "cityx": null,
        "cityy": null,
        "snumber": 999999,
        "status": null,
        "firstCn": "Z"
      }
    ]
    let listData = []
    for (let i in newData) {
      let findIndex = listData.findIndex((n) => {
        return n.key == newData[i].firstCn
      })

      if (findIndex == -1) {
        listData.push({
          'key': newData[i].firstCn,
          'item': [newData[i]]
        })
      } else {
        listData[findIndex].item.push(newData[i])
      }
    }
    that.setData({
      cityListData: listData
    })
    // $http(apiSetting.cityFindCityItems, promise).then((data) => {
    //   console.log(data.data)
    //   that.hideLoading()
    // }, (error) => {
    //   console.log(error)
    //   that.hideLoading()
    // });
  },

  showLoading() {
    wx.showLoading({
      title: '加载中',
    })
  },

  hideLoading() {
    wx.hideLoading()
  }
})