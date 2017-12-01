const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Member = require('./model/member');

module.exports = function(passport){
  passport.serializeUser(function(member, done){
    done(null, member.id);
  });
  passport.deserializeUser(function(member, done){
    Member.findById(id, (err, user) =>{
      done(null, member);
    });
  });
  passport.use(new LocalStrategy({
    id:'id',
    pw:'pw',
    passReqToCallback:true
  },
  function(req, id, pw, done){
    Member.findOne({'id':id},function(err, member){

      if(err) return done(err);
      if(!member) return done(null, false, req.flash('loginMessage','존재하지 않는 아이디입니다.'));
      if(!member.validPassword(pw)) return done(null, false, req.flash('loginMessage','잘못된 비밀번호입니다.'));

      return done(null,user);
    });
  }));
};
