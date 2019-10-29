import Sequelize from 'sequelize'
import { defineModel } from '../lib/sequelize'
import SequelizeValue from 'sequelize-values';

SequelizeValue(Sequelize);

export default defineModel('user', {
  id: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: Sequelize.STRING(100),
  user_code: Sequelize.STRING(100),
  password: Sequelize.STRING(100),
  mobile: Sequelize.STRING(50),
  gender: Sequelize.BOOLEAN(0, 1), // 0：男，1：女
  province: Sequelize.STRING(10),
  city: Sequelize.STRING(10),
  erea_name: Sequelize.STRING(50),
  nick_neme: Sequelize.STRING(100),
  user_state: Sequelize.STRING, // 开启，关闭
  user_gorunp: {
    type: Sequelize.ENUM,
    allowNull: true,
    values: ['active', 'pending', 'deleted']
  },
  start_date: Sequelize.DATE(),
  end_date: Sequelize.DATE()
})
