import { Base } from '../../utils/base.js'

class OrderModel extends Base {
  constructor() {
    super()
    this.key = 'newOrder'
  }  

  // 获取订单
  getOrder(page, cb, ecb) {
    let params = {
      url: 'order/sellerShop',
      callBack(res) {
        cb && cb(res)
      },
      eCallBack(res) {
        ecb && ecb(res)
      },
      data: {
        page: page
      }
    }
    this.request(params)
  }

  // 根据订单ID获取详细信息
  getOrderByID(id, cb) {
    let params = {
      url: 'order/' + id,
      callBack(res) {
        cb && cb(res)
      }
    }
    this.request(params)
  }
}

export { OrderModel }