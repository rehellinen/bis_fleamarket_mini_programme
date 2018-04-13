// pages/register/register.js
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
    console.log(event.detail.value)
  }
})