const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const controller = require('../controllers/controller');
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

}
