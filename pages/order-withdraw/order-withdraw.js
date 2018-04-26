import { OrderModel } from '../order/order-model.js'
let order = new OrderModel()

Page({
  data: {
    order: [
      [], [], [], [], []
    ],
    hasMore: [true, true, true, true, true],
    tabIndex: 0,
    page: [1, 1, 1, 1, 1]
  },

  onLoad: function (options) {
    this._loadOrder()
  },

  onShow() {
    if (wx.getStorageSync('newOrder')) {
      this.reload(true)
      wx.setStorageSync('newOrder', false)
    }
  },

  _loadOrder() {
    let index = this.data.tabIndex
    let status = index
    if (index == 0) {
      status = -2
    } else if (index == 1) {
      status = 4
    } else if (index == 2) {
      status = 6
    } else {
      status = 7
    }
    order.getOrder(status, this.data.page[index], (res) => {
      this.data.photoCount += res.length
      this.data.order[index].push.apply(this.data.order[index], res)
      this.setData({
        order: this.data.order
      })
    }, (res) => {
      this.data.hasMore[index] = false
      this.setData({
        order: this.data.order,
        loadingHidden: true
      })
    })
  },

  reload(event) {
    this.data.order = [
      [], [], [], [], []
    ]
    this.data.hasMore = [true, true, true, true, true]
    this.data.page = [1, 1, 1, 1, 1]

    this._loadOrder()
  },

  switchTab(event) {
    let index = event.detail.index
    this.data.tabIndex = index
    if (this.data.order[index].length == 0) {
      this._loadOrder()
    }
  },

  onReachBottom() {
    let index = this.data.tabIndex
    if (this.data.hasMore[index]) {
      this.data.page[index]++
      this._loadOrder()
    }
  },
})