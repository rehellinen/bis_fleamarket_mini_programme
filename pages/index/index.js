// pages/index/index.js
Page({
  data: {
  
  },

  onLoad: function (options) {
  
  },

  toSetting(event){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },

  toGoods(event) {
    wx.navigateTo({
      url: '/pages/goods/goods',
    })
  },

  toOrder(event) {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },

  toIncome(event) {
    wx.navigateTo({
      url: '/pages/income/income',
    })
  },

  toDecoration(event) {
    wx.navigateTo({
      url: '/pages/decoration/decoration',
    })
  },
})