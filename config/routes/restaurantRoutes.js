var 	express    			  = require('express'),
	router 	   			  = express.Router(),
	restaurantsController = require('../../controllers/restaurants')

router.route('/')
	.get(restaurantsController.index)

router.route('/new')
	.get(restaurantsController.newRestaurant)
	.post(restaurantsController.create)

router.route('/:name')
	.get(restaurantsController.show)
	.patch(restaurantsController.update)
	.delete(restaurantsController.remove)

module.exports = router
