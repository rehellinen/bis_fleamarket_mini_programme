import { RegisterModel } from './register-model.js'
let register = new RegisterModel()

Page({
  data: {
  
  },

  onLoad: function (options) {
    let str = ''
    if (options.type == 'shop'){
      str = '商 家'
    }else{
      str = '二 手 卖 家'
    }
    this.setData({
      type: str
    })
  },

  formSubmit(event){
    let data = event.detail.value
    let url = ''
    if (this.data.type == '商 家'){
      url = 'shop'
    }else{
      url = 'seller'
    }
    register.register(url, data, (res) => {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    })   
  }
})