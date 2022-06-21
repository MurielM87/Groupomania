"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.Comment.belongsTo(models.Post, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: "CASCADE",
        })
    }
  }
  Comment.init(
    {
      message: { type: DataTypes.TEXT, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  )
  return Comment
}