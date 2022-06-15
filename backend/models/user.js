'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ post, comment, like }) {
      // define association here
      this.hasMany(post, { onDelete: "cascade", onUpdate: "cascade" })
      this.hasMany(comment, { onDelete: "cascade", onUpdate: "cascade" })
      this.hasMany(like, { onDelete: "cascade", onUpdate: "cascade" })
    }
  }
  User.init({
    pseudo: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};