
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('localhost/test');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(callback){
  console.log("MongoDB connected,,,")
});