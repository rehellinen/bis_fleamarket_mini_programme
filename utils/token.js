import { Config } from './config.js'

class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'token/verify'
    this.tokenUrl = Config.restUrl + 'token/seller'
    this.openidUrl = Config.restUrl + 'token/openid'
  }

  // 检验Token令牌主方法
  verify() {
    let token = wx.getStorageSync('token')
    let status = wx.getStorageSync('status')

    // token不存在或者status不为1时，重新申请令牌
    if (token && status === 1) {
      this._verifyFromServer(token)      
    } else {
      this.getTokenFromServer()
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
            if(res.statusCode  === 200){
              // 处理用户已注册的情况
              wx.setStorageSync('uid', res.data.data.uid)
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