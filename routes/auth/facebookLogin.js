var express = require('express');
var router = express.Router();
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

router.use(session({
  secret: 'your secret here',
  resave: false,
  saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user);
});

// deserialize
// 인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장
passport.deserializeUser(function(user, done) {
    //findById(id, function (err, user) {
    console.log('deserialize');
    done(null, user);
    //});
});

passport.use(new FacebookStrategy({
        clientID: '698775146890408', // app id
        clientSecret: '5326b5b75fde359eb882c0263f03be58',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log("it shows profile");
        console.log(profile);
        console.log("profile ends");
        done(null, profile);
    }
));

// app.get('/auth/facebook', function(){});
router.get('/',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

router.get('/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/auth/facebook/login_success',
    failureRedirect: 'http://localhost:3000/auth/facebook/login_fail'
  }
));

router.get('/login_success', ensureAuthenticated, function(req, res){
  console.log(req.user);
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log("Login SUCCESS!!!!!");
  console.log(req.user._json.id);
  console.log(req.user._json.name);
  res.send(req.user._json);
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
}

module.exports = router;
