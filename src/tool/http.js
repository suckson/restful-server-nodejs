import axios from 'axios'
import $ from 'jquery'
// import { getToken, getEpoch } from '@/utils/auth2'

// create an axios instance
var SERVERURL = 'https://www.xuesheji.me'
// Util handleRestquest

var request = axios.create({
  baseURL: SERVERURL,
  headers: {
    'x-requested-with': 'XMLHttpRequest',
    Origin: 'chrome-extension://aejoelaoggembcahagimdiliamlcdmfm',
    'Sec-Fetch-Mode': 'cors',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
    'Sec-Fetch-Site': 'cross-site'
  }
})

function creatError (code, msg) {
  const err = new Error(msg)
  err.code = code
  return err
}

function handleRestquest (request) {
  return new Promise(function (resolve, reject) {
    request.then(function (resp) {
      var data = resp.data
      console.log(resp)
      if (!data) {
        return reject(creatError(400, 'no data'))
      }
      if (!data) {
        return reject(creatError(400, data.message))
      }
      resolve(data)
    }).catch(function (err) {
      var resp = err.response
      console.log(err)
      if (resp.status === 401) {
        reject(creatError(401, 'need auth'))
      }
      if (resp.status === 600) {
        console.log('登录已过期')
      }
    })
  })
}

export default {
  imgPageLogin (AccessCode, userName, passWord) {
    var params = new URLSearchParams()
    params.append('username', userName)
    params.append('password', passWord)
    params.append('vercode', AccessCode)
    return handleRestquest(request.post('/index/index/login.html', params))
  }
}
