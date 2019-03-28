//接口地址
const url = 'https://www.easy-mock.com/mock/5b39f9e442aef2399ae2333e'

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