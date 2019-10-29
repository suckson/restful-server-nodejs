import Sequelize from 'sequelize'
import { DB as DBConfig, System as SystemConfig } from '../../config'

var sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
  host: DBConfig.host,
  dialect: SystemConfig.db_type,
  dialectOptions: { // MySQL > 5.5，其它数据库删除此项
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_520_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  query: { raw:true },
  pool: {
    max: 50,
    min: 0,
    idle: 10000
  }
})

const defineModel = function (name, attributes) {
  var attrs = {}
  for (const key in attributes) {
    const value = attributes[key]
    if (typeof value === 'object' && value.type) {
      value.allowNull = value.allowNull || false
      attrs[key] = value
    } else {
      attrs[key] = {
        type: value
        // allowNull: false
      }
    }
  }
  attrs.version = {
    type: Sequelize.BIGINT
    // allowNull: false
  }
  attrs.createUser = {
    type: Sequelize.STRING,
    allowNull: true
  }
  attrs.updateUser = {
    type: Sequelize.STRING,
    allowNull: true
  }
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: true,
    paranoid: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    hooks: {
      beforeBulkCreate: function (obj) {
        obj.version = 0
      },
      beforeValidate: function (obj) {
        if (obj.isNewRecord) {
          console.log('first')
          obj.version = 0
        } else {
          console.log('not first')
          obj.version = obj.version + 1
        }
      }
    }
  })
}

module.exports = {
  sequelize: sequelize,
  defineModel: defineModel
}
