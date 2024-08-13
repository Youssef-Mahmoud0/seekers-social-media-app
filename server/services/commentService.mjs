import CommentModel from "../models/commentModel.mjs";


class CommentService {

    static async createComment(postId, commentContent, userId) {
        const comment = await CommentModel.createComment(postId, commentContent, userId);
        console.log("createComment", comment);
        if (comment === null) {
            throw new Error('comment not created');
        }

        return comment.toJSON();
    }

    static async updateComment(postId, commentId, commentContent, userId) {
        const comment = await CommentModel.updateComment(postId, commentId, commentContent, userId);
        console.log("updateComment", comment);
        if (result === null) {
            throw new Error('comment not updated, either comment id is invalid or you are not the owner of the comment');
        }
        return comment;
    }

    static async deleteComment(postId, commentId, userId) {
        const result = await CommentModel.deleteComment(postId, commentId, userId);
        console.log('result:', result);
        if (result === 0) {
            throw new Error('comment not deleted, either comment id is invalid or you are not the owner of the comment');
        }
    }

    static async likeComment (commentId, userId) {
        const comment = await CommentModel.getCommentById(commentId);

        await CommentModel.likeComment(commentId, userId);

        return await CommentModel.getCommentLikes(comment);
    }

    static async unlikeComment (commentId, userId) {
        const comment = await CommentModel.getCommentById(commentId);

        await CommentModel.unlikeComment(commentId, userId);

        return await CommentModel.getCommentLikes(comment);
    }

    static async getCommentLikes (commentId) {
        const comment = await CommentModel.getCommentById(commentId);

        return await CommentModel.getCommentLikes(comment);
    }

}


export default CommentService;