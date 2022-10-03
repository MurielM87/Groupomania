"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Support extends Model {
    static associate(models) {
      // define association
      models.Support.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.Support.belongsTo(models.Post, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: "CASCADE",
        })
    }
  }
  Support.init(
    {
      isSupport: {type: DataTypes.BOOLEAN, allowNull: false, default: false}
    },
    {
      sequelize,
      modelName: "Support",
    }
  )
  return Support
}