import { Base } from '../../utils/base.js'

class OrderModel extends Base {
  constructor() {
    super()
    this.key = 'newOrder'
  }  

  // 获取订单
  getOrder(status, page, cb, ecb) {
    let params = {
      url: 'order/' + status,
      callBack(res) {
        cb && cb(res)
      },
      eCallBack(res) {
        ecb && ecb(res)
      },
      data: {
        page: page,
        size: 12
      }
    }
    this.request(params)
  }

  // 根据订单ID获取详细信息
  getOrderByID(id, type, cb) {
    let params = {
      url: 'order/' + id + '/' + type,
      callBack(res) {
        cb && cb(res)
      }
    }
    this.request(params)
  }

  // 发货
  deliver(id, cb){
    let params = {
      url: 'order/deliver/' + id,
      type: "POST",
      callBack(res) {
        cb && cb(res)
      }
    }
    this.request(params)
  }

  // 发起提现
  withdraw(id, cb){
    let params = {
      url: 'order/withdraw/' + id,
      type: "POST",
      callBack(res) {
        cb && cb(res)
      }
    }
    this.request(params)
  }

  // 获取价格信息
  getPrice(cb){
    let params = {
      url: 'order/price',
      callBack(res) {
        cb && cb(res)
      }
    }
    this.request(params)
  }
}

export { OrderModel }