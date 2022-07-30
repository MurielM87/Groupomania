"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association
      models.User.hasMany(models.Post)
      models.User.hasMany(models.Comment)
      models.User.hasMany(models.Like)
    }
  }
  User.init(
    {
      pseudo: { type: DataTypes.STRING(50), allowNull: false },
      firstname: { type: DataTypes.STRING(50), allowNull: false },
      lastname: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      password: { type: DataTypes.STRING(150), allowNull: false },
      isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, default: false },
      imageUrl: {type: DataTypes.STRING(300),allowNull: true },
    },
    {
      sequelize,
      modelName: "User",
    },
    {}
  )
  return User
}