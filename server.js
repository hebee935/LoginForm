const http = require('http');
const fs = require('fs');
const url = require('url');
const passport = require('passport');
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const route = require('./routes/index')(app, fs);
const controller = require('./controllers/controller');
var Schema = mongoose.Schema;
var flash = require('connect-flash');
//var db = require('./db.js');
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
//ejs engine setting
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
/*

require('./passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

*/

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

app.use('/', router);

//Server run
var server = app.listen(3000, function(){
  console.log('Server running ');
});

router.route('/loginCheck').post(function(req, res){
  var id = req.body.pushID;
  var pw = req.body.pushPW;
  controller.authLogin(Member, {"id":id, "pw":pw}, function(err, results){
    if(err){
      console.log("fail");
      console.log(err);
      return;
    }
    if(results.length > 0){
      console.log("id = "+results[0]._doc.id);
      console.log("pw = "+results[0]._doc.pw);
      console.log("name = "+results[0]._doc.name);
      res.render('loginCheck.html');
    }else{
      
    }
  });
});

router.route('/joinCheck').post(function(req, res){

  var newMember = new Member();
  newMember.name = req.body.pushNAME;
  newMember.id = req.body.pushID;
  newMember.pw = req.body.pushPW;
  newMember.save(function(err){
    if(err) console.log("fail");
    else console.log("success");
  });
  
  res.render('joinCheck.html');
});