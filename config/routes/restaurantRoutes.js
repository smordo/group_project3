var 	express    			  = require('express'),
	router 	   			  = express.Router(),
	restaurantsController 		  = require('../../controllers/restaurants')

router.route('/')
	.get(restaurantsController.index)
	.post(restaurantsController.create)

router.route('/:name')
	.get(restaurantsController.show)
	.post(restaurantsController.create)
	.patch(restaurantsController.update)
	.delete(restaurantsController.remove)


module.exports = router
