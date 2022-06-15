'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, comment, like }) {
      //this.belongsTo(user, { as: "pseudo", foreignKey: "userPseudo" });
      this.hasMany(comment, { onDelete: "cascade", onUpdate: "cascade" });
      this.hasOne(like, {onDelete: "cascade", onUpdate: "cascade"})
    }
  };
  post.init({
    userPseudo: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};