import { RegisterModel } from '../register/register-model.js'
let register = new RegisterModel()

Page({
  data: {
    avatar: '',
    back: '',
    avatarNew: false,
    backNew: false
  },

  onLoad: function (options) {
    register.getInfo((res) => {
      this.setData({
        avatar: res.avatar_image_id.image_url,
        back: res.top_image_id.image_url,
        info: res
      })
    })
  },

  uploadImage(event){
    let that = this
    let type = event.currentTarget.dataset.type

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success(res){
        if (type == 'avatar'){
          that.setData({
            avatar: res.tempFilePaths[0],
            avatarNew: true
          })
        }else{
          that.setData({
            back: res.tempFilePaths[0],
            backNew: true
          })
        }        
      }
    })
  },

  submit(event){
    if (this.data.avatarNew){
      register.editImage('avatar_image_id', this.data.avatar, (res) => {
        if(res.statusCode == 200){
          wx.showToast({
            title: '修改成功!',
            icon: 'success'
          })
        }else{
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        }
      })
    }
    if (this.data.backNew) {
      register.editImage('top_image_id', this.data.back, (res) => {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '修改成功!',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        }
      })
    }
  }
})