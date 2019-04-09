const serviceModule = {
  userDecodeUserInfo: {
    url: '/user/decodeUserInfo',
    method: 'post'
  },
  cityFindCityItems: {
    url: '/city/findCityItems',
    method: 'post'
  },
  projectApiFindProjectInfoById:{     //详情-获取项目信息
    url: '/projectApi/findProjectInfoById',
    method:'post'
  },
  projectApiFindProjectDetailsById: {   //详情-获取项目详情
    url: '/projectApi/findProjectDetailsById',
    method: 'post'
  },
  projectApiFindProjectHouserholdListById: {    //详情-获取户型列表
    url: '/projectApi/findProjectHouserholdListById',
    method: 'post'
  },
  projectApiFindProjectHouserholdFileListById: {  //详情-获取户型图片列表
    url: '/projectApi/findProjectHouserholdFileListById',
    method: 'post'
  },
  
}
const ApiSetting = { ...serviceModule }

export default ApiSetting
