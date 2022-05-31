const { DataTypes } = require('sequelize');
const sequelize = require("../config/DBconnection");

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    pseudo: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true,
    },
    firstname: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
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

module.exports = User;

console.log(User === sequelize.User);
