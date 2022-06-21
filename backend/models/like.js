"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // define association
      models.Like.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.Like.belongsTo(models.Post, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: "CASCADE",
        })
    }
  }
  Like.init(
    {},
    {
      sequelize,
      modelName: "Like",
    }
  )
  return Like
}