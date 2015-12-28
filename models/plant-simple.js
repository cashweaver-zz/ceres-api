'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  minTemp: Number,
  maxTemp: Number
});

module.exports = mongoose.model('Plant', schema);
