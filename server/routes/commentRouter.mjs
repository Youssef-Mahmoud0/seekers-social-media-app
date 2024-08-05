import { Router } from "express";
import commentController from '../controllers/commentController.mjs';
import { pagination } from '../middlewares/pagination.mjs';
import CommentModel from '../models/commentModel.mjs';
import { paginationValidation } from '../middlewares/paginationValidation.mjs';  

const router = Router();

// get comments by pagination
router.get('/posts/:id/comments', paginationValidation, pagination(CommentModel), commentController.getPostComments);

// get all comments for a post (Change Or it)
router.get('/posts/:postId/comments', commentController.getAllPostComments);

// create a new comment
router.post('/posts/:postId/comments', commentController.createComment);

// update a comment with comment id
router.patch('/posts/:postId/comments/:commentId', commentController.updateComment);

// delete a comment with comment id
router.delete('/posts/:postId/comments/:commentId', commentController.deleteComment);

export default router;