const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const app = express();
app.use(express.json());
app.use(cookieParser)
app.use(logger('dev'));


//Routers
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');


app.use('/api', userRouter, postRouter);


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(cors()), 
app.use('/images', express.static(path.join(__dirname, 'images'))),



module.exports = app