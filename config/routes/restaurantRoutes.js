<<<<<<< HEAD
var 	express    			  = require('express'),
	router 	   			  = express.Router(),
	restaurantsController = require('../../controllers/restaurants')
=======
var express    			  = require('express'),
		router 	   			  = express.Router(),
		restaurantsController = require('../../controllers/restaurants')
>>>>>>> 081bf0de78e024f171afdcd983cf61cd9bf964ad

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
