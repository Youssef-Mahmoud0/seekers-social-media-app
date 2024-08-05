import LikeModel from '../models/likeModel.mjs';
import PostModel from '../models/postModel.mjs';
import CommentModel from '../models/commentModel.mjs';

class LikeService {

    static likePost = async (postId, userLoginInfo) => {
        const requiredPost = await PostModel.getPostById(postId);
        if(!requiredPost){
            throw new Error('Post Not Found');
        }

        const likeExistenceResult = await LikeModel.checkLikeExistenceOnPost(postId, userLoginInfo.userId);
        if(likeExistenceResult.length > 0){
            throw new Error('Post Already Liked');
        }

        const likeResult =  await LikeModel.likePost(postId, userLoginInfo.userId);
        if(likeResult.affectedRows === 0){
            throw new Error('Post Not Liked');
        }

        return await LikeModel.getPostLikes(postId);
    }

    static unlikePost = async (postId, userLoginInfo) => {
        const requiredPost = await PostModel.getPostById(postId);
        if(!requiredPost){
            throw new Error('Post Not Found');
        }
        
        const likeExistenceResult = await LikeModel.checkLikeExistenceOnPost(postId, userLoginInfo.userId);
        if(likeExistenceResult.length === 0){
            throw new Error('Post Not Liked To Start With');
        }

        const result =  await LikeModel.unlikePost(postId, userLoginInfo.userId);
        if(result.affectedRows === 0){
            throw new Error('Post Not Unliked');
        }

        return await LikeModel.getPostLikes(postId);
    }

    static getPostLikes = async (postId) => {
        const requiredPost = await PostModel.getPostById(postId);
        if(!requiredPost){
            throw new Error('Post Not Found');
        }

        return await LikeModel.getPostLikes(postId);
    }

    static likeComment = async (commentId, userLoginInfo) => {
        const requiredComment = await CommentModel.getCommentById(commentId);
        if(!requiredComment){
            throw new Error('Comment Not Found');
        }

        const likeExistenceResult = await LikeModel.checkLikeExistenceOnComment(commentId, userLoginInfo.userId);
        if(likeExistenceResult.length > 0){
            throw new Error('Comment Already Liked');
        }

        const result =  await LikeModel.likeComment(commentId, userLoginInfo.userId);
        if(result.affectedRows === 0){
            throw new Error('Comment Not Liked');
        }
        return await LikeModel.getCommentLikes(commentId);
    }

    static unlikeComment = async (commentId, userLoginInfo) => {
        const requiredComment = await CommentModel.getCommentById(commentId);
        if(!requiredComment){
            throw new Error('Comment Not Found');
        }

        const likeExistenceResult = await LikeModel.checkLikeExistenceOnComment(commentId, userLoginInfo.userId);
        if(likeExistenceResult.length === 0){
            throw new Error('Comment Not Liked To Start With');
        }

        const result =  await LikeModel.unlikeComment(commentId, userLoginInfo.userId);
        if(result.affectedRows === 0){
            throw new Error('Comment Not Unliked');
        }
        return await LikeModel.getCommentLikes(commentId);
    }

    static getCommentLikes = async (commentId) => {
        const requiredComment = await CommentModel.getCommentById(commentId);
        if(!requiredComment){
            throw new Error('Comment Not Found');
        }

        return await LikeModel.getCommentLikes(commentId);
    }
}

export default LikeService;



