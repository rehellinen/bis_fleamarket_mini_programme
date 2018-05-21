import {GoodsModel} from '../../model/GoodsModel.js'
let goods = new GoodsModel()

Page({
  data: {
    imageUrl: ''
  },

  onLoad: function (options) {
    let id = options.id
    let url = 'oldGoods/'
    if(wx.getStorageSync('type') == 'shop'){
      url = 'newGoods/'
    }

    // id为0表示修改
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

  // 上传图片
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
      // 修改商品信息
      data.id = this.data.id
      goods.editGoods(data, (res) => {
        wx.setStorageSync('newGoods', true)
        wx.showModal({
          title: '成功',
          content: '修改商品信息成功',
          showCancel: false,
          success() {
            wx.navigateBack({})            
          }          
        })
      }, (res) => {
        wx.showModal({
          title: '失败',
          showCancel: false,
          content: res.message
        })
      })
    }else{
      // 添加商品
      goods.addGoods(data, (res) => {
        wx.setStorageSync('newGoods', true)
        wx.showModal({
          title: '成功',
          showCancel: false,
          content: '添加商品成功',
          success() {
            wx.navigateBack({})
          }
        })
      }, (res) => {
        wx.showModal({
          title: '失败',
          showCancel: false,
          content: res.message
        })
      })
    }    
  }
})