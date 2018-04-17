import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()

Page({
  data: {
  
  },

  onLoad: function (options) {
    let id = options.id
    let type = options.type
    order.getOrderByID(id, type, (res) => {
      // this.data.photoCount += res.snap_items.length
      if (type == 1) {
        res.seller = res.shop
      }
      this.setData({
        order: res
      })
    })
  },

  deliver(event){
    let id = event.currentTarget.dataset.id
    let that = this
    wx.showModal({
      title: '确认发货',
      content: '是否确认发货?',
      success(){
        order.deliver(id, (res) => {
          that.data.order.status = 3
          that.setData({
            order: that.data.order
          })
          wx.setStorageSync('updateOrder', true)
          wx.showModal({
            title: '成功',
            content: '发货成功',
            showCancel:false,
            success(){
              
            }
          })
        })
      }
    })
  }
})