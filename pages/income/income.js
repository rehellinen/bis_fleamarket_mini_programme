Page({
  data: {

  },

  onLoad: function (options) {
    
  },

  toOrderWithdraw(event){
    wx.navigateTo({
      url: '/pages/order-withdraw/order-withdraw',
    })
  }
})