var passport = require("passport")

// GET /signup
function getSignup(request, response) {
  response.render('signup.ejs', { message: request.flash('signupMessage') });
}

// POST /signup
function postSignup(request, response) {
  console.log(request.params)

  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/restaurants', 
    failureRedirect : '/passport/signup', 
    failureFlash : true 
  });

  return signUpStrategy(request, response) 
}

// GET /login
function getLogin(request, response) { 
  response.render('login.ejs', { message: request.flash('loginMessage') }); 
}

// POST /login 
function postLogin(request, response) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/restaurants', 
    failureRedirect : '/passport/login', 
    failureFlash : true 
  });

  return loginProperty(request, response);
}

// GET /logout
function getLogout(request, response) {
  request.logout();
  response.redirect('/restaurants');
}




module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout
}