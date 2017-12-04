const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const flash = require('connect-flash');


module.exports = function(app, fs){
  app.use(flash());
  app.get('/login', function(req, res){
    res.render('login.html');
  });
  app.get('/signup', function(req, res){
    res.render('join.html');
  });
  app.get('/flash', function(req, res){
    req.flash("info","Flash is back!");
    res.render('index', { messages: req.flash('info') });
    res.redirect("/");
  });
  app.get('/list', function(req, res){
    fs.readFile(__dirname + "/../data/" + "member.json", 'utf8', function(err, data){
      res.end(data);
    });
  });
}
