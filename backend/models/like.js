'use strict'

const Users = require('./user')
const Posts = require('./post')
const Comments = require('./comment')

module.exports = (sequelize, DataTypes) => {

    return sequelize.define('like', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        //    references: {
        //        model: Posts,
        //        key: 'id',
        //        onDelete : 'CASCADE',
        //        onUpdate : 'CASCADE'
        //     }  
        },
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        //    references: {
        //        model: Comments,
        //        key: 'id',
        //        onDelete : 'CASCADE',
        //        onUpdate : 'CASCADE'
        //     }  
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        //    references: {
        //        model: Users,
        //        key: 'id',
        //        onDelete : 'CASCADE',
        //        onUpdate : 'CASCADE'
        //     }  
        },
        userPseudo: {
            type: DataTypes.STRING,
            allowNull: false,
        //    references: {
        //        model: Users,
        //        key: 'pseudo',
        //        onDelete : 'CASCADE',
        //        onUpdate : 'CASCADE'
        //     }  
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