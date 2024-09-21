import PostService from '../services/postService.mjs';

const postController = {
    getUserPosts: async (request, response) => {
        try{
            const userId = request.userId;
            const posts = await PostService.getUserPosts(userId);
            return response.status(200).json(posts);
        } catch(error){
            console.error('Error getting posts:', error);
            return response.status(422).json({ message: error.message });
        }
    },

    createPost: async (request, response) => {
        try{

            const userId = request.userId;
            const postContent = request.body.content;
            const mediaFiles = (request.files || []).map(file => ({
                mediaType: file.mimetype.startsWith('image') ? 'image' : 'video',
                path: file.path.replaceAll('\\', '/'),
            }))

            const createdPost = await PostService.createPost(postContent, mediaFiles, userId);
            return response.status(201).json(createdPost);
        } catch(error){
            console.error('Error creating post:', error);
            return response.status(500).json({ message: error.message });
        }

    },

    updatePost: async (request , response) => {
        try {
            const userId = request.userId;
            const postId = +request.params.postId;
            const postContent = request.body.content;
            const existingMediaFiles = (request.body.existingMediaFiles || []).map(fileString => (JSON.parse(fileString)));

            const newMediaFiles = (request.files || []).map(file => ({
                mediaType: file.mimetype.startsWith('image') ? 'image' : 'video',
                path: file.path.replaceAll('\\', '/'),
            }))    
            const mediaFiles = [...existingMediaFiles, ...newMediaFiles];

            const post = await PostService.updatePost(postContent, postId, mediaFiles, userId);
            return response.status(200).json(post);

        } catch(error){
            console.error('Error updating post:', error);
            return response.status(500).json({ message: error.message });
        }
    
    },

    deletePost: async (request , response) => {
        try {
            const userId = request.userId;
            const postId = +request.params.postId; 

            await PostService.deletePost(postId, userId);

            return response.status(200).json({message: "post deleted successfully"});

        } catch(error){
            console.error('Error updating post:', error);
            return response.status(500).json({ message: error.message });
        }
    
    },


    getPostsByPagination: async (request, response) => {
        const userId = request.userId;
        const page = +request.query.page || 1;
        const limit = +request.query.limit || 10;

        try{
            const paginationResults = await PostService.getPostsByPagination(userId, page, limit);
            return response.status(200).json(paginationResults);
        }catch(error){
            console.error('Error getting posts:', error);
            return response.status(422).json({ message: error.message });
        }
    },



    likePost: async (request, response) => {
        try{
            const userId = request.userId;
            const postId = +request.params.postId;

            const likes = await PostService.likePost(postId, userId);
            return response.status(200).json( likes );
        }
        catch(error){
            console.error('Error Liking The Post:', error);
            return response.status(400).json({ message: error.message });
        }
    },

    unlikePost: async (request, response) => {
        try{
            const userId = request.userId;
            const postId = +request.params.postId;

            const likes = await PostService.unlikePost(postId, userId);
            return response.status(200).json( likes );
        }
        catch(error){
            console.error('Error unLiking The Post:', error);
            return response.status(400).json({ message: error.message });
        }
    },

    getPostLikes: async (request, response) => {
        try{
            const postId = +request.params.postId;

            const likes = await PostService.getPostLikes(postId);
            return response.status(200).json( likes );
        }
        catch(error){
            console.error('Error getting likes for the post:', error);
            return response.status(400).json({ message: error.message });
        }
    },

    getUserPostsByPagination: async(request,response) => {
        const page = +request.query.page  ||1;
        const limit = +request.query.limit  ||10;
        const userId = +request.params.userId;
        try{
            const paginationResults = await PostService.getlUserPostsByPagination(page, limit, userId);
            return response.status(200).json(paginationResults);
        }catch(error){
            console.error('Error getting user posts:', error);
            return response.status(422).json({ message: error.message });
        }
    }

}

export default postController;






