var 	express    			  = require('express'),
	router 	   			  = express.Router(),
	restaurantsController = require('../../controllers/restaurants')

router.route('/')
	.get(restaurantsController.index)
	.post(restaurantsController.create)

router.route('/new')
	.get(restaurantsController.newRestaurant)

router.route('/:name')
	.get(restaurantsController.show)
	.patch(restaurantsController.update)
	.delete(restaurantsController.remove)

module.exports = router
