import db from '../config/database.mjs'

class CommentModel {

    static async getAllPostComments(postId, userId) {
        const [results] = await db.execute(
            `SELECT * FROM comments WHERE postId = ? AND userId = ?`,
            [postId, userId]
        )
        return results;
    }

    static async createComment(postId, commentContent, userId) {
        const [result] = await db.execute(
            `INSERT INTO comments(userId, postId, content) Values (?, ?, ?)`,
            [userId, postId, commentContent]
        )
        return result;
    }

    static async updateComment(postId, commentId, commentContent, userId) {
        const result = await db.execute(
            `UPDATE comments SET content = ? WHERE userId = ? AND postId = ? AND commentId = ?`,
            [commentContent, userId, postId, commentId]
        );
        return result;
    }

    static async deleteComment(postId, commentId, userId) {
        const result = await db.execute(
            `DELETE FROM comments WHERE userId = ? AND postId = ? AND commentId = ?`,
            [userId, postId, commentId]
        );
        return result[0];
    }

    static async getCommentById(commentId) {
        const [result] = await db.execute(
            `SELECT * FROM comments WHERE commentId = ?`,
            [commentId]
        )
        const comment = result[0];
        return comment;
    }

    static async findAllWithPagination(limit, skip, postId) {
        const [results] = await db.query(
            `SELECT * FROM comments WHERE postId = ? LIMIT ? OFFSET ?`,
            [postId, limit, skip]
        )
        return results;
    }

    static async getTotalResults(postId) {
        const [result] = await db.execute(
            `SELECT COUNT(*) as totalResults FROM comments WHERE postId = ?`,
            [postId]
        )
        return result[0].totalResults;
    }
}

export default CommentModel;