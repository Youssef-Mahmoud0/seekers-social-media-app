import db from '../config/database.mjs'

class LikeModel{
    static async checkLikeExistenceOnPost(postId, userId) {
        const [result] = await db.execute(
            `SELECT * FROM likes WHERE postId = ? AND userId = ?`,
            [postId, userId]
        );     
        return result;
    }

    static async checkLikeExistenceOnComment(commentId, userId) {
        const [result] = await db.execute(
            `SELECT * FROM likes WHERE commentId = ? AND userId = ?`,
            [commentId, userId]
        );     
        return result;
    }


    static async likePost(postId, userId) {
        const [result] = await db.execute(
            `INSERT INTO likes(postId, userId) VALUES (?, ?)`,
            [postId, userId]
        )
        return result;
    }

    static async getPostLikes(postId) {
        const [results] = await db.execute(
            `SELECT * FROM likes WHERE postId = ?`,
            [postId]
        );
    }

    static async unlikePost(postId, userId) {
        const [result] = await db.execute(
            `DELETE FROM likes WHERE postId = ? AND userId = ?`,
            [postId, userId]
        )
        return result;
    }

    static async likeComment(commentId, userId) {
        const [result] = await db.execute(
            `INSERT INTO likes(commentId, userId) VALUES (?, ?)`,
            [commentId, userId]
        )
        return result;
    }

    static async unlikeComment(commentId, userId) {
        const [result] = await db.execute(
            `DELETE FROM likes WHERE commentId = ? AND userId = ?`,
            [commentId, userId]
        )
        return result;
    }
    
    static async getCommentLikes(commentId) {
        const [results] = await db.execute(
            `SELECT * FROM likes WHERE commentId = ?`,
            [commentId]
        );
    }

}


export default LikeModel;
