let app = getApp()

Component({
  properties: {
    goods: Array,
    type: Number
  },

  data: {

  },

  methods: {
    loaded(event) {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('loaded', myEventDetail, myEventOption)
    }
  }
})
