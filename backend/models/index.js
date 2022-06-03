'use strict';

const DBconnection = require('../config/DBconnection.js');
const {Sequelize, DataTypes} = require('sequelize');
const path = require('path');
const basename = path.basename(__filename);
const fs = require("fs");
const db = {} 

//console.log(DBconnection);

const sequelize = new Sequelize(
    DBconnection.DB, 
    DBconnection.USER,
    DBconnection.PASSWORD, {
        host: DBconnection.HOST,
        dialect: DBconnection.dialect,
        operatorsAliases: false,

        pool: {
            max: DBconnection.pool.max,
            min: DBconnection.pool.min,
            acquire: DBconnection.pool.acquire,
            idle: DBconnection.pool.idle
        }
    }
)

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

db.Sequelize = Sequelize
db.sequelize = sequelize



sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully')
    })
    .catch(err => {
        console.log('Unable to connect to the databasse' + err)
    });


db.users = require('./user.model.js')(sequelize, DataTypes)
db.posts = require('./post.model.js')(sequelize, DataTypes)
db.comments = require('./comment.model.js')(sequelize, DataTypes)
db.authenticate = require('./authorisation.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('re-sync done')
    })
    

//all associations
//authorisations
db.authorisation.hasMany(db.users);
//users
db.users.belongsTo(db.authorisation)


module.exports = db

/*

db.users.hasMany(db.posts, {
  foreignKey: 'user_id',
  as: 'post'
});

db.posts.belongsTo(db.users, {
  foreignKey: 'user_id',
  as: 'user'
})*/

/*

db.User.hasMany(db.Post, {
  onDelete: "CASCADE",
});
db.Post.belongsTo(db.User);


db.Post.hasMany(db.Like, {
  onDelete: 'cascade',
  foreignKey: { name: 'PostId', allowNull: false },
  hooks: true });

db.Like.belongsTo(db.User, {
  onDelete: "CASCADE",
  foreignKey: { name: "UserId", allowNull: false },
  hooks: true,
});

db.Like.belongsTo(db.Post, {
  onDelete: "CASCADE",
  foreignKey: { name: "PostId", allowNull: false },
  hooks: true,
});

module.exports = db;
*/