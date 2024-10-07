import Friendship from './definitions/FriendShip.mjs';
import User from './definitions/User.mjs';
import { FRIENDSHIP_STATUS } from '../constants/friendshipStatus.mjs';
import { Op } from '../config/sequelize.mjs';

class FriendshipModel {

    static async sendFriendRequest(smallerId, largerId, initiatorId) {
        const [friendship, created] = await Friendship.findOrCreate({
            where: {
                userId1: smallerId,
                userId2: largerId
            },
            defaults: {
                status: FRIENDSHIP_STATUS.PENDING,
                initiatorId: initiatorId
            }
        });

        if (!created) {
            if (friendship.status === FRIENDSHIP_STATUS.PENDING) {
                throw new Error('Friend request already sent');
            }

            if (friendship.status === FRIENDSHIP_STATUS.ACCEPTED) {
                throw new Error('You are already friends');
            }
        }
        return friendship;  

    }

    static async getFriendship(smallerId, largerId) {

        const friendship = await Friendship.findOne({
            where: {
                userId1: smallerId,
                userId2: largerId
            }
        });

        return friendship;
    }

    static async acceptFriendRequest(friendship) {
        await friendship.update({ status: FRIENDSHIP_STATUS.ACCEPTED });
    }

    static async unfriend(friendship) {
        const affectedRows = await friendship.destroy();
        if (!affectedRows) {
            throw new Error('Unfriend operation failed');
        }
    }

    static async cancelFriendRequest(friendship) {
        const affectedRows = await friendship.destroy();

        if (!affectedRows) {
            throw new Error('Unfriend operation failed');
        }
    }

    static async getFriends(userId) {
        const friendships = await Friendship.findAll({
            where: {
                status: FRIENDSHIP_STATUS.ACCEPTED,
                [Op.or]: [
                    { userId1: userId },
                    { userId2: userId }
                ]
            }
        });
        const friendIds = friendships.map(friendship => {
            return friendship.userId1 === userId ? friendship.userId2 : friendship.userId1;
        });

        const friends = await User.findAll({
            where: {
                userId: {
                    [Op.in]: friendIds
                }
            },
            attributes: ['userId', 'name', 'profilePicture']
        });
        return friends;
    }


    static async getFriendsByPagination(skip, limit, userId) {
        const friendships = await Friendship.findAll({
            where: {
                status: FRIENDSHIP_STATUS.ACCEPTED,
                [Op.or]: [
                    { userId1: userId },
                    { userId2: userId }
                ]
            }
        });
    
        const friendIds = friendships.map(friendship => {
            return friendship.userId1 === userId ? friendship.userId2 : friendship.userId1;
        });
    
        const totalPages = Math.ceil(friendIds.length/limit);
        const paginatedFriends = await User.findAll({
            where: {
                userId: {
                    [Op.in]: friendIds
                }
            },
            attributes: ['userId', 'name', 'profilePicture'],
            limit: limit,
            offset:skip
        });
    
        // Return both friends and total count
        return {
            friends: paginatedFriends.map(friend => friend.toJSON()),
            totalPages: totalPages
        };
    }
}


export default FriendshipModel;