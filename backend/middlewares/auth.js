const jwt = require("jsonwebtoken")
require("dotenv").config()
const cookies = require("cookie-parser");


module.exports = (req, res, next) => {
  try {
    const token = req.headers.cookies.split(`=`)[1]
    if(token) {
      const decodedToken = jwt.verify(token, process.env.TOKEN)
      req.user = decodedToken
      next()
    }
  } catch (error) {
    console.log("error sur auth")
    console.log(error)
    res.status(401).json({error: error | 'rêquete non authentifiée'});
  }
}