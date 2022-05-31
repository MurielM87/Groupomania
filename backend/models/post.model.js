const { DataTypes } = require('sequelize');
const sequelize = require("../config/DBconnection");

const Post = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {

    },
    user_pseudo: {},
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        mawlenght: 100
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        trim: true,
        mawlenght: 100
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    videoUrl: {
        type: DataTypes.STRING
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
    }
})

module.exports = Post;