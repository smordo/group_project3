var User = require('../models/user');

   function(req, email, password, callback) {
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