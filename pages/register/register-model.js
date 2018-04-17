import {Base} from '../../utils/base.js'

class RegisterModel extends Base{
  constructor(){
    super()
  }

  register(url, data, cb, ecb){
    let that = this
    wx.login({
      success(res){
        data.code = res.code
        let params = {
          url: url,
          data: data,
          type: "POST",
          callBack(res){
            cb && cb(res)
          },
          eCallBack(res){
            ecb && ecb(res)
          }
        }

        that.request(params)
      }
    })    
  }

  getInfo(cb){
    let uid = wx.getStorageSync('uid')
    let url = ''
    if (wx.getStorageSync('type') == 'shop'){
      url = 'shop/'
    }else{
      url = 'seller/'
    }
    let params = {
      url: url + uid,
      callBack(res){
        cb && cb(res)
      }
    }
    this.request(params)
  }

  editInfo(url, data, cb, ecb) {
    let that = this
    wx.login({
      success(res) {
        data.code = res.code
        let params = {
          url: url,
          data: data,
          type: "POST",
          callBack(res) {
            cb && cb(res)
          },
          eCallBack(res) {
            ecb && ecb(res)
          }
        }

        that.request(params)
      }
    })
  }

  editImage(type, path, cb){
    wx.uploadFile({
      url: this.baseUrl + 'image',
      filePath: path,
      name: 'image',
      header: {
        token: wx.getStorageSync('token')
      },
      formData: {
        type: type
      },
      success(res){
        cb && cb(res)
      }
    })
  }
}

export { RegisterModel }