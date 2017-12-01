const mongodb = require('../db');
const Member = require('../model/member');

mongodb();
exports.findOne = function(query, cb){
  //var member = mongodb.db.collection('member');
  Member.find(query), function(err, results){
    console.log(results)
    return cb(null, results[0]);
  };
}
