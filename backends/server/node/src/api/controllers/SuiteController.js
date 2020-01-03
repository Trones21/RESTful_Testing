'use strict';

var mongoose = require('mongoose'),
bodyParser = require('body-parser'),
Suite = mongoose.model('Suite');

exports.list_all_Suites = function(req, res){
    Suite.find({userID: req.header("userID")})
    .select({name: -1})
    .exec(function(err, suites){
        if(err)
        {
            res.send(err);
        }
        res.json(suites);      
    });
};

exports.create_a_Suite = function(req, res){
    // var t = 1;
    // if( t = 1)
    // {
    //  var NameOnly = new Suite()
    //  new_Suite.save(function(err, Suite){
    //     err ? res.send(err) : res.json(Suite);   
    //  });
    // }
    // else
    // {
    
    var new_Suite = new Suite(req.body);
    new_Suite.save(function(err, Suite){
        err ? res.send(err) : res.json(Suite); 
    });
//}
};

exports.update_a_Suite = function(req, res) {
    Suite.findOneAndUpdate({_id: "PK_fix"}, req.body, {new: true}, function(err, suite){
        if (err)
        {
            res.send(err);
        }
        res.json(suite);
    });
  };

  exports.get_a_Suite = function(req, res) {
    var ID = req.body.suiteID
    Suite.findById({_id: ID}, function(err, suite) {
      if (err)
        {
        res.send(err);
        }
    res.json(suite);
    });
  };

  exports.delete_Suite = function(req, res){
      var ID = req.body.suiteID;
      Suite.findByIdAndDelete({_id: ID}, function(err){
        if(err){
            res.send(err);
        }
    res.json("{JSuccess}");
      });
  }