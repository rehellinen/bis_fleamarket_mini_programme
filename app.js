import { Token } from './utils/token.js'

App({
  onLaunch(){
    // 检验Token令牌
    let token = new Token
    token.verifyOpenID()

    // 设置加载图标的隐藏时间
    this.loadingHiddenTime = 1000    
  },

  isLoadAll(that) {
    that.data.loadedPhoto++
    if (that.data.loadedPhoto == that.data.photoCount) {
      that.setData({
        loadingHidden: true
      })
    }
    setTimeout(() => {
      that.setData({
        loadingHidden: true
      })
    }, this.loadingHiddenTime)
  }
})