// pages/welcome/welcome.js
Page({
  data: {
  
  },

  onLoad: function (options) {

  },

  toRegister(event){
    let type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/register/register?type=' + type,
    })
  }
})