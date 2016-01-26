var 	express    			  = require('express'),
	router 	   			  = express.Router(),
	restaurantsController 		  = require('../../controllers/restaurant.js')

router.route('/')
	.get(restaurantsController.index)

router.route('/:id')
	.get(restaurantsController.show)
	.post(restaurantsController.create)
	.patch(restaurantsController.update)
	.delete(restaurantsController.delete)


module.exports = router