'use strict';

const DBconnection = require('../config/DBconnection.js');
const {Sequelize, DataTypes} = require('sequelize');
const path = require('path');
const basename = path.basename(__filename);
const fs = require("fs");
const db = {} 


const sequelize = new Sequelize(
    DBconnection.DB, 
    DBconnection.USER,
    DBconnection.PASSWORD, {
        host: DBconnection.HOST,
        dialect: DBconnection.dialect,

        pool: {
            max: DBconnection.pool.max,
            min: DBconnection.pool.min,
            acquire: DBconnection.pool.acquire,
            idle: DBconnection.pool.idle
        }
    }
)
db.Sequelize = Sequelize
db.sequelize = sequelize

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully')
    })
    .catch(err => {
        console.log('Unable to connect to the databasse' + err)
    });


    fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });
  
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });



db.Users = require('./user.js')(sequelize, DataTypes)
db.posts = require('./post.js')(sequelize, DataTypes)
db.comments = require('./comment.js')(sequelize, DataTypes)
db.likes = require('./like.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('re-sync done')
    })
    
/*
//all associations - foreignKey
//Users
db.Users.hasMany(db.posts, {
  foreignKey: "id",
  //foreignKey: "pseudo",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
db.posts.belongsTo(db.Users)

db.Users.hasMany(db.comments, {
  foreignKey: "id",
  foreignKey: "pseudo",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
db.comments.belongsTo(db.Users)

db.Users.hasMany(db.likes, {
  foreignKey: "id",
  foreignKey: "pseudo",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
db.likes.belongsTo(db.Users)

//Posts
db.posts.hasMany(db.comments, {
  foreignKey: "id"
})
db.comments.belongsTo(db.posts)

db.posts.hasMany(db.likes, {
  foreignKey: "id"
})
db.likes.belongsTo(db.posts)

//Comments
db.comments.hasMany(db.likes, {
  foreignKey: "id"
})
db.likes.belongsTo(db.comments)
*/


module.exports = db;