import FriendshipService from '../services/friendshipService.mjs';

const friendshipController = {

    sendFriendRequest: async (request, response) => {

        try {
            const userId = request.userId;
            const friendId = +request.params.friendId;
            await FriendshipService.sendFriendRequest(userId, friendId);
            return response.status(201).json({ message: 'Friend request sent successfully.' });

        }catch(error) {
            console.error('Error sending friend request:', error);
            return response.status(400).json({ message: error.message });
        }

    },
    cancelFriendRequest: async (request, response) => {
        try{
            const userId = request.userId;
            const friendId = +request.params.friendId;
            await FriendshipService.cancelFriendRequest(userId, friendId);
            return response.status(201).json({ message: 'Friend request canceled successfully ' });

        }catch(error) {
            console.error('Error canceling friend request:', error);
            return response.status(400).json({ message: error.message });
        }
    },

    acceptFriendRequest: async (request, response) => {
        try{
            const userId = request.userId;
            const friendId = +request.params.friendId;
            await FriendshipService.acceptFriendRequest(userId, friendId);
            return response.status(201).json({ message: 'Friend request accepted successfully.' });
        }catch(error) {
            console.error('Error accepting friend request:', error);
            return response.status(400).json({ message: error.message });
        }

    },
    unfriend: async (request, response) => {
        try{
            const userId = request.userId;
            const friendId = +request.params.friendId;
            await FriendshipService.unfriend(userId, friendId);
            return response.status(201).json({ message: 'Friend removed successfully.' });
        }catch(error) {
            console.error('Error removing friend:', error);
            return response.status(400).json({ message: error.message });
        }

    },
    getFriendshipInfo: async (request, response) => {
        try{
            const userId = request.userId;
            const friendId = +request.params.friendId;
            const friendship = await FriendshipService.getFriendship(userId, friendId);
            return response.status(201).json({ friendship });
        }catch(error) {
            console.error('Error getting friendship status:', error);
            return response.status(400).json({ message: error.message });
        }
    },
    getFriends: async (request, response) => {
        try{
            const userId = request.userId;
            const friends = await FriendshipService.getFriends(userId);
            return response.status(201).json({ friends });
        }catch(error) {
            console.error('Error getting friends:', error);
            return response.status(400).json({ message: error.message});
        }
    },
}

export default friendshipController;