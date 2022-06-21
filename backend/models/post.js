"use strict"
const { Model } = require("sequelize")
const { all } = require("../app")

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.Post.hasMany(models.Comment)
      models.Post.hasMany(models.Like)
    }
  }
  Post.init(
    {
      title: {type: DataTypes.STRING, allowNull: false},
      post: { type: DataTypes.TEXT, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,

      modelName: "Post",
    }
  )
  return Post
}