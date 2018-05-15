export class Image {
  constructor(){
    // 设置加载图标的隐藏时间
    this.loadingHiddenTime = 1000    
  }

  // 判断图片是否全部加载
  isLoadedAll(that) {
    that.data.loadedPhoto++
    if (that.data.loadedPhoto == that.data.photoCount) {
      that.setData({
        loadingHidden: true
      })
    }
  }

  // 加载图标的隐藏
  setLoadingHidden(that) {
    setTimeout(() => {
      that.setData({
        loadingHidden: true
      })
    }, this.loadingHiddenTime)
  }
}