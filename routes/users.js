var express = require('express');
var router = express.Router();

// prisma client import (ORM Library)
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()


/* GET users listing. */
router.get('/', async (req, res, next) => {
  // get all user
  const users = await prisma.user.findMany()
  res.status(200).json({status:"OK", data: users});
});


/* GET users listing. */
router.get('/:id', async (req, res, next) => {
  // get all user
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: parseInt(req.params.id)
    }
  })
  res.status(200).json({status:"OK", data: user});

});

// POST User
router.post("/", async (req, res) => {
  
  // Get user data from POST request
  const { user } = req.body
  console.log(user)
  
  try {

    if (user.length > 1) {
      var userCreate = await prisma.user.createMany({
        data: user
      })
    } else {
      var userCreate = await prisma.user.create({
        data: user
      })
    }
    
    res.status(200).json({user: user, userCreate: userCreate})
  } catch (error) {
    res.status(500).json(error)
  }
})

// PUT / update user data
// also working with PATCH method
router.put('/:id', async (req, res) => {
  const user = req.body
  console.log(user, req.params.id)
  try {
    const userUpdate = await prisma.user.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: user
    })
    res.status(200).json({user: user, userUpdate: userUpdate})
  } catch (error) {
    res.status(500).json(error)
  }
})

// DELETE user data
router.delete("/:id", async (req, res) => {
  try {
    const userDelete = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.status(200).json({userDelete: userDelete})
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
