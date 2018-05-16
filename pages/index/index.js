import {Token} from '../../utils/token.js'
let token = new Token()

Page({
  data: {
    isPass: false
  },

  onLoad: function (options) {
    let type = wx.getStorageSync('type')
    this.isPass()
    this.setData({
      type: type
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

  fresh(){
    token.getTokenFromServer( (res) => {
      this.isPass()
    })
  },

  isPass(){
    let status = wx.getStorageSync('status')

    // 判断商家是否通过审核
    if (status === 1) {
      this.setData({
        isPass: true
      })
    }    
  }
})