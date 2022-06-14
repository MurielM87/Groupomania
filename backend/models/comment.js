'user strict'
const Users = require('./user')
const Posts = require('./post')

module.exports = (sequelize, DataTypes) => {

    return sequelize.define('comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        //    references: {
        //        model: Posts,
        //        key: 'id',
        //        onDelete : 'CASCADE',
        //        onUpdate : 'CASCADE'
        //    }  
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
        //     }  
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