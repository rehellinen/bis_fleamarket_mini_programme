import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()
let app = getApp()

Page({
  data: {
    loadingHidden: false,
    photoCount: 0,
    loadedPhoto: 0
  },

  onLoad: function (options) {
    let id = options.id
    let type = options.type
    order.getOrderByID(id, type, (res) => {
      this.data.photoCount += res.snap_items.length
      if (type == 1) {
        res.seller = res.shop
      }
      this.setData({
        order: res
      })
    })

    setTimeout(() => {
      this.setData({
        loadingHidden: true
      })
    }, 5000)
  },

  deliver(event) {
    let id = event.currentTarget.dataset.id
    let that = this
    wx.showModal({
      content: '是否确认发货',
      success(res) {
        if(res.confirm){
          order.deliver(id, (res) => {
            that.data.order.status = 3
            that.setData({
              order: that.data.order
            })
            wx.setStorageSync('newOrder', true)
            wx.showToast({
              title: '发货成功',
            })
          })
        }        
      }
    })
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  }
})