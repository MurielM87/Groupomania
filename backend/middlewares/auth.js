const jwt = require("jsonwebtoken")
require("dotenv").config()


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, process.env.TOKEN)
    const userId = decodedToken.userId;
    req.auth= { userId }
    console.log('decoded', decodedToken);
    console.log('req', req.body);
    console.log('userID', userId);
    console.log('req.auth', req.auth);
    
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable';
    } else {
      next()
    }
  } catch (error) {
    console.log("error sur auth")
    console.log(error)
    res.status(401).json({error: error | 'rêquete non authentifiée'});
  }
}