'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SuiteSchema = new Schema({
  userName: {
    type: String,
    required: "userName Required"
  },
  userID: {
    type: String,
    required: "userID Required"
  },
  name: {
    type: String,
    required: 'SuiteName is Required'
  },
  baseURI: {
    type: String,
    required: 'BaseURI is required'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  tests: [{
          expect:{type:String},
          name:{type:String},
          method:{type:String},
          path:{type:String},
          reqBody:{type:String}
        }
  ]
});

module.exports = mongoose.model('Suite', SuiteSchema);