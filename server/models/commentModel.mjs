import Comment from './definitions/Comment.mjs';
import Post from './definitions/Post.mjs';
import User from './definitions/User.mjs';
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

        if (!comment)
            throw new Error('Comment not created');

        await Post.increment('commentsCount', {
            by: 1,
            where: { postId },
        });

        await comment.reload({
            include: [
                {
                    model: User,
                    as: 'Author',
                    attributes: ['userId', 'name', 'profilePicture']
                }
            ]
        });


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

        if (!result) {
            throw new Error('Comment not deleted or not found');
        }
        await Post.decrement('commentsCount', {
            by: 1,
            where: { postId },
        });

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

        await Comment.increment('likersCount', { where: { commentId } });

    }
    
    static async unlikeComment(commentId, userId) {
        const result = await CommentLike.destroy({
            where: {
                commentId: commentId,
                userId: userId
            }
        })

        if (!result)
            throw new Error('Comment Not Unliked');

        await Comment.decrement('likersCount', { where: { commentId } });
    }

    static async getCommentLikes(comment) {
        return comment.likersCount;
    }

    static async getCommentsByPagination(limit, skip, postId, userId) {
        const comments = await Comment.findAll({
            where: {
                postId: postId
            },
            include:[
                {
                    model: User,
                    as: 'Author',
                    attributes: ['userId', 'name', 'profilePicture']
                }
            ],
            
            limit: limit,
            offset: skip,
            order: [['createdAt', 'DESC']]
        });

        const likedCommentsIds = await CommentLike.findAll({
            where: {
                commentId: comments.map(comment => comment.commentId),
                userId: userId
            },
            attributes: ['commentId']
        });

        comments.forEach(comment => {
            comment.dataValues.isLiked = likedCommentsIds.some(likedComment => likedComment.commentId === comment.commentId);
        });  

        return comments;
    }

    static async getTotalCommentsCount(postId) {
        const totalCommentsCount = await Comment.count({
            where: {
                postId: postId
            }
        });
        return totalCommentsCount;
    }
}

export default CommentModel;