import {OrderModel} from '../../model/OrderModel.js'
let order = new OrderModel()

Page({
  data: {

  },

  onLoad: function (options) {
    order.getPrice( (res) => {
      this.setData({
        price: res
      })
    })
  },

  toOrderWithdraw(event){
    wx.navigateTo({
      url: '/pages/order-withdraw/order-withdraw',
    })
  }  
})