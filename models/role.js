var mongoose = require('mongoose')
var Schema = mongoose.Schema
var mongooseUniqueValidator = require('mongoose-unique-validator')

var schema = new Schema({
  name: {type: String, required: true},
  isAdmin: {type: Boolean, required: true}
})

schema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Role', schema)
