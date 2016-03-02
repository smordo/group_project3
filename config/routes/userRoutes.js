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


//GET ALL
router.route('/')
	.get(usersController.getIndex);

//GET show
router.route('/:id')
	.get(authenticatedUser, usersController.getUser);

//DELETE destroy
router.delete('/:id', usersController.destroyUser);


//PUT edit
router.get('/:id/edit', usersController.editUser);


//PATCH 
router.put('/:id', usersController.updateUser);



module.exports = router