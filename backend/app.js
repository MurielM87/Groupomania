const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
const helmet = require("helmet")
require("dotenv").config()
const cookieParser = require('cookie-parser');


const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true }))

app.use(cors())
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

app.use("/api/upload", express.static(path.join(__dirname, "upload")))
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)

module.exports = app