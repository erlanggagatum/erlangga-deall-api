var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

// MIDDLEWARE
const authMiddleware = require('../middleware/auth')

// prisma client import (ORM Library)
const { PrismaClient, Prisma } = require('@prisma/client');
const { transformDocument } = require('@prisma/client/runtime');
const prisma = new PrismaClient()


/* GET users listing. */
router.get('/', authMiddleware, async (req, res) => {

    const users = await prisma.user.findMany()
  
    res.status(200).json({
      success: true, 
      message: "Data has been retrieved succesfully!",
      data: {
        users: users
      }
    });
});


/* GET users listing. */
router.get('/:id', authMiddleware, async (req, res) => {
  // get user by ID
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: parseInt(req.params.id)
      }
    })

    res.status(200).json({
      success: true, 
      message: "Data has been retrieved successfully!",
      data: {
        user: user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: "There is an error when retrieving your data!",
      error: error,
      data: {}
    });
  }

});

// POST User or Create new User
router.post("/", authMiddleware, async (req, res) => {
  // Check whether user is admin or not
  if (req.user.role !== "admin") {
    return res.status(401).json({success: false, message: "User unauthorized!", data: {}})
  } 

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
    
    // res.status(200).json({user: user, userCreate: userCreate})
    res.status(200).json({
      success: true, 
      message: "Data has been created!",
      data: {
        userRequest: user, 
        userCreate: userCreate
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is an error when creating your data!",
      error: error,
      data: {}
    })
  }
})

// PUT / update user data
// also working with PATCH method
router.put('/:id', authMiddleware, async (req, res) => {
  
  // Check whether user is admin or not
  if (req.user.role !== "admin") {
    return res.status(401).json({success: false, message: "User unauthorized!", data: {}})
  }

  const user = req.body
  console.log(user, req.params.id)
  try {
    const userUpdate = await prisma.user.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: user
    })
    res.status(200).json({
      success: true,
      message: "The data has been updated!",
      data: {
        user: user, 
        userUpdate: userUpdate
      }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is an error when updating your data!",
      error: error,
      data: {}
    })
  }
})

// DELETE user data
router.delete("/:id", authMiddleware, async (req, res) => {
  // Check whether user is admin or not
  if (req.user.role !== "admin") {
    return res.status(401).json({success: false, message: "User unauthorized!", data: {}})
  } 

  try {
    const userDelete = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.status(200).json({
      success: true,
      message: "The data has been deleted!",
      data: {
        userDelete: userDelete
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is an error when deleting your data!",
      error: error,
      data: {}
    })

  }
})

module.exports = router;
