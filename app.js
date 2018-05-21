import { Token } from './utils/token.js'

App({
  onLaunch(){
    let token = new Token
    // 检验openID是否存在
    // token.verifyOpenID()
    // 检验Token令牌
    token.getTokenFromServer()
  }
})