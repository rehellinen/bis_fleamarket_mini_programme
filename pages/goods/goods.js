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

  // flag为true时重新加载数据
  _loadGoods(flag){
    let index = this.data.tabIndex
    if(index == 0){
      // 获取在售商品
      goods.getGoods(this.data.page[index], (res) => {
        this.data.photoCount += res.length
        if (flag) {
          this.data.goods[index] = res
        } else {
          this.data.goods[index].push.apply(this.data.goods[index], res)
        }
        this.setData({
          goods: this.data.goods,
        })
      }, (res) => {
        this.data.hasMore[index] = false
        this.setData({
          loadingHidden: true
        })
      }) 
    }else{
      // 获取下架商品
      goods.getDownedGoods(this.data.page[index], (res) => {
        if (flag) {
          this.data.goods[index] = res
        } else {
          this.data.goods[index].push.apply(this.data.goods[index], res)
        }
        this.setData({
          goods: this.data.goods,
        })
      }, (res) => {
        this.data.hasMore[index] = false
        this.setData({
          loadingHidden: true
        })
      } )
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
  }
})