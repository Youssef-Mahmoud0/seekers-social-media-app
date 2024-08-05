import CommentModel from "../models/commentModel.mjs";


class CommentService {

    static async createComment(postId, commentContent, userLoginInfo) {
        const result = await CommentModel.createComment(postId, commentContent, userLoginInfo.userId);
        if (result.affectedRows === 0) {
            throw new Error('comment not created');
        }

        return await CommentModel.getCommentById(result.insertId);
    }

    static async updateComment(postId, commentId, commentContent, userLoginInfo) {
        const result = await CommentModel.updateComment(postId, commentId, commentContent, userLoginInfo.userId);
        if (result.affectedRows === 0) {
            throw new Error('comment not updated, either comment id is invalid or you are not the owner of the comment');
        }
        return await CommentModel.getCommentById(commentId);
    }

    static async deleteComment(postId, commentId, userLoginInfo) {
        const result = await CommentModel.deleteComment(postId, commentId, userLoginInfo.userId);
        console.log('result:', result);
        if (result.affectedRows === 0) {
            throw new Error('comment not deleted, either comment id is invalid or you are not the owner of the comment');
        }
    }

}


export default CommentService;