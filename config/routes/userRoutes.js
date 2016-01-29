var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../../controllers/users');

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}

router.route('/')
	.get(usersController.getIndex);

//show
router.route('/:id')
	.get(authenticatedUser, usersController.getUser);

router.delete('/:id', usersController.destroyUser);

router.get('/:id/edit', usersController.editUser);

router.put('/:id', usersController.updateUser);



module.exports = router