var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');

module.exports = function(passport) {

//Serialize function determine what data from the user object should be stored in the session. only user id is serialized to the session. When subsequent requests are received, this ID is used to find the user, which will be restored to req.user.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

//deserialize function you provide in first argument of deserialize function that same key of user object that was given to done function in serialize call
  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
        callback(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    process.nextTick(function() {

      // Find a user with this e-mail
      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) return callback(err);

        // If there already is a user with this email 
        if (user) {
          return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
        } else {
        // There is no email registered with this email

          // Create a new user
          var newUser            = new User();
          newUser.local.email    = email;
          newUser.local.password = newUser.encrypt(password);

          newUser.save(function(err) {
            if (err) throw err;
            return callback(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    // Search for a user with this email
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) return callback(err);
     
     // If no user is found
      if (!user) return callback(null, false, req.flash('loginMessage', 'No user found.'));

      // Wrong password
      if (!user.validPassword(password))           return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      return callback(null, user);
    });
  }));
}