var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var flash = require('connect-flash');

module.exports = function(app, fs){
  app.use(flash());
  app.get('/', function(req, res){
    res.render('login.html');
  });
  app.get('/signup', function(req, res){
    res.render('join.html');
  });
  app.post('/loggedIn', passport.authenticate('local', {
    successRedirect:'/loggedIn',
    failureRedirect: '/',
    failureFlash: true
  }));






  app.get('/list', function(req, res){
    fs.readFile(__dirname + "/../data/" + "member.json", 'utf8', function(err, data){
      res.end(data);
    });
  })
}
