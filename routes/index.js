const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'login.html'));
});
router.post('/logined', passport.authenticate('login',{
  successRedirect:'/logined.html',
  failureRedirect:'/',
  failureFlash:true
}));

module.exports = router;
