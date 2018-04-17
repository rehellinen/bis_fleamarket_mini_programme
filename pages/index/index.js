import { Token } from '../../utils/token.js'
let token = new Token()

Page({
  data: {
    
  },

  onLoad: function (options) {
    token.verify( () => {
      let type = wx.getStorageSync('type')
      this.setData({
        type: type
      })
    })
  },

  toSetting(event){
    let type = wx.getStorageSync('type')
    wx.navigateTo({
      url: '/pages/register/register?type=' + type,
    })
  },

  toGoods(event) {
    wx.navigateTo({
      url: '/pages/goods/goods',
    })
  },

  toOrder(event) {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },

  toIncome(event) {
    wx.navigateTo({
      url: '/pages/income/income',
    })
  },

  toDecoration(event) {
    wx.navigateTo({
      url: '/pages/decoration/decoration',
    })
  },
})