import Post from "./definitions/Post.mjs"
import User from "./definitions/User.mjs"
import Comment from "./definitions/Comment.mjs"
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

    static async getPostById(postId) {
        const post = await Post.findByPk(postId,{
            include: [
                {
                    model: User,
                    attributes: ['name', 'userId', 'profilePicture']
                }
            ]
        });
        if (!post) {
            throw new Error('Post Not Found');
        }


        return post;
    }

    static async createPost(postContent, mediaFiles, userId) {
        const post = await Post.create({
            content: postContent,
            userId: userId,
            mediaFiles: mediaFiles.length === 0 ? null : mediaFiles
        });

        if (!post) {
            throw new Error('Post not created');
        }

        const user = await post.getUser({
            attributes: ['name', 'userId', 'profilePicture']
        });

        post.dataValues.user = user;


        return post;
    }

    static async updatePost(postContent, postId, mediaFiles, userId) {
        const result = await Post.update({
            content: postContent,
            mediaFiles: mediaFiles.length === 0 ? null : mediaFiles
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
        console.log('Post Deleted');    
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

        await Post.increment('likersCount', { where: { postId } });

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
        
        await Post.decrement('likersCount', { where: { postId } });
        
    }

    static getPostLikes(post) {
        return post.likersCount;
    }

    static async getPostsByPagination(userId, limit, skip) {

        const posts = await Post.findAll({
            include: [  
                {
                    model: User,
                    attributes: ['name', 'userId']
                },
            ],
            limit,
            offset: skip,
            order: [['createdAt', 'DESC']],
        });

        // get the Ids of the liked posts by the user from this small set of posts
        const likedPostsIds = await PostLike.findAll({
            where: {
                postId: posts.map(post => post.postId),
                userId: userId
            },
            attributes: ['postId']
        }); 

        // Add the isLiked field to each post
        posts.forEach(post => {
            post.dataValues.isLiked = likedPostsIds.some(likedPost => likedPost.postId === post.postId);
        });        

        return posts;
    }

    static async getUserPostsByPagination(limit, skip, userId) {
        try {
            const posts = await Post.findAll({
                include: [
                    {
                        model: User, 
                        attributes: ['name', 'profilePicture'], 
                        where: {
                            userId: userId 
                        }
                    }
                ],
                limit: limit, 
                offset: skip,  // Apply offset for pagination
                order: [['createdAt', 'DESC']] // Order by creation date, descending
            });
    
            return posts; // Return the fetched posts
        } catch (error) {
            console.error('Error fetching user posts:', error);
            throw error; // Handle or re-throw the error
        }
    }


    static async getTotalPostsCount() {
        const totalPostsCount = await Post.count();
        return totalPostsCount
    }

}

export default PostModel;