const serviceModule = {
  userDecodeUserInfo: {
    url: '/user/decodeUserInfo',
    method: 'post'
  },
  cityFindBuildInfoByCity: {
    url: '/city/findBuildInfoByCity',
    method: 'post'
  },
  projectApiFindProjectListByCity: { 
    url: '/projectApi/findProjectListByCity',
    method: 'post'
  },
  cityFindCityItems: {
    url: '/city/findCityItems',
    method: 'post'
  },
  userIdentifyUser: { //用户认证
    url: '/user/identifyUser',
    method: 'post'
  },
  userGetUserInfo: { //获取用户信息
    url: '/user/getUserInfo',
    method: 'post'
  },
  userGetCode: { //获取短信验证
    url: '/user/getCode',
    method: 'post'
  },
  userCheckSMSCode: { //短信校验
    url: '/user/checkSMSCode',
    method: 'post'
  },

  //获取海客中介用户
  userGetHaikeAgencyInfo: {
    url: '/user/getHaikeAgencyInfo',
    method: 'post'
  },

  // 推荐客户
  recommendAddAgencyCustom: {
    url: '/recommend/addAgencyCustom',
    method: 'post'
  },

  // 获取楼盘列表
  recommendGetProjectList: {
    url: '/recommend/getProjectList',
    method: 'post'
  },
  //推荐-筛选条目
  recommendItemList: {
    url: '/recommend/itemList',
    method: 'post'
  },
  //推荐人信息状态
  recommendFindCustomList: {
    url: '/recommend/findCustomList',
    method: 'post'
  },
  //推荐客户人数
  recommendFindRecommendPerson: {
    url: '/recommend/findRecommendPerson',
    method: 'post'
  },
  //获取我要推荐页面数据
  recommendGetMyRecommendData: {
    url: '/recommend/getMyRecommendData',
    method: 'post'
  },
  //获取佣金信息
  recommendCommissionInfoList: {
    url: '/recommend/commissionInfoList',
      method: 'post'
  },


  projectApiFindProjectInfoById: { //详情-获取项目信息
    url: '/projectApi/findProjectInfoById',
    method: 'post'
  },
  projectApiFindProjectDetailsById: { //详情-获取项目详情
    url: '/projectApi/findProjectDetailsById',
    method: 'post'
  },
  projectApiFindProjectHouserholdListById: { //详情-获取户型列表
    url: '/projectApi/findProjectHouserholdListById',
    method: 'post'
  },
  projectApiFindProjectHouserholdFileListById: { //详情-获取户型图片列表
    url: '/projectApi/findProjectHouserholdFileListById',
    method: 'post'
  },
  projectApiFindProjectImagesListByType: { //详情-获取楼盘图片列表
    url: '/projectApi/findProjectImagesListByType',
    method: 'post'
  },

  //添加我的关注
  projectApiInsertMyConc: {
    url: '/projectApi/insertMyConc',
    method: 'post'
  },
  //取消我的关注
  projectApiUpdateMyConc: {
    url: '/projectApi/updateMyConc',
    method: 'post'
  },
  // 查询我的关注项目列表
  projectApiFindProjectListByMyConc: {
    url: '/projectApi/findProjectListByMyConc',
    method: 'post'
  },
}
const ApiSetting = { ...serviceModule
}

export default ApiSetting