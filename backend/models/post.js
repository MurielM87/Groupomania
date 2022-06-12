'use strict'

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('post', {
         idpost: {
             type: DataTypes.INTEGER.UNSIGNED,
             autoIncrement: true,
             primaryKey: true,
             allowNull: false
         },
         user_id: {
             type: DataTypes.INTEGER,
             allowNull: false,
         },
         user_pseudo: {
             type: DataTypes.STRING,
             allowNull: false
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