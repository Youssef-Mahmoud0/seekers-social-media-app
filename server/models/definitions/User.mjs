import { sequelize, DataTypes } from '../../config/sequelize.mjs';
import CommentLike from './CommentLike.mjs';
import PostLike from './PostLike.mjs';
import Friendship from './FriendShip.mjs';

const User = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(320),
        allowNull: false,
        unique: true
    },
    bio: DataTypes.TEXT,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    profilePicture:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'uploads/profile-pictures/default-profile-picture.png'
    },
}, {
    timestamps: false
})

User.associate = async (models) => {
    const { post, comment, session, user ,  } = models;
    
    user.hasMany(post, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    user.hasMany(comment, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    user.hasMany(session, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    user.belongsToMany(post, { through: PostLike, as: 'LikedPosts', foreignKey: 'userId' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    user.belongsToMany(comment, { through: CommentLike, as: 'LikedComments', foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    user.belongsToMany(user, { as: 'Friends', through: Friendship, foreignKey: 'userId1', otherKey: 'userId2' });
    user.belongsToMany(user, { as: 'FriendsOf', through: Friendship, foreignKey: 'userId2', otherKey: 'userId1' });
}


export default User;