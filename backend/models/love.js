"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Love extends Model {
    static associate(models) {
      // define association
      models.Love.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.Love.belongsTo(models.Post, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: "CASCADE",
        })
    }
  }
  Love.init(
    {},
    {
      sequelize,
      modelName: "Love",
    }
  )
  return Love
}