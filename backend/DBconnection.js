const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('${process.env.SQL_NOM}', '${process.env.SQL_Pseudo}', '${process.env.SQL_Password}', {
    host: '${process.env.SQL_Host}',
    dialect: '${process.env.SQL_Dialect}'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully');
} catch (error) {
    console.error('Unable to connect to the database', error);
};