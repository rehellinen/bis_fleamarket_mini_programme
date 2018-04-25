Page({
  data: {

  },

  onLoad: function (options) {
    
  },

  toOrderWithdraw(event){
    let type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/order-withdraw/order-withdraw?type=' + type,
    })
  }
})