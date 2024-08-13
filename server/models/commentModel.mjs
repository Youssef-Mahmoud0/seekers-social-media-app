import Comment from './definitions/Comment.mjs';
import CommentLike from './definitions/CommentLike.mjs';

class CommentModel {

    // static async getAllPostComments(postId, userId) {
    //     const comments = await Comment.findAll({
    //         where: {
    //             postId: postId,
    //             userId: userId
    //         },
    //         raw: true
    //     });
    //     console.log("Inside Comment Model, getAllPostComments", comments); 
    //     return comments;
    // }

    static async createComment(postId, commentContent, userId) {
        const comment = await Comment.create({
            userId: userId,
            postId: postId,
            content: commentContent
        })        

        return comment;
    }

    static async updateComment(postId, commentId, commentContent, userId) {
        const comment = await Comment.update(
            {
            content: commentContent
            },
            {
                where: {
                    commentId: commentId,
                    userId: userId,
                    postId: postId
                }
        })

        return comment;
    }

    static async deleteComment(postId, commentId, userId) {
        const result = await Comment.destroy({
            where: {
                commentId: commentId,
                userId: userId,
                postId: postId
            }
        })
        return result;
    }

    static async getCommentById(commentId) {
        const comment = await Comment.findByPk(commentId);
        if(!comment){
            throw new Error('Comment Not Found');
        }

        return comment;
    }

    static async likeComment(commentId, userId) {
        const [like, created] = await CommentLike.findOrCreate({
            where: {
                commentId: commentId,
                userId: userId
            }
        })

        if (!created) 
            throw new Error('Comment Already Liked');

        if (!like) 
            throw new Error('Comment Not Liked');
    }
    
    static async unlikeComment(commentId, userId) {
        const result = await CommentLike.destroy({
            where: {
                commentId: commentId,
                userId: userId
            }
        })
        return result;
    }

    static async getCommentLikes(comment) {
        const likes = await comment.countLikers();
        return likes;
    }


    // static async findAllWithPagination(limit, skip, postId) {
    //     const [results] = await db.query(
    //         `SELECT * FROM comments WHERE postId = ? LIMIT ? OFFSET ?`,
    //         [postId, limit, skip]
    //     )
    //     return results;
    // }

    // static async getTotalResults(postId) {
    //     const [result] = await db.execute(
    //         `SELECT COUNT(*) as totalResults FROM comments WHERE postId = ?`,
    //         [postId]
    //     )
    //     return result[0].totalResults;
    // }
}

export default CommentModel;