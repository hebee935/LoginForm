module.exports = function(app, passport){
  app.get('/', function(req, res){
    res.render('login.html');
  });
  app.get('/signup', function(req, res){
    res.render('join.html');
  });
  app.post('/loggedIn', function(req, res){
    res.render('loggedIn.html');
  });

}
