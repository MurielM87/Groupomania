module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define('comment', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_pseudo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            trim: true,
            maxlenght: 500
        },
        imageUrl: {
            type: DataTypes.STRING,
            trim: false
        },
        videoUrl: {
            type: DataTypes.STRING,
            trimm: false
        },
        createdAt: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        },
        published: {
            type: DataTypes.BOOLEAN
        }
    })

    return Comment
}

