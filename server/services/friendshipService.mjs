import FriendshipModel from '../models/friendshipModel.mjs';
import { FriendshipStatus } from '../constants/friendshipStatus.mjs';

class FriendshipService {

    static async sendFriendRequest(userId, friendId) {
        const friendshipInfo = await FriendshipModel.getFriendshipInfo(userId, friendId);
        if (friendshipInfo) {
            if(friendshipInfo.status === FriendshipStatus.PENDING) {
                throw new Error('Friend request already sent');
            }
            if(friendshipInfo.status === FriendshipStatus.ACCEPTED) {
                throw new Error('You are already friends');
            }
        }

        const result = await FriendshipModel.sendFriendRequest(userId, friendId);
        if (result.affectedRows === 0) {
            throw new Error('Friend request not sent');
        }
    }

    static async cancelFriendRequest(userId, friendId) {
        const friendshipInfo = await FriendshipModel.getFriendshipInfo(userId, friendId);
        if (!friendshipInfo || friendshipInfo.status !== FriendshipStatus.PENDING) {
            throw new Error('No pending friend request to cancel');
        }

        const result = await FriendshipModel.cancelFriendRequest(userId, friendId);
        if (result.affectedRows === 0) {
            throw new Error('Friend request not canceled');
        }
    }
    
    // userId is the one who recieved the friend request
    static async declineFriendRequest(userId, friendId) {
        const friendshipInfo = await FriendshipModel.getFriendshipInfo(userId, friendId);
        if (!friendshipInfo || friendshipInfo.status !== FriendshipStatus.PENDING) {
            throw new Error('No pending friend request to cancel');
        }

        const result = await FriendshipModel.declineFriendRequest(userId, friendId);
        if (result.affectedRows === 0) {
            throw new Error('Friend request not canceled');
        }
    }

    static async acceptFriendRequest(userId, friendId) {
        const friendshipInfo = await FriendshipModel.getFriendshipInfo(userId, friendId);
        if (!friendshipInfo || friendshipInfo.status !== FriendshipStatus.PENDING) {
            throw new Error('No pending friend request to accept');
        }

        const result = await FriendshipModel.acceptFriendRequest(userId, friendId);
        if (result.affectedRows === 0) {
            throw new Error('Friend request not accepted');
        }
    }

    static async unfriend(userId, friendId) {
        const friendshipInfo = await FriendshipModel.getFriendshipInfo(userId, friendId);
        if (!friendshipInfo || friendshipInfo.status !== FriendshipStatus.ACCEPTED) {
            throw new Error('Not friends');
        }

        const result = await FriendshipModel.unfriend(userId, friendId);
        if (result.affectedRows === 0) {
            throw new Error('Friend not removed');
        }
    }

    static async getFriendshipInfo(userId, friendId) {
        return await FriendshipModel.getFriendshipInfo(userId, friendId);
    }

    static async getFriends(userId) {
        return await FriendshipModel.getFriends(userId);
    }

}

export default FriendshipService;
