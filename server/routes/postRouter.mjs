import { Router } from "express";
import postController from '../controllers/postController.mjs';
import { validatePostCreation, validatePostUpdate, validatePostDeletion } from '../middlewares/postValidation.mjs';
import { paginationValidation } from '../middlewares/paginationValidation.mjs';  
const router = Router();


// get posts with pagination
router.get('/posts', paginationValidation, postController.getPostsByPagination);

// may need to use pagination for user-profile posts in the future
// get posts for current user 
router.get('/user-posts', postController.getUserPosts);

// create a new post
router.post('/posts', validatePostCreation, postController.createPost);

// update a post with post id
router.patch('/posts/:postId', postController.updatePost);

// delete a post with post id
router.delete('/posts/:postId', validatePostDeletion, postController.deletePost);


//////////////////////////////////////////// Likes section


// like a post with post id
router.post('/posts/:postId/like', postController.likePost);

// unlike a post with post id
router.delete('/posts/:postId/like', postController.unlikePost);

// get likes for a post with post id (as count) may need the users when work at the front end
router.get('/posts/:postId/likes', postController.getPostLikes);


export default router;