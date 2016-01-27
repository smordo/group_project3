var 	express    			  = require('express'),
	router 	   			  = express.Router(),
	bodyParser 			  = require('body-parser'),
	methodOverride 		  = require('method-override'),
	passport 	          		  = require('passport'),
	usersController 	 	  = require('../../controllers/users')

router.route('/:id')
	.get(usersController.getUser)
	.patch(usersController.editUser)



module.exports = router