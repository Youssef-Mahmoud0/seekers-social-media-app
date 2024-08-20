import Post from "./definitions/Post.mjs"
import PostLike from "./definitions/PostLike.mjs";

class PostModel {

    static async getUserPosts(userId) {
        const posts = await Post.findAll({
            where: {
                userId: userId
            },
            order: [['createdAt', 'DESC']],
            raw: true
        })

        return posts;
    }

    static async getPostById(postId){ 
        const post = await Post.findByPk(postId);
        if(!post){
            throw new Error('Post Not Found');
        }

        return post;
    }

    static async createPost(postContent, userId) {
        const post = await Post.create({
            content: postContent,
            userId: userId
        });

        if (!post) {
            throw new Error('Post not created');
        }

        return post;
    }    

    static async updatePost(postContent, postId, userId) {
        const result = await Post.update({
            content: postContent
        }, {
            where: {
                postId: postId,
                userId: userId
            },
        });

        if (!result) {
            throw new Error('Post not updated, invalid credentials');
        }
    } 

    static async deletePost(postId, userId) {
        const result = await Post.destroy({
            where: {
                postId: postId,
                userId: userId
            }
        });

        if (!result) {
            throw new Error('Post not deleted, invalid credentials');
        }

        // return result;
    }

    static async likePost(postId, userId) {
        const [like, created] = await PostLike.findOrCreate({
            where: {
                postId: postId,
                userId: userId
            }
        })

        if (!created) 
            throw new Error('Post Already Liked');

        if (!like) 
            throw new Error('Post Not Liked');
    }

    static async unlikePost(postId, userId) {
        const result = await PostLike.destroy({
            where: {
                postId: postId,
                userId: userId
            }
        });
        
        if (!result) 
            throw new Error('Post Not Unliked');
    }
    
    static async getPostLikes(post) {
        const likes = await post.countLikers();
        return likes;
    }

    static async getPostsByPagination(limit, skip) {
        const posts = await Post.findAll({
            limit: limit,
            offset: skip,
            // order: [['createdAt', 'DESC']],
            raw: true
        });

        return posts;
    }

    static async getTotalPostsCount() {
        const totalPostsCount = await Post.count();
        return totalPostsCount
    }

    
}

export default PostModel;