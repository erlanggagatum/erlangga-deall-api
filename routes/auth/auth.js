require('dotenv').config() // import .env file

var express = require('express');
var router = express.Router();

// import jwt library
const jwt = require('jsonwebtoken')

// Init prisma client for ORM
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

let validRefreshTokens = []

// LOGIN
router.post('/login', async (req, res) => {
  // get user
  const user = req.body

  // authenticate user
  const login = await prisma.user.findFirst({
    where: {
      AND : [
        {
          email: user.email,
        },
        {
          password: user.password,
        }
      ]
    }
  })
  
  if (!login) {
    res.status(500).json({
      success: false,
      message: "Credential doesn't match with our records!"
    })
  } else {

    console.log(login)
    // if user available, generate jwt with 1h of expiration
    const accessToken = generateAccessToken(login)
    const refreshToken = generateRefreshToken(login)
  
    validRefreshTokens.push(refreshToken)
  
    console.log(validRefreshTokens)
  
    // return http 200 success
    res.status(200).json({
      success: true,
      message: "Login success!",
      data: {
        userReq: user,
        accessToken: accessToken, 
        refreshToken: refreshToken
      }
    })
  }

})

// REFRESH TOKEN
router.post('/refresh-token', (req, res) => {
  const token = req.body.token

  if(!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorize! No refresh token given"
    })
  } 

  // find if there is any valid token
  const tokenFound = validRefreshTokens.find(vt => vt == token)
  if(!tokenFound) {
    res.status(401).json({
      success: false,
      message: "Unauthorize! Refresh token is not valid"
    })
  }

  // if token available, generate new access token for user
  // first, decode the token
  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  
  // get auth user info from payload
  const authorize = {
    id: payload.id,
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: payload.role,
  }

  const newAccessToken = generateAccessToken(authorize)

  res.status(200).json({
    success: true,
    message: "Access token has been generated!",
    data: {
      accessToken: newAccessToken,
      payload: authorize
    }
  })
})

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30s"})
}
function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
}

// LOGOUT
router.post('/logout', (req, res) => {
  const token = req.body.token

  if (!token) return res.redirect('/')

  validRefreshTokens = validRefreshTokens.filter((val) => {
    return val !== token
  })

  console.log(token)
  console.log(validRefreshTokens)

  res.status(200).json({
    success: true,
    message: "Logout has successfully performed!"
  })

})

module.exports = router;