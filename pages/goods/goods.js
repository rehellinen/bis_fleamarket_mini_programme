import {GoodsModel} from './goods-model.js'
let goods = new GoodsModel()
let app = getApp()

Page({
  data: {
    goods: [
      [], []
    ],
    hasMore: [true, true],
    loadingHidden: false,
    photoCount: 0,
    loadedPhoto: 0,
    tabIndex: 0,
    page: [1, 1]
  },

  onLoad: function (options) {
    this._loadGoods()    
  },

  onShow(){
    console.log(wx.getStorageSync('newGoods'))
    if (wx.getStorageSync('newGoods')){
      this._reload()
      wx.setStorageSync('newGoods', false)
    }
  },

  _loadGoods(cb){
    let index = this.data.tabIndex
    if(index == 0){
      // 获取在售商品
      goods.getGoods(this.data.page[index], (res) => {
        this.data.photoCount += res.length
        this.data.goods[index].push.apply(this.data.goods[index], res)
        this.setData({
          goods: this.data.goods,
        })
        cb && cb()
      }, (res) => {
        this.data.hasMore[index] = false
        this.setData({
          goods: this.data.goods,
          loadingHidden: true
        })
        cb && cb()
      }) 
    }else{
      // 获取下架商品
      goods.getDownedGoods(this.data.page[index], (res) => {
        this.data.goods[index].push.apply(this.data.goods[index], res)
        this.setData({
          goods: this.data.goods,
        })
        cb && cb()
      }, (res) => {
        this.data.hasMore[index] = false
        this.setData({
          goods: this.data.goods,
          loadingHidden: true
        })
        cb && cb()
      })
    }       
  },

  onReachBottom(event){
    let index = this.data.tabIndex
    if (this.data.hasMore[index]) {
      this.data.page[index]++
      this._loadGoods()
    }
  },

  switchTab(event) {
    let index = event.detail.index
    this.data.tabIndex = index
    if (this.data.goods[index].length == 0) {
      this._loadGoods()
    }
  },

  isLoadAll(event) {
    let that = this
    app.isLoadAll(that)
  },  

  // 恢复到初始状态
  _reload(cb){ 
    this.data.page = [1, 1]
    this.data.hasMore = [true, true]
    this.data.goods = [
      [], []
    ]    
    
    this._loadGoods(cb)    
  },

  //跳转到添加商品的页面
  toAdd(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goods-detail/goods-detail?id=0',
    })
  },

  onPullDownRefresh() {
    this._reload(() => {
      wx.stopPullDownRefresh()
    })
  }
})