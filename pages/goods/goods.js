import {GoodsModel} from '../../model/GoodsModel.js'
import {Image} from '../../utils/image.js'
let goods = new GoodsModel()

Page({
  data: {
    goods: [
      [], []
    ],
    hasMore: [true, true],
    loadingHidden: false,
    tabIndex: 0,
    page: [1, 1]
  },

  onLoad: function (options) {
    this.image = new Image(this)
    this.image.setLoadingHidden()   

    this._loadGoods()     
  },

  onShow(){    
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
        this.image.addPhotosCount(res.length)
        this.data.goods[index].push.apply(this.data.goods[index], res)
        this.setData({
          goods: this.data.goods,
        })
        wx.stopPullDownRefresh()
      }, (res) => {
        this.data.hasMore[index] = false
        this.setData({
          goods: this.data.goods,
          loadingHidden: true
        })
        wx.stopPullDownRefresh()
      }) 
    }else{
      // 获取下架商品
      goods.getDownedGoods(this.data.page[index], (res) => {
        this.data.goods[index].push.apply(this.data.goods[index], res)
        this.setData({
          goods: this.data.goods,
        })
        wx.stopPullDownRefresh()
      }, (res) => {
        this.data.hasMore[index] = false
        this.setData({
          goods: this.data.goods,
          loadingHidden: true
        })
        wx.stopPullDownRefresh()
      })
    }       
  },

  // 滑到底部加载下一页
  onReachBottom(event){
    let index = this.data.tabIndex
    if (this.data.hasMore[index]) {
      this.data.page[index]++
      this._loadGoods()
    }
  },

  // 切换Tab栏
  switchTab(event) {
    let index = event.detail.index
    this.data.tabIndex = index
    if (this.data.goods[index].length == 0) {
      this._loadGoods()
    }
  },

  // 判断图片是否全部加载
  isLoadedAll() {    
    this.image.isLoadedAll()
  },  

  // 恢复到初始状态
  _reload(){ 
    this.data.page = [1, 1]
    this.data.hasMore = [true, true]
    this.data.goods = [
      [], []
    ]    
    
    this._loadGoods()    
  },

  //跳转到添加商品的页面
  toAdd(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goods-detail/goods-detail?id=0',
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this._reload()
  }
})