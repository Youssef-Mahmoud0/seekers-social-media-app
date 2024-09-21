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

}
export default userService;