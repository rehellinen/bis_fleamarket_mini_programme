// pages/component/goods-list/goods-list.js
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
    }
  }
})
