import { RegisterModel } from './register-model.js'
let register = new RegisterModel()

Page({
  data: {
  
  },

  onLoad: function (options) {
    let str = ''
    let operation = ''
    let major = false
    // 根据跳转页面时传入的参数判断是商家还是二手卖家
    if (options.type == 'shop'){
      str = '注 册 商 家'
      major = true
    }else{
      str = '注 册 二 手 卖 家'
    }

    // 根据缓存中有无token判断是申请还是修改信息
    if (wx.getStorageSync('token')){
      operation = '修 改 信 息'
      register.getInfo( (res) => {
        this.setData({
          info: res
        })
      })
    }
    this.setData({
      type: str,
      operation: operation,
      major: major
    })
  },

  formSubmit(event){
    let data = event.detail.value
    let url = ''
    
    if (wx.getStorageSync('token')){
      if (wx.getStorageSync('type') == 'shop') {
        url = 'shop'
      } else {
        url = 'seller'
      }
      register.editInfo(url, data, (res) => {
        wx.showModal({
          title: '成功',
          content: '修改信息成功',
          showCancel: false,
          success(res) {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        })
      }, (res) => {
        wx.showModal({
          title: '',
          content: res.message,
          showCancel: false
        })
      })
    }else{
      if (this.data.type == '注 册 商 家') {
        url = 'shop'
      }else{
        url = 'seller'
      }
      register.register(url, data, (res) => {
        wx.showModal({
          title: '成功',
          content: '注册成功',
          showCancel: false,
          success(res) {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        })
      }, (res) => {
        wx.showModal({
          title: '',
          content: res.message,
          showCancel: false
        })
      })   
    }    
  }
})