// pages/map/map.js
Page({
  data: {
    // 地图中心点
    // 经度
    longitude: 113.324520,
    // 纬度
    latitude: 23.099994,
    // 地图上显示的标记
    markers: []
  },

  onLoad(option) {
    // console.log(option.projectName)
    // console.log(option.longitude)
    // console.log(option.latitude)
    let mapObj = [{
      longitude: option.longitude,
      latitude: option.latitude,
      name: option.projectName
    }]
    //设置页面标题
    wx.setNavigationBarTitle({
      title: option.projectName
    })
    this.setData({
      longitude: option.longitude,
      latitude: option.latitude,
      markers: mapObj
    })
  }

})