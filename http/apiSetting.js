const serviceModule = {
  userDecodeUserInfo: {
    url: '/user/decodeUserInfo',
    method: 'post'
  },
  cityFindCityItems: {
    url: '/city/findCityItems',
    method: 'post'
  },
}
const ApiSetting = { ...serviceModule }

export default ApiSetting
