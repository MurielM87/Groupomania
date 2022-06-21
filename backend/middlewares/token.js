const JWT = require("jsonwebtoken")
require("dotenv").config()

function issueJWT(user) {
  const id = user.id
  const expiresIn = "24H"
  const payload = {
    sub: id,
    iat: Date.now(),
  }
  // creation of token with userID include as a payload
  // and the secret KEY in the .env file
  const signedToken = JWT.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: expiresIn,
  })

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  }
}
function getUserId(req) {
  // get token of request in headers
  const token = req.headers.authorization.split(" ")[1]
  const decodedToken = JWT.verify(token, process.env.SECRET_TOKEN)
  // jsonWebToken will compare this token with
  // the secret Key in .env file
  const userId = decodedToken.sub
  // jsonWebToken will extract the userId
  return userId
}

module.exports.issueJWT = issueJWT
module.exports.getUserId = getUserId