import { Router } from "express";
import postController from '../controllers/postController.mjs';
import { pagination } from '../middlewares/pagination.mjs';
import PostModel from "../models/postModel.mjs";
import { validatePostCreation, validatePostUpdate, validatePostDeletion } from '../middlewares/postValidation.mjs';
import { paginationValidation } from '../middlewares/paginationValidation.mjs';  
const router = Router();


router.get('/posts', paginationValidation , pagination(PostModel) ,postController.getPosts);

// get posts for current user 
router.get('/user-posts', postController.getUserPosts);

// create a new post
router.post('/posts', validatePostCreation, postController.createPost);

// update a post with post id
router.patch('/posts/:id', postController.updatePost);

// delete a post with post id
router.delete('/posts/:id', validatePostDeletion, postController.deletePost);

export default router;

