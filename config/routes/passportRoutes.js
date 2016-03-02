var 	express    			  = require('express'),
	router 	   			  = express.Router(),
	bodyParser 			  = require('body-parser'),
	methodOverride 		  = require('method-override'),
	passport 	          		  = require('passport'),
	passportController 	 	  = require('../../controllers/passport')

function authenticatedUser(req, res, next){
	if (req.isAuthenticated() ) return next();
	res.redirect('/');
}

//GET & POST signup
router.route('/signup')
	.get(passportController.getSignup)
	.post(passportController.postSignup)


//GET & POST login
router.route('/login')
	.get(passportController.getLogin)
	.post(passportController.postLogin)

//GET logout
router.route('/logout')
	.get(passportController.getLogout)





module.exports = router