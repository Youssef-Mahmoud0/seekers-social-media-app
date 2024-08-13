import PostModel from "../models/postModel.mjs";


class PostService {
    static async getUserPosts(userId){
        return await PostModel.getUserPosts(userId);
    }

    static async createPost(postContent, userId){
        const post = await PostModel.createPost(postContent, userId);
        return post.toJSON();
    }

    static async updatePost(postContent, postId, userId){
        await PostModel.updatePost(postContent, postId, userId);

        return await PostModel.getPostById(postId);
    }

    static async deletePost(postId, userId) {
        await PostModel.deletePost(postId, userId);
    }


    static async likePost (postId, userId) {
        const post = await PostModel.getPostById(postId);

        await PostModel.likePost(postId, userId);

        return await PostModel.getPostLikes(post);
    }

    static async unlikePost (postId, userId) {
        const post = await PostModel.getPostById(postId);

        await PostModel.unlikePost(postId, userId);

        return await PostModel.getPostLikes(post);
    }

    static async getPostLikes (postId) {
        const post = await PostModel.getPostById(postId);

        return await PostModel.getPostLikes(post);
    }





}

export default PostService;