import PostService from '../services/postService.mjs';

const postController = {
    getUserPosts: async (request, response) => {
        try{
            const userLoginInfo = request.userLoginInfo;
            const posts = await PostService.getUserPosts(userLoginInfo);
            return response.status(200).json(posts);
        } catch(error){
            console.error('Error getting posts:', error);
            return response.status(422).json({ message: error.message });
        }
    },

    createPost: async (request, response) => {
        try{
            const userLoginInfo = request.userLoginInfo;
            const post = {
                title: request.body.title || "",
                content: request.body.content
            }    
            const createdPost = await PostService.createPost(post, userLoginInfo);
            return response.status(201).json(createdPost);
        } catch(error){
            console.error('Error creating post:', error);
            return response.status(500).json({ message: error.message });
        }

    },

    updatePost: async (request , response) => {
        try {
            const userLoginInfo = request.userLoginInfo;
            const updatedPost = {
                postId: request.params.id,
                title: request.body.title,
                content: request.body.content,
            }
            const post = await PostService.updatePost(updatedPost, userLoginInfo);
            return response.status(200).json(post);

        } catch(error){
            console.error('Error updating post:', error);
            return response.status(500).json({ message: error.message });
        }
    
    },

    deletePost: async (request , response) => {
        try {
            const userLoginInfo = request.userLoginInfo;
            const postId = request.params.id; 

            await PostService.deletePost(postId, userLoginInfo);

            return response.status(200).json({message: "post deleted successfully"});

        } catch(error){
            console.error('Error updating post:', error);
            return response.status(500).json({ message: error.message });
        }
    
    },
    getPosts: async (request, response) => {
        return response.status(200).json(request.paginationResults);
    }


}

export default postController;