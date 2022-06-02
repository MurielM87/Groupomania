const DBconnection = require('../config/DBconnection.js');

const {Sequelize, DataTypes} = require('sequelize');

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

sequelize.authenticate()
    .then(() => {
        console.log('database connected')
    })
    .catch(err => {
        console.log('Error' + err)
    });

const db = {} 

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user.model.js')(sequelize, DataTypes)
db.posts = require('./post.model.js')(sequelize, DataTypes)
db.comments = require('./comment.model.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('re-sync done')
    })
    

module.exports = db

