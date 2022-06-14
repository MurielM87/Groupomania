'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    pseudo: {
        type: DataTypes.STRING,
        isAlphanumeric: true,
        required: true,
        allowNull: true,
        unique: true,
        len: [3, 20]
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
    email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true,
        isEmail: true,
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        required: true,
        allowNull: false,
        defaultValue: DataTypes.DATETIME,
    },
    updatedAt: {
        type: DataTypes.DATE,
        required: true,
        allowNull: false,
        defaultValue: DataTypes.DATETIME,
    },
    deletedAt: {
        type: DataTypes.DATE,
        required: true,
        allowNull: true,
        //defaultValue: DataTypes.DATETIME
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        required: true,
        allowNull: false,
        defaultValue: false,
    }
},
{
    
    paranoid: true,
});

};
