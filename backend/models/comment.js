'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({like}) {
      // define association here
      this.hasOne(like, {onDelete: "set null"})
    }
  }
  comment.init({
    postId: DataTypes.INTEGER,
    userPseudo: DataTypes.STRING,
    content: DataTypes.TEXT,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};