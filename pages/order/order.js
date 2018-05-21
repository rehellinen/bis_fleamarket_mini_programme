import { OrderModel } from '../../model/OrderModel.js'
import { Image } from '../../utils/image.js'
let order = new OrderModel()
let app = getApp()

Page({
  data: {
    order: [
      [], [], [], []
    ],
    hasMore: [true, true, true, true],
    loadingHidden: false,
    tabIndex: 0,
    page: [1, 1, 1, 1]
  },

  onLoad: function (options) {    
    this.image = new Image(this)
    this.image.setLoadingHidden()   

    this._loadOrder()
  },

  onShow(){
    if (wx.getStorageSync('newOrder')) {
      this.reload(true)
      wx.setStorageSync('newOrder', false)
    }
  },

  onReachBottom() {
    let index = this.data.tabIndex
    if (this.data.hasMore[index]) {
      this.data.page[index]++
      this._loadOrder()
    }
  },

  reload() {
    this.data.order = [
      [], [], [], []
    ],
    this.data.hasMore = [true, true, true, true],
    this.data.page = [1, 1, 1, 1]

    this._loadOrder()    
  },
  
  _loadOrder() {
    let status
    let index = this.data.tabIndex
    
    if(index === 0){
      status = 1
    }else if(index === 1){
      status = 2
    }else if(index === 2){
      status = 3
    }else if(index === 3){
      status = -2
    }

    order.getOrder(status, this.data.page[index], (res) => {
      this.image.addPhotosCount(res.length)
      this.data.order[index].push.apply(this.data.order[index], res)
      this.setData({
        order: this.data.order
      })
      wx.stopPullDownRefresh()
    }, (res) => {
      this.data.hasMore[index] = false
      this.setData({
        order: this.data.order,
        loadingHidden: true
      })
      wx.stopPullDownRefresh()
    })
  },

  isLoadedAll(event) {
    this.image.isLoadedAll()
  },

  switchTab(event) {
    let index = event.detail.index
    this.data.tabIndex = index
    if (this.data.order[index].length == 0) {
      this._loadOrder()
    }
  },

  onPullDownRefresh() {
    this.reload()
  }
})