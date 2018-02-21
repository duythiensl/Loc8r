'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var configAuth = require('./auth');


var sendJSONrespone = (res, status, content)=>{
    res.status(status);
    res.json(content);
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField : 'email'
},
function(username, password, done){
    User.findOne({'local.email' : username}, function(err, user){
        if(err){return done(err);}
        if(!user){
            return done(null, false, {
                message : 'Incorrect username.'
            });
        }
        if(!user.validPassword(password)){
            return done(null, false, {
                message: 'Incorrect password.'
            });
        }
        return done(null, user);
    });
}
));
passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: configAuth.facebookAuth.profileFields
},
function(accessToken, refreshToken, profile, done) {
      console.log(accessToken);
  process.nextTick(function(){
     User.findOne({'facebook.id': profile.id}, function(err, user){
        if(err)
           {return done(err);}
       if(user)
           {
            return done(null, user);
        }
       else {
           var newUser = new User();
           newUser.facebook.id = profile.id;
           newUser.facebook.token = accessToken;
           newUser.facebook.name = profile.displayName;
           newUser.facebook.email = profile.emails[0].value;
           newUser.local.name = profile.displayName;
           newUser.local.email = profile.emails[0].value;
           newUser.setPassword(accessToken);
           newUser.save(function(err){
              if(err){
                throw  err;
               
             }
             return done(null, newUser);
         });
          
       }
   });
 });
}

));


passport.use(new GoogleStrategy({
   clientID: configAuth.googleAuth.clientID,
   clientSecret: configAuth.googleAuth.clientSecret,
   callbackURL: configAuth.googleAuth.callbackURL
},
function(accessToken, refreshToken, profile, done) {
   
  process.nextTick(function(){
     User.findOne({'google.id': profile.id}, function(err, user){
        if(err)
        {
            return done(err);
        }
        if(user)
        {

            return done(null, user);
        }
        else {

            var newUser = new User();
            newUser.google.id = profile.id;
            newUser.google.token = accessToken;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.emails[0].value;
            newUser.local.name = profile.displayName;
            newUser.local.email = profile.emails[0].value;
            newUser.setPassword(accessToken);
            newUser.save(function(err){
              if(err)
            {
                console.log("  GOOGLE iss here! ",err);
               
            }
           
            return done(null, newUser);

         });
       }
   });
 });
}

));
