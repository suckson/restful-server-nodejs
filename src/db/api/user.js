import userModel from '../models/userModel'

const userDB = {
    CreatUser: (...arg) => {
       let args = arg[0]
       return userModel.findOrCreate({where: args})
    },
    findOne: (mobile) => {
         console.log(mobile)
         return userModel.findOne({where:{mobile: mobile},raw: true})
    }
}

export default userDB