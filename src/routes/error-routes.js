module.exports = function () {
  return function (ctx, next) {
    switch (ctx.status) {
      case 404:
        ctx.status = 404
        ctx.body = {
          statusCode: 404,
          message: '没有找到相关路径',
          suceess: false
        }
        break
    }
    return next()
  }
}
