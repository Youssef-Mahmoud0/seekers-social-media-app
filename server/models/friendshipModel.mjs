import db from '../config/database.mjs';
import { FRIENDSHIP_STATUS } from '../constants/friendshipStatus.mjs';

class FriendshipModel {
    static async sendFriendRequest(userId, friendId) {
        const [result] = db.execute(
            `INSERT INTO friendships (userId, friendId) VALUES (?, ?, ?)`,
            [userId, friendId, FRIENDSHIP_STATUS.PENDING]
        );
        return result;
    }

    static async getFriendshipInfo(userId, friendId) {
        const [result] = db.execute(
            `SELECT * FROM friendships WHERE (userId = ? AND friendId =  ?) OR (userId = ? AND friendId = ?)`,
            [userId, friendId]
        );
        return result[0];
    }

    static async acceptFriendRequest(userId, friendId) {
        const [result] = db.execute(
            `UPDATE friendships SET status = ? WHERE userId = ? AND friendId = ?`,
            [FRIENDSHIP_STATUS.ACCEPTED, friendId, userId]  // must me reversed for the logic to work
        );
        return result;
    }

    static async unfriend(userId, friendId) {
        const [result] = db.execute(
            `DELETE FROM friendships WHERE (userId = ? AND friendId = ?) OR (userId = ? AND friendId = ?)`,
            [userId, friendId, friendId, userId]
        );
        return result;
    }

    static async cancelFriendRequest(userId, friendId) {
        const [result] = db.execute(
            `DELETE FROM friendships WHERE userId = ? AND friendId = ?`,
            [userId, friendId]
        );
        return result;
    }

    static async declineFriendRequest(userId, friendId) {
        const [result] = db.execute(
            `DELETE FROM friendships WHERE userId = ? AND friendId = ?`,
            [friendId, userId]
        );
        return result;
    }

    static async getFriends(userId) {
        const [result] = db.execute(
            `SELECT * FROM friendships WHERE (userId = ? OR friendId = ?) AND status = ?`,
            [userId, userId, FRIENDSHIP_STATUS.ACCEPTED]
        );
        return result;
    }
}



// user 1   ---> 
// user 2    OK

export default FriendshipModel;