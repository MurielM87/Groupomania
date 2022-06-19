const express = require('express');
const path = require('path');
const cors = require('cors');
const { sequelize } = require('./models/index');


const app = express();
app.use(express.json());


app.get('/', function (req, res) {
    res.send('hello world')
  })
app.get('/api', function (req, res) {
    res.send('coucou')
  })


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
//Routers
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

app.use('./upload', express.static(path.join(__dirname, './upload')));
app.use('/api', userRouter)
app.use('/api', postRouter)


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(cors()), 
app.use('/images', express.static(path.join(__dirname, 'images'))),

dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
dbTest();

module.exports = app