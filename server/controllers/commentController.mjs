
import CommentService from '../services/commentService.mjs';

const commentController = {
    createComment: async (request, response) => {
        try{
            const userLoginInfo = request.userLoginInfo;
            const postId = request.params.postId;
            const commentContent = request.body.content

            const createdComment = await CommentService.createComment(postId, commentContent, userLoginInfo);
            return response.status(201).json(createdComment);
        } catch(error) {
            console.error('Error creating comment:', error);
            return response.status(500).json({ message: error.message });               
        }
    },
    updateComment: async (request, response) => {
        try{
            const userLoginInfo = request.userLoginInfo;
            const postId = request.params.postId;
            const commentId = request.params.commentId;
            const commentContent =  request.body.content

            
            const updatedComment = await CommentService.updateComment(postId, commentId, commentContent, userLoginInfo);            
            return response.status(201).json(updatedComment);

        } catch(error) {
            console.error('Error updating comments:', error);
            return response.status(500).json({ message: error.message });              
        }
    },
    deleteComment: async (request, response) => {
        try{
            const userLoginInfo = request.userLoginInfo;
            const postId = request.params.postId;
            console.log(postId);
            const commentId = request.params.commentId;
            console.log(commentId);

            await CommentService.deleteComment(postId, commentId, userLoginInfo);
            return response.status(201).json("successFully deleted");

        } catch(error) {
            console.error('Error deleting comments:', error);
            return response.status(500).json({ message: error.message });              
        }
    },
    getPostComments: async (request, response) => {
       return response.status(200).json(request.paginationResults); 
    },

    getAllPostComments: async (request, response) => {
        try{
            const postId = request.params.postId;
            const comments = await CommentService.getAllPostComments(postId);
            return response.status(200).json(comments);
        } catch(error) {
            console.error('Error getting all comments:', error);
            return response.status(500).json({ message: error.message });              
        }
    }


}

export default commentController;