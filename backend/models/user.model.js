const {sequelize} = require ('sequelize');

const userModel = sequelize.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userModel.plugin(uniqueValidator);

module.exports = sequelize.model('User', userModel);