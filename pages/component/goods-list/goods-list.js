import { GoodsModel } from '../../goods/goods-model.js'
let goods = new GoodsModel()

Component({
  properties: {
    goods: Array
  },

  data: {

  },

  methods: {
    toDetail(event){
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/goods-detail/goods-detail?id=' + id,
      })
    },

    loaded(event){
      this.triggerEvent('loaded')
    },

    status(event){
      let id = event.currentTarget.dataset.id
      let status = event.currentTarget.dataset.status
      let str = '下架'
      if(status == 1){
        str = '上架'
      }
      let that = this
      wx.showModal({
        content: '是否' + str + '此商品',
        success(res){
          if(res.confirm){
            goods.updateGoodsStatus(id, status, (res) => {
              that.triggerEvent('reload')
              wx.showToast({
                title: '成功' + str + '!',
              })
            })
          }          
        }
      })     
    }
  }
})
