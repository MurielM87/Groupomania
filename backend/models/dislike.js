"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Dislike extends Model {
    static associate(models) {
      // define association
      models.Dislike.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.Dislike.belongsTo(models.Post, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: "CASCADE",
        })
    }
  }
  Dislike.init(
    {    
      isDislike: {type: DataTypes.BOOLEAN, allowNull: false, default: false}
    },
    {
      sequelize,
      modelName: "Dislike",
    }
  )
  return Dislike
}