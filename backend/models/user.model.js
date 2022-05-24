// const { isModelListener } = require('@vue/shared');
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
// module.exports = (sequelize, DataTypes) =>
//     sequelize.define('signup', {
//         user_id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         pseudo: {
//             type: DataTypes.STRING,
//             required: true,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*'-)$/i,
//                 isFloat: true,
//                 isDecimal: true,
//                 isLowercase: true,
//                 isUppercase: true,
//                 notNull: {
//                     msg: 'Merci de choisir un pseudo'
//                   },
//                 notEmpty: true,
//             }
//         },
//         email: {
//             type: DataTypes.STRING,
//             required: true,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
//                 isFloat: true,
//                 isDecimal: true,
//                 isLowercase: true,
//                 isUppercase: false,
//                 notNull: {
//                     msg: 'Entrer votre email'
//                   },
//                 notEmpty: true,
//             }
//         },
//         firstname: {
//             type: DataTypes.STRING,
//             required: true,
//             allowNull: false,
//             validate: {
//                 is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*'-)$/i,
//                 isFloat: true,
//                 isDecimal: true,
//                 isLowercase: true,
//                 isUppercase: true,
//                 notNull: {
//                     msg: 'Entrer votre prénom'
//                   },
//                 notEmpty: true,
//             }
//         },
//         lastname: {
//             type: DataTypes.STRING,
//             required: true,
//             allowNull: false,
//             validate: {
//                 is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*'-)$/i,
//                 isFloat: true,
//                 isDecimal: false,
//                 isLowercase: false,
//                 isUppercase: false,
//                 notNull: {
//                     msg: 'Entrer votre nom'
//                   },
//                 notEmpty: true,
//             }
//         },
//         password: {
//             type: DataTypes.STRING,
//             required: true,
//             allowNull: false,
//             validate: {
//                 is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/i,
//                 isFloat: true,
//                 isDecimal: true,
//                 isLowercase: true,
//                 isUppercase: true,
//                 notNull: {
//                     msg: 'Choississez un mot de passe fort'
//                   },
//                 notEmpty: true,
//             }
//         }
//     }, { sequelize });

// (async () => {
//     await sequelize.sync({ force: true });
// })();

// console.log(signup === sequelize.userSignUp);