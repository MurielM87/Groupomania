const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize } = require('sequelize');
const dotenv = require('dotenv').config('../.env');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const DBconnection = require('./config/DBconnection');
const { application } = require('express');
const app = express();
app.use(express.json());
app.use(cookieParser)
app.use(logger('dev'));

app.use((req, res, next) => {
  //authorization to access to the API
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
  //headers accepted
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //methods accepted
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //scripts accepted
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next();
});


//Routers
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');

app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(cors()), //access to the API for everybody
app.use('/images', express.static(path.join(__dirname, 'images'))),



module.exports = app