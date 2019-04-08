//接口地址
// 测试地址
const url = 'http://39.98.191.16/zhwx-api'

let $httpServer = function (opts, data) {
  let promise = new Promise(function (resolve, reject) {
    return wx.request({
      url: url + opts.url,
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: opts.method,
      success(res) {
        resolve(res.data)
      },
      fail(error) {
        reject(error)
      }
    })
  })
  return promise
}

export default $httpServer