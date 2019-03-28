// pages/map/map.js
Page({
  data: {
    // 地图中心点
    // 经度
    longitude: 113.324520,
    // 纬度
    latitude: 23.099994,
    // 地图上显示的标记
    markers: [{
      id: 1,
      longitude: 113.324520,
      latitude: 23.099994,
      name: 'T.I.T 创意园'
    }]
  },

  onLoad(option) {
    console.log(option.projectName)
    wx.setNavigationBarTitle({
      title: option.projectName
    })
  }

})