const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const path = require("path")
require("dotenv").config()
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express()

app.use(cors({
  origin: `http://localhost:8080`, credentials: true
}))

app.use(express.json())
app.use(cookieParser());
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true }))

/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});*/

app.use(helmet())

//routes
const userRouter = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")

//database
const { sequelize } = require("./models/index")
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion to database is a success !")
  })
  .catch((error) => console.log(`Failed to access database : ${error}`))

sequelize
  .sync()
  .then(() => {
    console.log("connection successfully !")
  })
  .catch((error) => console.log(`connection unsuccessfully  : ${error}`))

app.use("/images/", express.static(path.join(__dirname, "images")))
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)

module.exports = app