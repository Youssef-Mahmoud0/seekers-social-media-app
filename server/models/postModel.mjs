import db from '../config/database.mjs'

class PostModel {

    static async getUserPosts(userId) {
        const [results] = await db.execute(
            `SELECT * FROM posts WHERE userId = ? ORDER BY created_at DESC`,
            [userId]
        )
        return results;
    }


    static async createPost(post, userId) {
        const [result] = await db.execute(
            `INSERT INTO posts(userId, title, content) Values (?, ?, ?)`,
            [userId, post.title, post.content]
        )
        return result;
    }    

    static async updatePost(post, userId) {
        const [result] = await db.execute(
            `UPDATE posts SET title = ?, content = ? WHERE postId = ? AND userId = ?`,
            [post.title, post.content, post.postId, userId]
        )
        return result;
    } 

    static async getPostById(postId) { 
        const [result] = await db.execute(
            `SELECT * FROM posts WHERE postId = ?`,
            [postId]
        )
        const post = result[0];
        return post;
    }
    

    static async deletePost(postId, userId) {
        const [result] = await db.execute(
            `DELETE FROM posts WHERE postId = ? AND userId = ?`,
            [postId, userId]
        )
        return result;
    }

    static async findAllWithPagination(limit, skip, _unUsedPostId) {
        const [results] = await db.query(
            `SELECT * FROM posts LIMIT ? OFFSET ?`,
            [limit, skip]
        )
        return results;
    }

    static async getTotalResults(_unUsedPostId) {
        const [result] = await db.execute(
            `SELECT COUNT(*) as totalResults FROM posts`
        )
        return result[0].totalResults;
    }

}

export default PostModel;