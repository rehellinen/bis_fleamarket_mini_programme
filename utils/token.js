import { Config } from './config.js'

class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'token/verify'
    this.tokenUrl = Config.restUrl + 'token/seller'
    this.openidUrl = Config.restUrl + 'token/openid'
  }

  // 从服务器获取Token
  getTokenFromServer(cb) {
    let that = this
    wx.login({
      success(res) {
        wx.request({
          url: that.tokenUrl,
          method: "POST",
          data: {
            code: res.code
          },
          success(res) {
            if(res.statusCode  === 200){
              // 处理用户已注册的情况
              wx.setStorageSync('uid', res.data.data.id)
              wx.setStorageSync('token', res.data.data.token)
              wx.setStorageSync('type', res.data.data.type)
              wx.setStorageSync('status', res.data.data.status)
            }else{
              // 处理用户未注册的情况
            }            
            cb && cb(res)
          }
        })
      }
    })
  }  

  // 判断OpenID是否存在
  verifyOpenID() {
    let that = this
    wx.login({
      success(res) {
        wx.request({
          url: that.openidUrl,
          method: "POST",
          data: {
            code: res.code
          },
          success(res) {            
            if (res.statusCode == 404) {
              // 处理用户未注册的情况
              wx.redirectTo({
                url: '/pages/welcome/welcome',
              })
            }else{
              // 处理用户已注册的情况
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }
          }
        })
      }
    })
  }
}

export { Token }