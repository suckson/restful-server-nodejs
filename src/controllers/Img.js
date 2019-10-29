import cheerio from 'cheerio'
import model from '../tool/http.js'
import request from 'request'

const User = {
  name: '791076633@qq.com',
  password: 'chai1234'
}

export const getImgLocation = async (ctx, next) => {
  ctx.body = {
    accessImg: '<img src="https://www.xuesheji.me/index/index/checkverify.html" alt="" class="suckson-Img">'
  }
  next()
}
export const goImgLogin = async (ctx, next) => {
  const { ImgCode } = ctx.request.body // 获取post提交的数据
  console.log(ImgCode)
  // model.imgPageLogin(ImgCode, User.name, User.password).then(response => {
  //   console.log(response)
  // })
  const data = {
    username: User.name,
    password: User.password,
    vercode: ImgCode
  }
  request.post({
    url: 'http://www.xuesheji.me/index/index/login.html',
    headers: {
      'x-requested-with': 'XMLHttpRequest'
    },
    form: {
      username: User.name,
      password: User.password
    }
  }, function (error, response, body) {
    console.log(response)
  })
  ctx.body = {
    message: '获取令牌成功，请下一步'
  }
  next()
}
