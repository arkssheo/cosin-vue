var express = require('express')
var router = express.Router()
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

var User = require('../models/user')

router.post('', (req, res, next) => {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
    role: req.body.role,
    isAdmin: req.body.isAdmin
  })

  user.save((err, result) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred while saving the user',
        errors: err
      })
    }
    res.status(201).json({
      message: 'User created!',
      obj: result
    })
  })
})

router.post('/login', (req, res, next) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        errors: err
      })
    }
    if (!user) {
      return res.status(401).json({
        title: 'Login Failed',
        errors: { message: 'Invalid login credentials' }
      })
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login Failed',
        errors: { message: 'Invalid login credentials' }
      })
    }

    var token = jwt.sign({user: user}, 'secretkey', {expiresIn: '1h'})
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId: user._id
    })
  })
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        errors: err
      })
    }
    if (!user) {
      return res.status(401).json({
        title: 'Login Failed',
        errors: { message: 'Invalid login credentials' }
      })
    }

    res.status(200).json({
      user: user
    })
  })
})

module.exports = router
