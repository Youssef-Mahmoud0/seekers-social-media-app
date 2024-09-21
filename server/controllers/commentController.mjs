import CommentService from '../services/commentService.mjs';

const commentController = {
    createComment: async (request, response) => {
        console.log("createComment");
        try{
            const userId = request.userId;
            const postId = +request.params.postId;
            const commentContent = request.body.content

            const createdComment = await CommentService.createComment(postId, commentContent, userId);
            return response.status(201).json(createdComment);
        } catch(error) {
            console.error('Error creating comment:', error);
            return response.status(500).json({ message: error.message });               
        }
    },
    updateComment: async (request, response) => {
        try{
            const userId = request.userId;
            const postId = +request.params.postId;
            const commentId = +request.params.commentId;
            const commentContent =  request.body.content

            
            const updatedComment = await CommentService.updateComment(postId, commentId, commentContent, userId);            
            return response.status(201).json(updatedComment);

        } catch(error) {
            console.error('Error updating comments:', error);
            return response.status(500).json({ message: error.message });              
        }
    },
    deleteComment: async (request, response) => {
        try{
            const userId = request.userId;
            const postId = +request.params.postId;
            console.log(postId);
            const commentId = +request.params.commentId;
            console.log(commentId);

            await CommentService.deleteComment(postId, commentId, userId);
            return response.status(201).json("successFully deleted");

        } catch(error) {
            console.error('Error deleting comments:', error);
            return response.status(500).json({ message: error.message });              
        }
    },
    getCommentsByPagination: async (request, response) => {
        console.log("getCommentsByPagination");

        const page = +request.query.page || 1;
        const limit = +request.query.limit || 10;
        const postId = +request.params.postId;
        try{
            const paginationResults = await CommentService.getCommentsByPagination(page, limit, postId);
            return response.status(200).json(paginationResults);
        }catch(error){
            console.error('Error getting posts:', error);
            return response.status(422).json({ message: error.message });
        }    
    },

    // getAllPostComments: async (request, response) => {
    //     try{
    //         const postId = request.params.postId;
    //         const comments = await CommentService.getAllPostComments(postId);
    //         return response.status(200).json(comments);
    //     } catch(error) {
    //         console.error('Error getting all comments:', error);
    //         return response.status(500).json({ message: error.message });              
    //     }
    // }


    likeComment: async (request, response) => {
        try{
            const userId = request.userId;
            const commentId = +request.params.commentId;

            const likes = await CommentService.likecomment(commentId, userId);
            return response.status(200).json( likes );
        }
        catch(error){
            console.error('Error Liking The Comment:', error);
            return response.status(400).json({ message: error.message });
        }
    },

    unlikeComment: async (request, response) => {
        try{
            const userId = request.userId;
            const commentId = +request.params.commentId;

            await CommentService.unlikeComment(commentId, userId);
            return response.status(200).json("Comment Unliked");
        }
        catch(error){
            console.error('Error Unliking The Comment:', error);
            return response.status(400).json({ message: error.message });
        }
    },

    getCommentLikes: async (request, response) => {
        try{
            const commentId = +request.params.commentId;

            const likes = await CommentService.getCommentLikes(commentId);
            return response.status(200).json( likes );
        }
        catch(error){
            console.error('Error getting likes for the comment:', error);
            return response.status(400).json({ message: error.message });
        }
    }

}

export default commentController;