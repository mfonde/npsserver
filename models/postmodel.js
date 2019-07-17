module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
        park: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Post;
}