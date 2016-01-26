var 	express    			  = require('express'),
	router 	   			  = express.Router(),
	bodyParser 			  = require('body-parser'),
	methodOverride 		  = require('method-override'),
	reviews_Controller 	  	  = require('../../controllers/review.js')


router.route('/')
	.post(reviews_Controller.create)

router.route('/:id')
	.path(reviews_Controller.update)
	.delete(reviews_Controller.remove)



module.exports = router