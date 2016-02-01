var express = require('express'),
    router = express.Router(),
    apiController = require('../../controllers/api');

//adds route route for api request
router.route('/')
	.get(apiController.index)
	.post(apiController.create)

//create new restaurant
router.route('/new')
	.get(apiController.newRestaurant)

  //search api by restaurant name
router.route('/:zomato_id')
	.get(apiController.show)
	.put(apiController.update)
	.delete(apiController.remove)

//export router
module.exports = router
