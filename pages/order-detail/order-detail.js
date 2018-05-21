import { OrderModel } from '../../model/OrderModel.js'
import { Image } from '../../utils/image.js'
let order = new OrderModel()

Page({
  data: {
    loadingHidden: false,
  },

  onLoad: function (options) {
    let id = options.id
    let type = options.type
    this.image = new Image(this)
    this.image.setLoadingHidden()  

    order.getOrderByID(id, type, (res) => {
      this.image.addPhotosCount(res.snap_items.length)
      this.setData({
        order: res
      })
    })
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

  isLoadedAll(event) {
    this.image.isLoadedAll()
  }
})