const JWT = require("jsonwebtoken")
require("dotenv").config()

function issueJWT(user) {
  const id = user.id
  const expiresIn = "12H"
  const payload = {
    sub: id,
    iat: Date.now(),
  }
  
  const signedToken = JWT.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: expiresIn,
  })

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  }
}
function getUserId(req) {
  const token = req.headers.authorization.split(" ")[1]
  const decodedToken = JWT.verify(token, process.env.SECRET_TOKEN)
  const userId = decodedToken.sub
  return userId
}

module.exports.issueJWT = issueJWT
module.exports.getUserId = getUserId