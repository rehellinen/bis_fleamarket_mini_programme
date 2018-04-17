import { Base } from '../../utils/base.js'

class GoodsModel extends Base {
  constructor() {
    super()
  }

  getGoods(page, cb, ecb) {
    let url = ''
    if(wx.getStorageSync('type') == 'shop'){
      url = 'newGoods/shop/' + wx.getStorageSync('uid')
    }else{
      url = 'oldGoods/seller/' + wx.getStorageSync('uid')
    }
    let params = {
      url: url,
      data: {
        page,
        size: 12
      },
      callBack(res) {
        cb && cb(res)
      },
      eCallBack(res) {
        ecb && ecb(res)
      }
    }

    this.request(params)
  } 

  // 获取下架商品
  getDownedGoods(page, cb, ecb) {   
    let params = {
      url: 'goods/downed',
      data: {
        page,
        size: 12
      },
      callBack(res) {
        cb && cb(res)
      },
      eCallBack(res) {
        ecb && ecb(res)
      }
    }

    this.request(params)
  }

  addGoods(data, cb, ecb){
    console.log(data)
    let params = {
      url: 'goods',
      type: 'POST',
      data,
      callBack(res) {
        cb && cb(res)
      },
      eCallBack(res) {
        ecb && ecb(res)
      }
    }
    this.request(params)
  }

  // 获取自营商品详情
  getGoodsDetail(url, cb) {
    let params = {
      url: url,
      callBack: function (data) {
        cb && cb(data);
      }
    }
    this.request(params)
  }
}

export { GoodsModel }