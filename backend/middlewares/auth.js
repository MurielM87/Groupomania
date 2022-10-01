const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
  try {    
    const token = req.cookies.token
    if(token) {
      const decodedToken = jwt.verify(token, process.env.TOKEN)
      req.user = decodedToken
      next()
    }
  } catch (error) {
    res.status(401).json({error: error | 'rêquete non authentifiée'});
  }
}