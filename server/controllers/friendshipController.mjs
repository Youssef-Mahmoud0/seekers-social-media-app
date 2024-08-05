import FriendshipService from '../services/friendshipService.mjs';

const friendshipController = {

    sendFriendRequest: async (request, response) => {

        try {
            const userId = request.userLoginInfo.userId;
            const friendId = request.params.friendId;
            await FriendshipService.sendFriendRequest(userId, friendId);
            return response.status(201).json({ message: 'Friend request sent successfully.' });

        }catch(error) {
            console.error('Error sending friend request:', error);
            return response.status(400).json({ message: error.message });
        }

    },
    cancelFriendRequest: async (request, response) => {
        try{
            const userId = request.userLoginInfo.userId;
            const friendId = request.params.friendId;
            await FriendshipService.cancelFriendRequest(userId, friendId);
            return response.status(201).json({ message: 'Friend request sent successfully.' });

        }catch(error) {
            console.error('Error canceling friend request:', error);
            return response.status(400).json({ message: error.message });
        }
    },
    declineFriendRequest: async (request, response) => {
        try{
            const userId = request.userLoginInfo.userId;
            const friendId = request.params.friendId;
            await FriendshipService.declineFriendRequest(userId, friendId);
            return response.status(201).json({ message: 'Friend request sent successfully.' });

        }catch(error) {
            console.error('Error canceling friend request:', error);
            return response.status(400).json({ message: error.message });
        }
    },
    acceptFriendRequest: async (request, response) => {
        try{
            const userId = request.userLoginInfo.userId;
            const friendId = request.params.friendId;
            await FriendshipService.acceptFriendRequest(userId, friendId);
            return response.status(201).json({ message: 'Friend request accepted successfully.' });
        }catch(error) {
            console.error('Error accepting friend request:', error);
            return response.status(400).json({ message: error.message });
        }

    },
    unfriend: async (request, response) => {
        try{
            const userId = request.userLoginInfo.userId;
            const friendId = request.params.friendId;
            await FriendshipService.unfriend(userId, friendId);
            return response.status(201).json({ message: 'Friend removed successfully.' });
        }catch(error) {
            console.error('Error removing friend:', error);
            return response.status(400).json({ message: error.message });
        }

    },
    getFriendshipStatus: async (request, response) => {
        try{
            const userId = request.userLoginInfo.userId;
            const friendId = request.params.friendId;
            const info = await FriendshipService.getFriendshipInfo(userId, friendId);
            return response.status(201).json({ info });
        }catch(error) {
            console.error('Error getting friendship status:', error);
            return response.status(400).json({ message: error.message });
        }
    },
    getFriends: async (req, res) => {
        try{
            const userId = req.userLoginInfo.userId;
            const friends = await FriendshipService.getFriends(userId);
            return res.status(201).json({ friends });
        }catch(error) {
            console.error('Error getting friends:', error);
            return res.status(400).json({ message: error.message});
        }
    },
}

export default friendshipController;