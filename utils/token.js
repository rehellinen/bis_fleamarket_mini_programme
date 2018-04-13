import { Config } from './config.js'

class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'token/verify'
    this.tokenUrl = Config.restUrl + 'token/seller'
    this.openidUrl = Config.restUrl + 'token/openid'
  }

  verify() {
    let token = wx.getStorageSync('token')
    if (!token) {
      this.getTokenFromServer()
    } else {
      this._verifyFromServer(token)
    }
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
            wx.setStorageSync('token', res.data.data.token)
            cb && cb(res)
          }
        })
      }
    })
  }

  // 验证Token是否有效
  _verifyFromServer(token) {
    let that = this
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success(res) {
        let valid = res.data.data.isValid
        if (!valid) {
          that.getTokenFromServer()
        }
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