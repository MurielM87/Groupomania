const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
  try {    
    const token = req.cookies.token
    console.log("req.cookies", req.cookies)
    console.log("auth.js||cookie||token", token)
    if(token) {
      const decodedToken = jwt.verify(token, process.env.TOKEN)
      req.user = decodedToken
      console.log("decodedToken", decodedToken)
      next()
    }
  } catch (error) {
    console.log("error sur auth")
    console.log(error)
    res.status(401).json({error: error | 'rêquete non authentifiée'});
  }
}