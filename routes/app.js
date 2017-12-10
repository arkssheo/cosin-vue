var express = require('express')
var router = express.Router()

var Role = require('../models/role')

router.get('/roles', (req, res, next) => {
  Role.find({}, (err, roles) => {
    if (err) {
      return res.status(500).json({
        message: 'An error occurred',
        errors: err
      })
    }
    return res.status(200).json({
      roles: roles
    })
  })
})

router.get('/', (req, res, next) => {
  res.render('index')
})

module.exports = router
