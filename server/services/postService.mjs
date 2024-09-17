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

    static async getPostsByPagination (userId, page, limit) {
        const skip = (page - 1) * limit; // startIndex
        
        const posts = await PostModel.getPostsByPagination(userId, limit, skip);
        const totalPostsCount = await PostModel.getTotalPostsCount();
        
        const paginationResults = {
            posts: posts,
            totalPostsCount: totalPostsCount,
        };
        
        if(skip > 0) {
            paginationResults.previousPage = page - 1
        }
        
        const endIndex = page * limit;
        if (endIndex < totalPostsCount) {
            paginationResults.nextPage = page + 1
        }
            
        return paginationResults;
    }




    static async likePost (postId, userId) {
        const post = await PostModel.getPostById(postId);

        await PostModel.likePost(postId, userId);
        await post.reload();
        console.log(post)
        return PostModel.getPostLikes(post);
    }

    static async unlikePost (postId, userId) {
        const post = await PostModel.getPostById(postId);

        await PostModel.unlikePost(postId, userId);
        await post.reload();
        return PostModel.getPostLikes(post);
    }

    static async getPostLikes (postId) {
        const post = await PostModel.getPostById(postId);

        return PostModel.getPostLikes(post);
    }





}

export default PostService;