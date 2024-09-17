import { sequelize, DataTypes } from '../../config/sequelize.mjs';

const PostLike = sequelize.define('postLike', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'users', // Ensure this matches the name of your users table
            key: 'userId'
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'posts', // Ensure this matches the name of your users table
            key: 'postId'
        }
    }   
}, {
    createdAt: true,
    updatedAt: false
})
export default PostLike;