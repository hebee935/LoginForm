const mongodb = require('../db');
const Member = require('../model/member');

exports.authLogin = function(model, query, callback){
  model.find(query, function(err, results){
    if(err){
      callback(err, null);
      return;
    }
    if(results.length > 0){
      callback(null,results);
    }else{
      
    }
  });
}
