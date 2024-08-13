import FriendshipModel from '../models/friendshipModel.mjs';
import { FRIENDSHIP_STATUS } from '../constants/friendshipStatus.mjs';

class FriendshipService {

    static async sendFriendRequest(userId, friendId) {
        // check if userId and friendId are the same
        if(userId === friendId) 
            throw new Error('Cannot send friend request to yourself');

        // initiatorId is the one who sent the friend request (current userId)        
        const initiatorId = userId;

        // always store the smaller id first as userId1

        const smallerId = Math.min(userId, friendId);
        const largerId = Math.max(userId, friendId);

        await FriendshipModel.sendFriendRequest(smallerId, largerId, initiatorId);

    }

    // the one who sent the friend request is the one who cancel it
    static async cancelFriendRequest(userId, friendId) {

        const smallerId = Math.min(userId, friendId);
        const largerId = Math.max(userId, friendId);

        const friendship = await FriendshipModel.getFriendship(smallerId, largerId);
        if(!friendship || friendship.status !== FRIENDSHIP_STATUS.PENDING) 
            throw new Error('No friend request to cancel');

        await FriendshipModel.cancelFriendRequest(friendship);
    }    

    static async acceptFriendRequest(userId, friendId) {

        const smallerId = Math.min(userId, friendId);
        const largerId = Math.max(userId, friendId);

        const friendship = await FriendshipModel.getFriendship(smallerId, largerId);
        if(!friendship || friendship.status !== FRIENDSHIP_STATUS.PENDING) 
            throw new Error('No friend request to accept');

        if(userId === friendship.initiatorId) {
            throw new Error('Invalid Action. Cannot accept your own friend request');
        }

        await FriendshipModel.acceptFriendRequest(friendship);
    }

    static async unfriend(userId, friendId) {
        const smallerId = Math.min(userId, friendId);
        const largerId = Math.max(userId, friendId);

        const friendship = await FriendshipModel.getFriendship(smallerId, largerId);
        if(!friendship || friendship.status !== FRIENDSHIP_STATUS.ACCEPT) 
            throw new Error('Invalid unfriend operation');

        await FriendshipModel.unfriend(friendship);
    }

    static async getFriendship(userId, friendId) {
        const friendship =  await FriendshipModel.getFriendship(userId, friendId);
        if (!friendship) {
            throw new Error('No friendship found');
        }
        return friendship.toJSON();
    }

    static async getFriends(userId) {
        const friends = await FriendshipModel.getFriends(userId);
        const jsonFriends = friends.map(friend => friend.toJSON());
        console.log(jsonFriends);
        return jsonFriends;

    }
}

export default FriendshipService;
