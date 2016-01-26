var 	express    			  = require('express'),
	router 	   			  = express.Router(),
	bodyParser 			  = require('body-parser'),
	methodOverride 		  = require('method-override'),
	passport 	          		  = require('passport'),
	usersController 	 	  = require('../../controllers/users')

function authenticatedUser(req, res, next){
	if (req.isAuthenticated() ) return next();
	res.redirect('/');
}

router.route('/signup')
	.get(usersController.getSignup)
	.post(usersController.postSignup)

router.route('/login')
	.get(usersController.getLogin)
	.post(usersController.postLogin)

router.route('/logout')
	.get(usersController.getLogout)





module.exports = router