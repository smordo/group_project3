var express = require('express'),
    router = express.Router(),
    restaurantsController = require('../../controllers/api');

//adds route route for api request
router.route('/')
	.get(restaurantsController.index)
	.post(restaurantsController.create)

//create new restaurant
router.route('/new')
	.get(restaurantsController.newRestaurant)

  //search api by restaurant name
router.route('/:id')
	.get(restaurantsController.show)
	.put(restaurantsController.update)
	.delete(restaurantsController.remove)

//export router
module.exports = router
