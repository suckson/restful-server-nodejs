import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
const userModel = require('../models/userModel.js')

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

// 用户登录的时候返回token
const token = jwt.sign({
  userInfo: 123 // 你要保存到token的数据
}, publicKey, { expiresIn: '7d' })

/**
 * 检查授权是否合法
 */
const CheckAuth = (ctx, next) => {
  const token = ctx.request.header.authorization
  console.log(token)
  try {
    const decoded = jwt.verify(token.substr(7), publicKey)
    if (decoded.userInfo) {
      return {
        status: 1,
        result: decoded.userInfo
      }
    } else {
      return {
        status: 403,
        result: {
          errInfo: '没有授权'
        }
      }
    }
  } catch (err) {
    return {
      status: 503,
      result: {
        errInfo: '解密错误'
      }
    }
  }
}

export const Login = (ctx, next) => {
  const data = ctx.request.body
  if (!data.name || !data.password) {
    return ctx.body = {
      code: '000002',
      data: null,
      msg: '参数不合法'
    }
  }
  const token = jwt.sign({ name: result.name, _id: result._id }, publicKey, { expiresIn: '2h' })
  return ctx.body = {
    code: '000001',
    data: token,
    msg: '登录成功'
  }
}

export const Post = (ctx, next) => {
  console.log(ctx.params.action)
  switch (ctx.params.action) {
    case 'check':
      return CheckAuth(ctx).then(result => { ctx.body = result; next() })
    case '/login':
      return Login()
    default:
      return CheckAuth(ctx).then(result => { ctx.body = result; next() })
  }
}
