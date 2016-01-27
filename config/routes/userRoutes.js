var 	express    			  = require('express'),
	router 	   			  = express.Router(),
	bodyParser 			  = require('body-parser'),
	methodOverride 		  = require('method-override'),
	passport 	          		  = require('passport'),
	usersController 	 	  = require('../../controllers/users')

router.route('/')
	.get(usersController.getIndex);

router.route('/:firstName')
	.get(usersController.getUser)
	.patch(usersController.editUser)
	.delete(usersController.destroyUser);



module.exports = router