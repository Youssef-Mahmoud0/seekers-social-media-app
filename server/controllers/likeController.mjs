import LikeService from '../services/likeService.mjs';


const likeController = {
    likePost: async (request, response) => {
        try{
            const userId = request.userId;
            const postId = +request.params.postId;

            await LikeService.likePost(postId, userId);
            const likes = await LikeService.getPostLikes(postId);
            response.locals.responseBody.likes = likes;

            return response.status(200).json( likes );
        }
        catch(error){
            console.error('Error Liking The Post:', error);
            return response.status(400).json({ message: error.message });
        }
    },
    unlikePost: async (request, response) => {
        try{
            const userId = request.userId;
            const postId = +request.params.postId;

            await LikeService.unlikePost(postId, userId);
            const likes = await LikeService.getPostLikes(postId);
            return response.status(200).json( likes );
        }
        catch(error){
            console.error('Error unLiking The Post:', error);
            return response.status(400).json({ message: error.message });
        }
    },
    getPostLikes: async (request, response) => {
        try{
            const postId = +request.params.postId;
            const likes = await LikeService.getPostLikes(postId);
            return response.status(200).json( likes );
        }
        catch(error){
            console.error('Error Fetching Likes:', error);
            return response.status(400).json({ message: error.message });
        }
    },
    likeComment: async (request, response) => {
        try{
            const userId = request.userId;
            const commentId = +request.params.commentId;

            await LikeService.likeComment(commentId, userId);
            const likes = await LikeService.getCommentLikes(commentId);
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

            await LikeService.unlikeComment(commentId, userId);
            const likes = await LikeService.getCommentLikes(commentId);
            return response.status(200).json( likes );
        }
        catch(error){
            console.error('Error unLiking The Comment:', error);
            return response.status(400).json({ message: error.message });
        }
    },
    getCommentLikes: async (request, response) => {
        try{
            const commentId = +request.params.commentId;
            const likes = await LikeService.getCommentLikes(commentId);
            return response.status(200).json( likes );
        }
        catch(error){
            console.error('Error Fetching Likes:', error);
            return response.status(400).json({ message: error.message });
        }
    }
}

export default likeController;




