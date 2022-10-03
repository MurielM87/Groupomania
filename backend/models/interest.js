"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    static associate(models) {
      // define association
      models.Interest.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.Interest.belongsTo(models.Post, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: "CASCADE",
        })
    }
  }
  Interest.init(
    {
      isInterest: {type: DataTypes.BOOLEAN, allowNull: false, default: false}
    },
    {
      sequelize,
      modelName: "Interest",
    }
  )
  return Interest
}