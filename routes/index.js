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
  /*
  app.post('/loggedIn', passport.authenticate('local', {
    successRedirect:'/loggedIn',
    failureRedirect: '/',
    failureFlash: true
  }));
*/
 /*
  app.post('/loginCheck', function(req, res){
    var id = req.body.pushID;
    var pw = req.body.pushPW;
    console.log("ID = "+id+", PW = "+pw);
    res.render('loginCheck.html');
  });


  app.post('/joinCheck', function(req, res){
    var name = req.body.pushNAME;
    var id = req.body.pushID;
    var pw = req.body.pushPW;
    console.log("ID = "+id+", PW = "+pw);
    res.render('joinCheck.html');
  });
    */

  app.get('/flash', function(req, res){
    req.flash("info","Flash is back!");
    res.render('index', { messages: req.flash('info') });
    res.redirect("/");
  });
  app.get('/list', function(req, res){
    fs.readFile(__dirname + "/../data/" + "member.json", 'utf8', function(err, data){
      res.end(data);
    });
  })
}
