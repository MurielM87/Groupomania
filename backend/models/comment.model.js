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
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false
    },
    user_pseudo: {
        type: DataTypes.STRING,
        autoIncrement: true,
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
    }
})

module.exports = Post;