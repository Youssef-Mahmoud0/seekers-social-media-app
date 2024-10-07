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


    static async search(query) {
        try {
            const results = await User.findAll({
                where: {
                    name: {
                        [Op.startsWith]: `${query}`
                    }
                },
                limit: 8
            });
            return results;
        } catch (error) {
            console.error('Error during search:', error);
            throw new Error('Error during search operation');
        }
    };
    static async updateProfilePicture(userId, filePath) {
        const user = await User.findByPk(userId);
        user.profilePicture = filePath;
        await user.save();
    }

    static async updateBio(userId, bio) {
        const user = await User.findByPk(userId);
        user.bio = bio;
        await user.save();
    }

    static async getUserById(userId) {
        const user = await User.findByPk(userId, {
            attributes: ['userId', 'name', 'bio', 'profilePicture']
        });
        return user;
    }

}
    
export default UserModel;