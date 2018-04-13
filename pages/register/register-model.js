import {Base} from '../../utils/base.js'

class RegisterModel extends Base{
  constructor(){
    super()
  }

  register(url, data, cb){
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
          }
        }

        that.request(params)
      }
    })
    
  }
}

export { RegisterModel }