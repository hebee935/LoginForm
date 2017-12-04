const mongodb = require('../db');
const Member = require('../model/member');

exports.authLogin = function(query, callback){
  Member.find(query, function(err, results){
    if(err){
      callback(err, null);
      return;
    }
    if(results.length > 0){
      callback(null,results);
    }else{
      callback(null, 0);
    }
  });
}

exports.addMember = function(name, id, pw, callback){
  var newMember = new Member();
  newMember.name = name;
  newMember.id = id;
  newMember.pw = pw;
  newMember.save(function(err){
    if(err){
      console.log("fail");
      callback(err, null);
      return;
    }
    else{
      console.log("success");
      callback(null, null);
    } 
  });
}