import KoaRouter from 'koa-router'
import Controllers from '../controllers'

const router = new KoaRouter()

export default router
  .all('/upload', Controllers.Upload)
  .post('/register', Controllers.User.Register)
  .post('/login', Controllers.User.Login)
  .post('/public/img', Controllers.Img.getImgLocation) // 千图网信息
  .post('/public/imglogin', Controllers.Img.goImgLogin)
