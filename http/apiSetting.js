const serviceModule = {
  userDecodeUserInfo: {
    url: '/user/decodeUserInfo',
    method: 'post'
  },
  cityFindBuildInfoByCity: {
    url: '/city/findBuildInfoByCity',
    method: 'post'
  },
  projectApiFindProjectListByCity:{     //
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

  // 获取楼盘列表
  recommendGetProjectList: {
    url: '/recommend/getProjectList',
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
  recommendIitemList:{  //推荐-筛选条目
    url:'/recommend/itemList',
    method: 'post'
  },

}
const ApiSetting = { ...serviceModule
}

export default ApiSetting