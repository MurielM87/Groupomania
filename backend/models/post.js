'use strict'

const Users = require('./user')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        //    references: {
        //        model: Users,
        //        key: 'id',
        //        onDelete : 'CASCADE',
        //        onUpdate : 'CASCADE'
        //    }
        },
        userPseudo: {
            type: DataTypes.STRING,
            allowNull: false,
        //    references: {
        //        model: Users,
        //        key: 'pseudo',
        //        onDelete : 'CASCADE',
        //        onUpdate : 'CASCADE'
        //    }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true,
            maxlenght: 100
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            trim: true,
            maxlenght: 1000
        },
        imageUrl: {
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
        },
        published: {
            type: DataTypes.BOOLEAN
        }
    },
        {
            underscored: true,
            paranoid: true,
        });

    
}
    