import { sequelize, DataTypes } from '../../config/sequelize.mjs';


const Comment = sequelize.define('comment', {
    commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likersCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
})

Comment.associate = async (models) => {
    console.log(models);
    const { user, post, comment, commentLike } = models;
    comment.belongsToMany(user, { through: commentLike, as: 'Likers', foreignKey: 'commentId' });
    comment.belongsTo(post, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    comment.belongsTo(user, { foreignKey: 'userId', as: 'Author' }); // new association


}

export default Comment;