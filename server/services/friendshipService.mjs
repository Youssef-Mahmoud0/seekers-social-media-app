import FriendshipModel from '../models/friendshipModel.mjs';
import { FRIENDSHIP_STATUS } from '../constants/friendshipStatus.mjs';

class FriendshipService {

    static async sendFriendRequest(userId, friendId) {
        // check if userId and friendId are the same
        if (userId === friendId)
            throw new Error('Cannot send friend request to yourself');

        // initiatorId is the one who sent the friend request (current userId)        
        const initiatorId = userId;

        // always store the smaller id first as userId1

        const smallerId = Math.min(userId, friendId);
        const largerId = Math.max(userId, friendId);

        const friendship = await FriendshipModel.sendFriendRequest(smallerId, largerId, initiatorId);
        const friendshipInfo = {
            status: friendship.status,
            initiatorId: friendship.initiatorId
        }
        return friendshipInfo;
    }

    // the one who sent the friend request is the one who cancel it
    static async cancelFriendRequest(userId, friendId) {

        const smallerId = Math.min(userId, friendId);
        const largerId = Math.max(userId, friendId);

        const friendship = await FriendshipModel.getFriendship(smallerId, largerId);
        if (!friendship || friendship.status !== FRIENDSHIP_STATUS.PENDING)
            throw new Error('No friend request to cancel');

        await FriendshipModel.cancelFriendRequest(friendship);
        return {}
    }

    static async acceptFriendRequest(userId, friendId) {

        const smallerId = Math.min(userId, friendId);
        const largerId = Math.max(userId, friendId);

        const friendship = await FriendshipModel.getFriendship(smallerId, largerId);
        if (!friendship || friendship.status !== FRIENDSHIP_STATUS.PENDING)
            throw new Error('No friend request to accept');

        if (userId === friendship.initiatorId) {
            throw new Error('Invalid Action. Cannot accept your own friend request');
        }

        await FriendshipModel.acceptFriendRequest(friendship);

        const friendshipInfo = {
            status: FRIENDSHIP_STATUS.ACCEPTED,
            initiatorId: friendship.initiatorId
        };
        return friendshipInfo;
    }

    static async unfriend(userId, friendId) {
        const smallerId = Math.min(userId, friendId);
        const largerId = Math.max(userId, friendId);

        const friendship = await FriendshipModel.getFriendship(smallerId, largerId);
        if (!friendship || friendship.status !== FRIENDSHIP_STATUS.ACCEPTED)
            throw new Error('Invalid unfriend operation');

        await FriendshipModel.unfriend(friendship);
        return {};

    }

    static async getFriendship(userId, friendId) {
        const smallerId = Math.min(userId, friendId);
        const largerId = Math.max(userId, friendId);

        const friendship = await FriendshipModel.getFriendship(smallerId, largerId);
        if (!friendship) {
            return{};
        }
        const friendshipInfo = {
            status: friendship.status,
            initiatorId: friendship.initiatorId,
        };
        if (!friendship) {
            throw new Error('No friendship found');
        }
        return friendshipInfo;

    }

    static async getFriends(userId) {
        const friends = await FriendshipModel.getFriends(userId);
        const jsonFriends = friends.map(friend => friend.toJSON());
        console.log(jsonFriends);
        return jsonFriends;

    }

    static async getFriendsByPagination(skip, limit, userId) {
        const paginationResults = await FriendshipModel.getFriendsByPagination(skip, limit, userId);
        return paginationResults;
    }
}

export default FriendshipService;
