import Sequelize from 'sequelize'
import todolist from '../models/userModel'
import { sequelize } from '../lib/sequelize.js'
import fs from 'fs'
import path from 'path'

var files = fs.readdirSync(path.resolve(__dirname + '/' + '../models'), { encoding: 'utf8' })

console.log(files)

var js_files = files.filter((f) => {
  return f.endsWith('.js')
}, files)

console.log(js_files)

module.exports = {}

for (var f of js_files) {
  console.log(`import model from file ${f}...`)
  var name = f.substring(0, f.length - 3)
  module.exports[name] = require(path.resolve(__dirname + '/../' + 'models') + '/' + f)
}

sequelize.sync() // 同步表结构
