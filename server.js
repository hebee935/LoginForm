const http = require('http');
const fs = require('fs');
const url = require('url');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const route = require('./routes/index')(app, fs);
const controller = require('./controllers/controller');
const Schema = mongoose.Schema;
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
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

app.use(cookieParser());
app.use(session({
  secret: 'belle',
  resave:true,
  saveUninitialized:true
}));

mongoose.connect('mongodb://localhost:27017/member');
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
  if(!req.session.member){
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
        req.session.member = {
          name:results[0]._doc.name,
          id:results[0]._doc.id,
          pw:results[0]._doc.pw,
          authorized:true
        }
        res.render('loginCheck.html',{name:req.session.member.name});
      }else{
        
      }
    });
  }else{
    res.render('login.html');
  }
});

/*
router.route('/loginCheck').post(passport.authenticate('local', {
  successRedirect: '/loginCheck.html',
  failureRedirect:'/login.html',
  failureFlash:true
}));
*/

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

router.route('/logOut').get(function(req, res){
  req.session.destroy(function(err){
    if(err) throw err;
    res.render('logOut.html');
  });
});