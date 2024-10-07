import UserModel from '../models/userModel.mjs';
class userService {
    static async search(query) {
        const results = await UserModel.search(query);
        return results;
    }
    static async updateProfilePicture(userId, filePath) {
        await UserModel.updateProfilePicture(userId, filePath);
    }
    static async updateBio(userId, bio) {
        await UserModel.updateBio(userId, bio);
    }
    static async getUserById(userId){
        const user = await UserModel.getUserById(userId);
        return user;
   }

}
export default userService;