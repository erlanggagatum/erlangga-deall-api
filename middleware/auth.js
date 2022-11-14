
require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function authorizeUser(req, res, next) {
  // get header
  const header = req.headers['authorization']
  req.authorizationHeader = header

  // check if access token is given with Bearer token format
  const accessToken = header && header.split(" ")[1] //Bearer token
  if (!accessToken) {
    res.status(401).json({message: 'Unauthorized! No access token given!'})
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({message: 'Unauthorized! Token is expired!'})
    req.user = user
    console.log(user)
    next()
  })
}