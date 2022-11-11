require('dotenv').config() // import .env file

var express = require('express');
var router = express.Router();
const app = require('../app');

// Init prisma client for ORM
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// MIDDLEWARE
const authorizeUser = require('../middleware/auth')

// import jwt library
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Respond to POST request on the root route (/), the application’s home page: */
router.post('/', authorizeUser, function(req, res, next) {
  console.log(req.body)
  res.json({status:"OK", data:{user: req.user}})
})

/* Respond to a PUT request to the /user route: */
router.put('/', function(req, res, next) {
  res.send('Got a PUT request')
})

/* Respond to a DELETE request to the /user route: */
router.delete('/', function(req, res, next) {
  res.send('Got a DELETE request')
})

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
    res.status(403).json({error: "Credential doesn't match with our records!"})
  }
  console.log(login)
  // if user available, generate jwt with 1h of expiration
  const accessToken = jwt.sign(login, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30s"})

  res.status(200).json({userReq: user, login: login, accessToken: accessToken})
  
})

module.exports = router;
