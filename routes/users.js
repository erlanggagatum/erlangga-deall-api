var express = require('express');
var router = express.Router();

// prisma client import (ORM Library)
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()



/* GET users listing. */
router.get('/', async (req, res, next) => {
  // get all user
  const users = await prisma.user.findMany()
  res.status(200).json(users);

});

router.post("/", async (req, res) => {
  // generate random user
  const user = await prisma.user.create({
    data: {
      email: "gtm2@mail.com",
      name: "gatum2",
      password: "mypassword2",
      posts: { 
        create: {
          title: "my first post",
          content: "wow, this is great!"
        } 
      }
    }
  })

  res.status(200).json(user)
})

module.exports = router;
