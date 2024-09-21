import { Router } from 'express';
import friendshipController from '../controllers/friendshipController.mjs';
const router = Router();


// Send a Friend Request
router.post('/friendship/:friendId/request', friendshipController.sendFriendRequest);

// Cancel a Friend Request by the user who sent it
router.delete('/friendship/:friendId/cancel', friendshipController.cancelFriendRequest);

// Accept a Friend Request
router.patch('/friendship/:friendId/accept', friendshipController.acceptFriendRequest);    

// Decline a Friend Request by the user who received it
// router.delete('/friendship/:friendId/decline', friendshipController.declineFriendRequest);

// Unfriend a User
router.delete('/friendship/:friendId', friendshipController.unfriend);

// Get Friendship Status
router.get('/friendship/:friendId/info', friendshipController.getFriendshipInfo);



/// check content
// Get Friends
router.get('/friends', friendshipController.getFriends);


export default router;