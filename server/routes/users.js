var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const Users = require('../models/users')

router.post('/', async function(req, res, next) {
  try {
    const newUser = new Users({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      emoji: req.body.emoji,
    })
    await newUser.save()
    return res.status(201).json("New user successfully created!")
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: "New user cannot be created...",
      error
    })
  }
});

router.post('/authenticate', async function(req, res, next) {
  try {
    const user = await Users.findOne({
      username: req.body.username
    })
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({msg: "Unable to authenticate the user with the entered data..."})
    }
    const token = jwt.sign({
      username: user.username
    }, 'TOP_SECRET')

    return res.status(200).json({
      msg: "User successfully authenticated.",
      token,
      username: user.username,
      emoji: user.emoji
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: "Error trying to authenticated...",
      error
    })
  }
});

module.exports = router;
