const mongoose = require('mongoose');
var db;

module.exports = () =>{

  function connect(){
    mongoose.connect('localhost:27017', function(err){
      if(err){
        console.error("에러",err);
      }
      console.log("연결성공");
    });
  }
  connect();
  //mongoose.connection.on('disconnected',connect);
  require('./model/member');

};
