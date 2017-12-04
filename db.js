/*
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect('localhost/test');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(callback){
  console.log("MongoDB connected,,,")
});

var memberSchema = new Schema({
  'name': String,
  'id': String,
  'pw': String
});

var Member = mongoose.model('member', memberSchema);
*/