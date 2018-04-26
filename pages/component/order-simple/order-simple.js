import {OrderModel} from '../../order/order-model.js'
let order = new OrderModel()

Component({
  properties: {
    order: Array
  },

  data: {

  },

  methods: {
    toWithdraw(event) {
      let status = event.currentTarget.dataset.status
      let id = event.currentTarget.dataset.id
      let that = this
      if (status == 4) {
        wx.showModal({
          content: '是否提现',
          success(res) {
            if(res.confirm){
              order.withdraw(id, () => {
                wx.showToast({
                  title: '发起提现成功',
                  icon: 'success'
                })
                that.triggerEvent('reload')
              })
            }
          }
        })
      }      
    }
  }
})
