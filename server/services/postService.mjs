import PostModel from "../models/postModel.mjs";


class PostService {
    static async getUserPosts(userLoginInfo){
        return await PostModel.getUserPosts(userLoginInfo.userId);
    }

    static async createPost(post, userLoginInfo){
        const result = await PostModel.createPost(post, userLoginInfo.userId);
        if (result.affectedRows === 0) {
            throw new Error('Post not created');
        }

        return await PostModel.getPostById(result.insertId);
    }

    static async updatePost(post, userLoginInfo){
        const result = await PostModel.updatePost(post, userLoginInfo.userId);

        if (result.affectedRows === 0) {
            throw new Error('Post not updated, either post id is invalid or you are not the owner of the post');
        }

        return await PostModel.getPostById(post.postId);
    }

    static async deletePost(postId, userLoginInfo) {
        const result = await PostModel.deletePost(postId, userLoginInfo.userId);
        console.log(result)
        if (result.affectedRows === 0) {
            throw new Error('Post not deleted, either post id is invalid or you are not the owner of the post');
        }
    }

}

export default PostService;