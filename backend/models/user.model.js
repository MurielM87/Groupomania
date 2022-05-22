const { isModelListener } = require('@vue/shared');
const {Sequelize, DataTypes} = require ('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const {sequelize} = require('../DBconnection');

module.exports = (sequelize, DataTypes) => 
    sequelize.define('user', {
        email: {type: DataTypes.STRING, required: true, unique: true},
        password: {type: DataTypes.STRING, required: true},
        lastname: {type: DataTypes.STRING, required: true},
        firstname: {type: DataTypes.STRING, required: true},
        pseudo: {type: DataTypes.STRING, required: true, unique: true}
}, {
   /* classMethods: {
        associate: function(models) {
            //associations can be defined here
           //models.user.model.hasMany(models.message) //à changer de place
        }
    }*/
});



console.log(user === sequelize.userModel);