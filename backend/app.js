const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const {sequelize} = require('sequelize');
const userRoutes = require("./routes/user.routes.js");
const dotenv = require('dotenv').config('../.env')

const mysql = require('./config/DBconnection');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  //authorization to access to the API
  res.setHeader('Access-Control-Allow-Origin', '*');
  //headers accepted
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //methods accepted
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //scripts accepted
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

app.use(cors()); //access to the API for everybody
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/userSignUp", userRoutes);

module.exports = app;