var 	express    			  = require('express'),
		router 	   			  = express.Router(),
		bodyParser 			  = require('body-parser'),
		restaurantsController = require('../../controllers/restaurant.js')

router.route('/')
	.get(restaurantsController.index);





module.exports = router

