import {GoodsModel} from '../goods/goods-model.js'
let goods = new GoodsModel()

Page({
  data: {
    imageUrl: '/images/theme/photo.png'
  },

  onLoad: function (options) {
    let id = options.id
    let url = 'oldGoods/'
    if(wx.getStorageSync('type') == 'shop'){
      url = 'newGoods/'
    }
    if(id != 0){
      // 加载数据
      goods.getGoodsDetail(url + id, (res) => {
        this.setData({
          id: id,
          info: res,
          imageUrl: res.image_id.image_url,
          imageID: res.image_id.id
        })
      })
    }
  },

  uploadImage(event){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success(res) {
        wx.uploadFile({
          url: goods.baseUrl + 'image/goods',
          filePath: res.tempFilePaths[0],
          name: 'image',
          header: {
            token: wx.getStorageSync('token')
          },
          success(data) {
            let jsonData = JSON.parse(data.data)
            that.setData({
              imageID: jsonData.data.image_id,
              imageUrl: res.tempFilePaths[0]
            })
          }
        })        
      }
    })
  },

  submit(event){
    let data = event.detail.value
    data.image_id = this.data.imageID
    if(this.data.id){
      data.id = this.data.id
      goods.editGoods(data, (res) => {
        wx.showModal({
          title: '成功',
          content: '修改商品信息成功',
          success() {
            wx.navigateBack({})
          }
        })
      }, (res) => {
        wx.showModal({
          title: '失败',
          content: res.message
        })
      })
    }else{
      goods.addGoods(data, (res) => {
        wx.showModal({
          title: '成功',
          content: '添加商品成功',
          success() {
            wx.navigateBack({})
          }
        })
      }, (res) => {
        wx.showModal({
          title: '失败',
          content: res.message
        })
      })
    }    
  }
})