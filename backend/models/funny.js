"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Funny extends Model {
    static associate(models) {
      // define association
      models.Funny.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.Funny.belongsTo(models.Post, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: "CASCADE",
        })
    }
  }
  Funny.init(
    {},
    {
      sequelize,
      modelName: "Funny",
    }
  )
  return Funny
}