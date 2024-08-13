import User from './definitions/User.mjs'
import { Op } from 'sequelize';

class UserModel {
    //used when signing up to make sure no duplicate entries are made
    static async findUser(username, email) {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: username }, { email: email }]
            }
        })

        return user;
    }

    // used when loggingg in to adapt whether the user enters an email or a username
    static async findByUsernameOrEmail(usernameOrEmail) {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
            }
        })
        return user;
    }
    
    static async create(user) {
        const createdUser = await User.create(user);
        return createdUser;
    } 

}

export default UserModel;