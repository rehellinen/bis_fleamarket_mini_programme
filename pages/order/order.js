import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()

Page({
  data: {
    page: 1,
    order: [],
    unpaid: [],
    paid: [],
    delivered: [],
    completed: [],
    hasMore: true,
    loadingHidden: false
  },

  onLoad: function (options) {
    this._loadOrder()
  },

  onShow(){
    let isHasNew = wx.getStorageSync('updateOrder')
    if(isHasNew){
      this.data.order = []
      this.data.unpaid = []
      this.data.paid = []
      this.data.delivered = []
      this.data.completed = []
      this._loadOrder()
      wx.setStorageSync('updateOrder', false)
    }
  },

  onReachBottom() {
    if (this.data.hasMore) {
      this.data.page++
      this._loadOrder()
    }
  },

  _loadOrder() {
    order.getOrder(this.data.page, (res) => {
      this.data.photoCount += res.length
      for (let i in res) {
        // 待付款
        if (res[i].status == 1) {
          this.data.unpaid.push(res[i])
        }// 待发货
        else if (res[i].status == 2) {
          this.data.paid.push(res[i])
        }// 待收货
        else if (res[i].status == 3) {
          this.data.delivered.push(res[i])
        }// 已完成
        else if (res[i].status == 5) {
          this.data.completed.push(res[i])
        }
      }
      this.data.order.push.apply(this.data.order, res)
      this.setData({
        order: this.data.order,
        unpaid: this.data.unpaid,
        paid: this.data.paid,
        delivered: this.data.delivered,
        completed: this.data.completed
      })
    }, (res) => {
      this.data.hasMore = false
    })
  }
})