const http = require('http');
var fs = require('fs');
const url = require('url');
const passport = require('passport');
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./routes/index')(app);
const controller = require('./controllers/controller');
var Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
//ejs engine setting
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// DB연동
mongoose.connect('localhost/test');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(callback){
  console.log("MongoDB connected,,,")
});
require('./passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

var memberSchema = new Schema({
  'name': String,
  'id': String,
  'pw': String
});

var Member = mongoose.model('member', memberSchema);
/*
var newMember = new Member();
newMember.name = "홍은비";
newMember.id = "bee";
newMember.pw = "1";
newMember.save(function(err){
  if(err) console.log("fail");
  else console.log("success");
});
*/
Member.findOne({id:'bee'}, function(err, docs){
  console.log(docs);
});

var server = app.listen(3000, function(){
  console.log('Server running ');
});
// Server 생성(?)
/*
http.createServer(function(req, res){
  var pathname = url.parse(req.url).pathname;

  console.log("Request for " + pathname + " received.");

  //app.use('/', route);
  if(pathname=="/"){
    pathname = "/login.html";
    console.log("go "+pathname);
  }
  app.get('/', function(req, res){
    res.send('Hello World');
  });

  fs.readFile(pathname.substr(1), function(err, data){
    if(err){
      console.log(err);
    }else{
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write(data.toString());
    }

    res.end();
  });
}).listen(3000);
*/
