import FriendshipService from '../services/friendshipService.mjs';

const friendshipController = {

    sendFriendRequest: async (request, response) => {

        try {
            const userId = request.userId;
            const friendId = +request.params.friendId;
            console.log("this is the friend id", friendId);
            console.log("this is the user id", userId);

            const friendshipInfo = await FriendshipService.sendFriendRequest(userId, friendId);
            return response.status(201).json(friendshipInfo);

        }catch(error) {
            console.error('Error sending friend request:', error);
            return response.status(400).json({ message: error.message });
        }

    },
    cancelFriendRequest: async (request, response) => {
        try{
            const userId = request.userId;
            const friendId = +request.params.friendId;
            const friendshipInfo = await FriendshipService.cancelFriendRequest(userId, friendId);
            return response.status(201).json({friendshipInfo});

        }catch(error) {
            console.error('Error canceling friend request:', error);
            return response.status(400).json({ message: error.message });
        }
    },

    acceptFriendRequest: async (request, response) => {
        try{
            const userId = request.userId;
            const friendId = +request.params.friendId;
            const friendshipInfo = await FriendshipService.acceptFriendRequest(userId, friendId);
            return response.status(201).json({friendshipInfo});
        }catch(error) {
            console.error('Error accepting friend request:', error);
            return response.status(400).json({ message: error.message });
        }

    },
    unfriend: async (request, response) => {
        try{
            const userId = request.userId;
            const friendId = +request.params.friendId;
            const friendshipInfo = await FriendshipService.unfriend(userId, friendId);
            return response.status(201).json({friendshipInfo});
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
            console.log("this is the friendship", friendship);
            return response.status(201).json( friendship );
        }catch(error) {
            console.error('Error getting friendship status:', error);
            return response.status(400).json({ message: error.message });
        }
    },
    // getFriends: async (request, response) => {
    //     try{
    //         const userId = request.userId;
    //         const friends = await FriendshipService.getFriends(userId);
    //         return response.status(201).json({ friends });
    //     }catch(error) {
    //         console.error('Error getting friends:', error);
    //         return response.status(400).json({ message: error.message});
    //     }
    // },

    getUserFriendsByPagination: async (req,res) =>{
        const userId = +req.params.userId;
        const page = +req.query.page ||1;
        const limit = +req.query.limit||9;
        const skip = (page - 1) * limit;
        try{
            const paginationResults = await FriendshipService.getFriendsByPagination(skip,limit,userId);
            res.status(200).json({ paginationResults });
        }   catch(error){
            res.status(400).json({ error: error.message });
        }
    }
}

export default friendshipController;